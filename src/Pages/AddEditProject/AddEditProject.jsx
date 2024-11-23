import { useState, useEffect, useRef, useCallback } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useParams } from "react-router-dom";
import { scrollToTop, isValidURL } from "../../../utils/utils";
import Compressor from "compressorjs";
import ProjectDatePicker from "../../components/ProjectDatePicker/ProjectDatePicker";
import toast from "react-hot-toast";
import PhotoInput from "../../components/PhotoInput/PhotoInput";
import "./AddEditProject.scss"

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const numberOfPhotoUploads = 4;

const AddEditProject = ({ children }) => {

  const { 
    loading, 
    setIsLoading,
    MIN_LOADING_INTERVAL 
  } = useAppContext();
  
  const [ projectDate, setProjectDate ] = useState(new Date());
  const [ rawDate, setRawDate ] = useState('');

  const [ activeDragInput, setActiveDragInput ] = useState({id: - 1}); 

  const { projectID } = useParams();
  const { pathname} = useLocation();

  const isEditProject = pathname.includes("edit");
  const isAddProject = pathname.includes("add");

  const [ photos, setPhotos ] = useState(
    Array.from({ length: numberOfPhotoUploads }, (_, idx) => ({
      photoNo: idx + 1,
      photoPreview: null,
      photoData: null,
      displayOrder: idx + 1
    }))
  );

  const [ title, setTitle ] = useState('');
  const [ desc, setDesc ] = useState('');

  const [ deployedURL, setDeployedURL ] = useState('');
  const [ youtubeVideoURL, setYoutubeVideoURL ] = useState('');
  const [ githubClientURL, setGithubClientURL ] = useState('');
  const [ githubServerURL, setGithubServerURL ] = useState('');

  
  // validation state
  const [ initialFormCheck , setInitialFormCheck ] = useState(false);

  const [ titleIsValid, setTitleIsValid ] = useState(true);

  const [ descIsValid, setDescIsValid ] = useState(true);
  const [ deployedURLIsValid, setDeployedURLIsValid ] = useState(true);
  const [ youtubeURLIsValid, setYoutubeURLIsValid ] = useState(true);
  const [ githubClientURLIsValid, setGithubClientURLIsValid ] = useState(true);
  const [ githubServerURLIsValid, setGithubServerURLIsValid ] = useState(true);

  const titleRef = useRef(null);
  const descRef = useRef(null);
  const deployedURLRef = useRef(null);
  const youtubeURLRef = useRef(null);
  const githubClientURLRef = useRef(null);
  const githubServerURLRef = useRef(null);
  
  const handleImageChange = useCallback(async (e, inputNo) => {
    const file = e.target.files[0];
    
    try {
      const compressedImage = await new Promise((resolve, reject) => {
        new Compressor(file, {
          quality: 0.8,
          maxWidth: 1200,
          maxHeight: 900,
          mimeType: 'auto',
          convertSize: 600000,
          success(result) {
            resolve(result);
          },
          error(error) {
            reject(error);
          }
        });
      });

      const compressedImageUrl = URL.createObjectURL(compressedImage);

      setPhotos((prevPhotos) => 
        prevPhotos.map((photo) => 
          photo.photoNo === inputNo 
            ? { ...photo, photoPreview: compressedImageUrl, photoData: compressedImage } 
            : photo
        )
      );
    } catch (error) {
      console.error('Error compressing image:', error);
    }
  }, []);

  const handleInputDragStart = useCallback((photoNo) => {
    const draggedInput = photos.find(photo => photo.photoNo === photoNo);
    setActiveDragInput(draggedInput);
  }, [photos]);


  const handleDropInputTarget = useCallback((dropTargetInputNo, dropTargetInputDisplayOrder) => {
    setPhotos(prevPhotos => {
      const activeDraggedInputNo = activeDragInput.photoNo;
      const activeDraggedInputOldDisplayOrder = activeDragInput.displayOrder;
  
      const highestDisplayOrder = prevPhotos.reduce((maxDisplayOrder, photo) => {
        return Math.max(maxDisplayOrder, photo.displayOrder);
      }, 0);
  
      const updatedPhotos = prevPhotos.map(photo => ({ ...photo }));
  
      for (const photo of updatedPhotos) {
        if (dropTargetInputNo !== activeDraggedInputNo) {
          if (dropTargetInputDisplayOrder === highestDisplayOrder) {
            if (photo.photoNo === dropTargetInputNo) {
              photo.displayOrder = dropTargetInputDisplayOrder - 1;
            } else if (photo.photoNo === activeDraggedInputNo) {
              photo.displayOrder = dropTargetInputDisplayOrder;
            } else if (photo.displayOrder < dropTargetInputDisplayOrder && photo.displayOrder >= activeDraggedInputOldDisplayOrder) {
              photo.displayOrder--;
            }
          } else if (activeDraggedInputOldDisplayOrder > dropTargetInputDisplayOrder) {
            if (photo.photoNo === dropTargetInputNo) {
              photo.displayOrder = dropTargetInputDisplayOrder + 1;
            } else if (photo.photoNo === activeDraggedInputNo) {
              photo.displayOrder = dropTargetInputDisplayOrder;
            } else if (photo.displayOrder > dropTargetInputDisplayOrder && photo.displayOrder <= activeDraggedInputOldDisplayOrder) {
              photo.displayOrder++;
            }
          } else if (dropTargetInputDisplayOrder > activeDraggedInputOldDisplayOrder) {
            if (photo.photoNo === dropTargetInputNo) {
              photo.displayOrder = dropTargetInputDisplayOrder - 1;
            } else if (photo.photoNo === activeDraggedInputNo) {
              photo.displayOrder = dropTargetInputDisplayOrder;
            } else if (photo.displayOrder <= dropTargetInputDisplayOrder && photo.displayOrder > activeDraggedInputOldDisplayOrder) {
              photo.displayOrder--;
            };
          };
        };
      };
  
      updatedPhotos.sort((a, b) => a.displayOrder - b.displayOrder);
  
      return updatedPhotos;
    });
  
    setActiveDragInput({id: -1});
  }, [activeDragInput.id]);



  const fetchProjectDetails = async (projectID) => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    
    if(!token || !refreshToken) {
      toast.error('Authorization or refresh token missing.');
      logoutUser();
      return;
    };
    
    try {
      const response = await fetch(`${BASE_URL}/projects/project/${projectID}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "x-refresh-token": refreshToken
        }
      });

      if(!response.ok && response.status === 401) {
        removeTokens();
        logoutUser();
        throw new Error("Not authorized. Logging you out...");
      } else if(!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || `Failed to fetch project details for project ${projectID}`);
      };

      const data = await response.json();

      setRawDate(data.project_date);
      
      const fetchedPhotos = data.project_photos.map((photo, idx) => (
        {
          photoNo: idx + 1,
          photoPreview: data.project_photos[idx]?.photo_url ?? photo.photoPreview,
          photoData: null,
          displayOrder: idx + 1
        }
      ));

      setPhotos(prevPhotos => 
        prevPhotos.map((photo, idx) => ({
          ...photo,
          photoPreview: data.project_photos[idx]?.photo_url || photo.photoPreview
        }))
      );
      
      setTitle(data.project_title);
      setDesc(data.project_description.replace(/\n/g, "\n\n"));

      data.project_urls.forEach(url => {
        if(url["Deployed Url"]) {
          setDeployedURL(Object.entries(url)[0][1]);
        } else if(url["Youtube Video"]) {
          setYoutubeVideoURL(Object.entries(url)[0][1]);
        } else if(url["Github (Client)"]) {
          setGithubClientURL(Object.entries(url)[0][1]);
        } else if(url["Github (Server)"]) {
          setGithubServerURL(Object.entries(url)[0][1]);
        };
      });
      
    } catch(error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, MIN_LOADING_INTERVAL);
    };
  };


  // ***

  const handleTitleChange = (e) => {
    if(e) {
      setTitle(e.target.value);
      
      if(initialFormCheck) {
        const isValidLength = e.target.value.trim().length >= 5;
        setTitleIsValid(isValidLength);
        return isValidLength
      };
    } else {
      const isValidLength = titleRef.current.value.trim().length >= 5
      setTitleIsValid(isValidLength)
      return isValidLength;
    };

  };

  
  const handleDescChange = (e) => {
    if(e) {
      setDesc(e.target.value);
      
      if(initialFormCheck) {
        const isValidLength = e.target.value.trim().length >= 25;
        setDescIsValid(isValidLength);
        return isValidLength;
      };
    } else {
      const isValidLength = descRef.current.value.trim().length >= 25;
      setDescIsValid(isValidLength);
      return isValidLength;
    };
  };

  
  const handleDeployedURLChange = (e) => {
    const validURL = isValidURL(e ? e.target.value : deployedURLRef.current.value);

    if(e) {
      setDeployedURL(e.target.value);
      
      if(initialFormCheck) {
        setDeployedURLIsValid(validURL)
        return validURL;
      }

    } else {
      setDeployedURLIsValid(validURL);
      return validURL;
    };
  };
  
  
  const handleYoutubeVideoURLChange = (e) => {
    const validURL = isValidURL(e ? e.target.value : youtubeURLRef.current.value);

    if(e) {
      setYoutubeVideoURL(e.target.value);
      
      if(initialFormCheck && e.target.value.length) {
        setYoutubeURLIsValid(validURL);
        return validURL;

      } else if(e.target.value.length == 0){
        setYoutubeURLIsValid(true);
        return true
      };

    } else if(youtubeURLRef.current.value.length){
      setYoutubeURLIsValid(validURL);
      return validURL;
    };
  };


  const handleGithubClientURLChange = (e) => {
    const validURL = isValidURL(e ? e.target.value : githubClientURLRef.current.value);

    if(e) {
      setGithubClientURL(e.target.value);

      if(initialFormCheck && e.target.value.length) {
        setGithubClientURLIsValid(validURL)
        return validURL;
      } else if(e.target.value.length == 0){
        setGithubClientURLIsValid(true);
        return true
      };

    } else if(githubClientURLRef.current.value.length){
      setGithubClientURLIsValid(validURL)
      return validURL;
    };
  };
  
  
  const handleGithubServerURLChange = (e) => {
    const validURL = isValidURL(e ? e.target.value : githubServerURLRef.current.value);
    
    if(e) {
      setGithubServerURL(e.target.value);

      if(initialFormCheck && e.target.value.length) {
        setGithubServerURLIsValid(validURL);
        return validURL;
      } else if(e.target.value.length == 0){
        setGithubServerURLIsValid(true);
        return true
      };
      
    } else if(githubServerURLRef.current.value.length) {
      setGithubServerURLIsValid(validURL);
      return validURL;
    };
  };

  // ***

  
  
  // ***


  // validation checkers

  // const clearForm = () => {
  //   // setName("");
  //   setInitialFormCheck(false);
  //   // setEmail("");
  //   // setMessage("");
  // };




  const handleSubmit = (e) => {
    e.preventDefault();
    setInitialFormCheck(true);
    // setIsLoading(true);

    let errors = 0;

    if(!handleTitleChange()) {
      toast.error("Title is too short");
      errors++
    }
    
    if(!handleDescChange()){
      toast.error("Description is too short");
      errors++
    }
    
    if(!handleDeployedURLChange()){
      toast.error("Valid deployment url required");
      errors++
    }
    
    if(youtubeVideoURL.length && !handleYoutubeVideoURLChange()) {
      toast.error("Youtube video url invalid");
      errors++;
    }
    
    if(githubClientURL.length && !handleGithubClientURLChange()) {
      toast.error("Github Client url invalid");
      errors++;
    };
    
    if(githubServerURL.length && !handleGithubServerURLChange()) {
      toast.error("Github server url invalid");
      errors++;
    };


    // console.log(errors)

    if(errors) {
      console.log("errors present")
      return
    }


    console.log(`Submitting ${isAddProject ? "new project" : "updated project"}`)
    return
  };




  const handleCancel = () => {
    console.log("Cancel")
  };



  // fetch existing project on mount useEffect
  useEffect(() => {
    if(isEditProject) { 
      fetchProjectDetails(projectID);
    };
    scrollToTop();
  }, []);

  return (
    <>
      <div className="addEditProject">
        <div className="addEditProject__inner">
          {children}
          <div className="addEditProject__content">

            <h1 
              id="addEditHeading"
              className="addEditProject__heading"
            >
              {isAddProject
                ? "Add New Project"
                : `Edit Project #${projectID}`
              }
            </h1>

            <ProjectDatePicker 
              projectDate={projectDate}
              setProjectDate={setProjectDate}
              iconClassName={"addEditProject__calendar-icon"}
              rawDate={rawDate}
              aria-label="Project Date Picker"
            />

            <div 
              className="addEditProject__photoInputs"
              role="list" 
              aria-label="Photo Upload Inputs"
            >

              {photos.map(photo => 

                <div 
                  key={photo.photoNo}
                  className="addEditProject__photoInput" 
                  role="listitem"
                  aria-label={`Photo input ${photo.photoNo}`}
                > 
                  <PhotoInput 
                    photo={photo}
                    setPhotos={setPhotos}
                    handleImageChange={handleImageChange}
                    handleInputDragStart={handleInputDragStart}
                    handleDropInputTarget={handleDropInputTarget}
                    aria-label={`Photo ${photo.photoNo}`}
                  />
                </div>

              )}

            </div>


            <div className="addEditProject__text">

              <label className="addEditProject__label" htmlFor="projectTitle">
                {`Title for project ${title}`}
              </label>

              <input 
                id="projectTitle"
                className={`addEditProject__input addEditProject__input--title ${!titleIsValid && initialFormCheck 
                  ? "error" 
                  : ""}`} 
                type="text" 
                value={title}
                onChange={(e) => handleTitleChange(e)}
                placeholder="Title for project"
                aria-required="true"
                ref={titleRef}
              />

              <div className="addEditProject__descContainer">

                <label className="addEditProject__label" htmlFor="projectDescription">
                  {`Description for project ${title}`}
                </label>

                <textarea 
                  id="projectDescription"
                  className={`addEditProject__desc ${!descIsValid && initialFormCheck 
                    ? "error" 
                    : ""}`}
                  value={desc}
                  onChange={(e) => handleDescChange(e)}
                  placeholder="Description of the project"
                  aria-required="true"
                  ref={descRef}
                  ></textarea>

              </div>

              <div className="addEditProject__urls">

                <label className="addEditProject__label" htmlFor="deployedURL">Deployed URL</label>

                <input 
                  id="deployedURL"
                  className={`addEditProject__input addEditProject__input--deployedURL ${!deployedURLIsValid && initialFormCheck 
                    ? "error" 
                    : ""}`}
                  type="url" 
                  value={deployedURL}
                  onChange={(e) => handleDeployedURLChange(e)}
                  placeholder="Deployed site url"
                  ref={deployedURLRef}
                />
     
                <label className="addEditProject__label" htmlFor="youtubeURL">YouTube Video URL</label>

                <input 
                  id="youtubeURL"
                  className={`addEditProject__input addEditProject__input--youtubeURL ${!youtubeURLIsValid && initialFormCheck 
                    ? "error" 
                    : ""}`}
                  type="url" 
                  value={youtubeVideoURL}
                  onChange={(e) => handleYoutubeVideoURLChange(e)}
                  placeholder="Youtube video url (optional)"
                  ref={youtubeURLRef}
                />

                <label className="addEditProject__label" htmlFor="githubClient">GitHub Client URL</label>

                <input 
                  id="githubClient"
                  className={`addEditProject__input addEditProject__input--githubClient ${!githubClientURLIsValid && initialFormCheck 
                    ? "error" 
                    : ""}`}
                  type="url" 
                  value={githubClientURL}
                  onChange={(e) => handleGithubClientURLChange(e)}
                  placeholder="Github client url (optional)"
                  ref={githubClientURLRef}
                />
                
                <label className="addEditProject__label" htmlFor="githubServer">GitHub Server URL</label>

                <input 
                  id="githubServer"
                  className={`addEditProject__input addEditProject__input--githubServer ${!githubServerURLIsValid && initialFormCheck 
                    ? "error" 
                    : ""}`}
                  type="url" 
                  value={githubServerURL}
                  onChange={(e) => handleGithubServerURLChange(e)}
                  placeholder="Github server url (optional)"
                  ref={githubServerURLRef}
                />

              </div>

            </div>


            <div className="addEditProject__buttons">

              <button 
                className="addEditProject__button" 
                onClick={handleCancel} 
                aria-label="Cancel changes"
              >
                Cancel
              </button>

              <button 
                className="addEditProject__button" 
                onClick={(e) => handleSubmit(e)}
                aria-label={isAddProject ? "Submit new project" : "Update project"}
              >
                {isAddProject 
                  ? "Submit" 
                  : "Update"}
              </button>

            </div>

          </div>

        </div>
      </div>
      
    </>
  )};

export default AddEditProject;