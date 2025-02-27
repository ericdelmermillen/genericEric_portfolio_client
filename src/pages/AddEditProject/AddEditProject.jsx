import { useState, useRef, useEffect, useCallback } from "react";
import { useAppContext } from "../../contexts/AppContext.jsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { 
  scrollToTop, 
  isValidURL, 
  checkTokenIsValid, 
  getFormattedDate, 
  setTokens 
} from "../../../utils/utils.js";
import Compressor from "compressorjs";
import ProjectDatePicker from "../../components/ProjectDatePicker/ProjectDatePicker.jsx";
import toast from "react-hot-toast";
import PhotoInput from "../../components/PhotoInput/PhotoInput.jsx";
import "./AddEditProject.scss"

const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AWS_SIGNED_URL_ROUTE = import.meta.env.VITE_AWS_SIGNED_URL_ROUTE;
const AWS_DIRNAME = import.meta.env.VITE_AWS_DIRNAME;
const AWS_SS3_BUCKET_URL = import.meta.env.VITE_AWS_S3_BUCKET_URL;

console.log(BASE_URL)

const numberOfPhotoUploads = 4;

const AddEditProject = ({ children }) => {

  const { 
    setIsLoading,
    logoutUser
  } = useAppContext();
  
  const [ projectDate, setProjectDate ] = useState("");
  
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

  const navigate = useNavigate();  
  
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
    };
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
  
      for(const photo of updatedPhotos) {
        if(dropTargetInputNo !== activeDraggedInputNo) {
          if(dropTargetInputDisplayOrder === highestDisplayOrder) {
            if(photo.photoNo === dropTargetInputNo) {
              photo.displayOrder = dropTargetInputDisplayOrder - 1;
            } else if(photo.photoNo === activeDraggedInputNo) {
              photo.displayOrder = dropTargetInputDisplayOrder;
            } else if(photo.displayOrder < dropTargetInputDisplayOrder && photo.displayOrder >= activeDraggedInputOldDisplayOrder) {
              photo.displayOrder--;
            };
          } else if(activeDraggedInputOldDisplayOrder > dropTargetInputDisplayOrder) {
            if(photo.photoNo === dropTargetInputNo) {
              photo.displayOrder = dropTargetInputDisplayOrder + 1;
            } else if(photo.photoNo === activeDraggedInputNo) {
              photo.displayOrder = dropTargetInputDisplayOrder;
            } else if(photo.displayOrder > dropTargetInputDisplayOrder && photo.displayOrder <= activeDraggedInputOldDisplayOrder) {
              photo.displayOrder++;
            };
          } else if(dropTargetInputDisplayOrder > activeDraggedInputOldDisplayOrder) {
            if(photo.photoNo === dropTargetInputNo) {
              photo.displayOrder = dropTargetInputDisplayOrder - 1;
            } else if(photo.photoNo === activeDraggedInputNo) {
              photo.displayOrder = dropTargetInputDisplayOrder;
            } else if(photo.displayOrder <= dropTargetInputDisplayOrder && photo.displayOrder > activeDraggedInputOldDisplayOrder) {
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

      const { 
        project_date, 
        project_title, 
        project_description, 
        project_photos, 
        project_urls, 
        newToken, 
        newRefreshToken,
        error
      } = await response.json();

      if(!response.ok && response.status === 401) {
        removeTokens();
        logoutUser();
        throw new Error("Not authorized. Logging you out...");
      } else if(!response.ok) {
        throw new Error(error || `Failed to fetch project details for project ${projectID}`);
      };
      
      setTokens(newToken, newRefreshToken);

      setProjectDate(project_date);

      setPhotos(prevPhotos =>
        prevPhotos.map((photo, idx) => ({
          ...photo,
          photoPreview: project_photos[idx]?.photo_url
            ? `${AWS_SS3_BUCKET_URL}/${project_photos[idx].photo_url}`
            : photo.photoPreview,
        }))
      );
      
      setTitle(project_title);
      setDesc(project_description.replace(/\n/g, "\n\n"));

      project_urls.forEach(url => {
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

  const handleTitleChange = (e) => {
    const titleValue = e ? e.target.value : titleRef.current.value;
    const isValidLength = titleValue.trim().length >= 5;

    setTitle(titleValue);
    setTitleIsValid(isValidLength);
  
    return isValidLength;
  };

  const handleDescChange = (e) => {
    const descValue = e ? e.target.value : descRef.current.value;
    const isValidLength = descValue.trim().length >= 25;

    setDesc(descValue);
    setDescIsValid(isValidLength);
  
    return isValidLength;
  };

  const handleDeployedURLChange = (e) => {
    const deployedURLValue = e ? e.target.value : deployedURLRef.current.value;
    const validURL = isValidURL(deployedURLValue);

    setDeployedURL(deployedURLValue);
    setDeployedURLIsValid(validURL);
  
    return validURL;
  };

  const handleYoutubeVideoURLChange = (e) => {
    const youtubeURLValue = e ? e.target.value : youtubeURLRef.current.value;
    const validURL = isValidURL(youtubeURLValue);
  
    setYoutubeVideoURL(youtubeURLValue);
    setYoutubeURLIsValid(validURL || youtubeURLValue.length === 0);
  
    return validURL || youtubeURLValue.length === 0;
  };
  
  const handleGithubClientURLChange = (e) => {
    const githubClientURLValue = e ? e.target.value : githubClientURLRef.current.value;
    const validURL = isValidURL(githubClientURLValue);
  
    setGithubClientURL(githubClientURLValue);
    setGithubClientURLIsValid(validURL || githubClientURLValue.length === 0);
  
    return validURL || githubClientURLValue.length === 0;
  };
  
  const handleGithubServerURLChange = (e) => {
    const githubServerURLValue = e ? e.target.value : githubServerURLRef.current.value;
    const validURL = isValidURL(githubServerURLValue);
  
    setGithubServerURL(githubServerURLValue);
    setGithubServerURLIsValid(validURL || githubServerURLValue.length === 0);
  
    return validURL || githubServerURLValue.length === 0;
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setInitialFormCheck(true);
    setIsLoading(true);

    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem('refreshToken');

    if(!token || !checkTokenIsValid(navigate)) {
      toast.error("Unable to verify token");
      return navigate("/")
    };

    let errors = 0;
    const hasPhotos = photos.some(photo => photo.photoPreview !== null);

    if(!hasPhotos) {
      toast.error("Minimum one photo required");
      errors++;
    };

    if(!handleTitleChange()) {
      toast.error("Title is too short");
      errors++;
    };
    
    if(!handleDescChange()){
      toast.error("Description is too short");
      errors++;
    };
    
    if(!handleDeployedURLChange()){
      toast.error("Valid deployment url required");
      errors++;
    };
    
    if(youtubeVideoURL.length && !handleYoutubeVideoURLChange()) {
      toast.error("Youtube video url invalid");
      errors++;
    };
    
    if(githubClientURL.length && !handleGithubClientURLChange()) {
      toast.error("Github Client url invalid");
      errors++;
    };
    
    if(githubServerURL.length && !handleGithubServerURLChange()) {
      toast.error("Github server url invalid");
      errors++;
    };

    if(errors) {
      setTimeout(() => {
        setIsLoading(false);
      }, MIN_LOADING_INTERVAL);
      return;
    };

    const project = {
      project_date: projectDate,
      project_title: title,
      project_description: desc,
      project_urls: [
        { "Deployed Url": deployedURL },
        ...(youtubeVideoURL ? [{ "Youtube Video": youtubeVideoURL }] : []),
        ...(githubClientURL ? [{ "Github (Client)": githubClientURL }] : []),
        ...(githubServerURL ? [{ "Github (Server)": githubServerURL }] : []),
      ],
      project_photos: []
    };
    
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "x-refresh-token": refreshToken
    };

    let awsURL;

    for(const photo of photos) {
      
      if(photo.photoPreview && !photo.photoData) {
        
        if(photo.photoPreview) {
          const objectName = photo.photoPreview.split("/")[4];
          const projectPhoto = {display_order: photo.displayOrder, photo_url: objectName};
          project.project_photos.push(projectPhoto);
        };

      } else if(photo.photoData) {

        console.log(AWS_SIGNED_URL_ROUTE)

        // get signed url for posting to aws
        try { 
          const response = await fetch(`${AWS_SIGNED_URL_ROUTE}?dirname=${AWS_DIRNAME}`, {
            method: "POST",
            headers: headers,
          });

          if(!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
          };

          const { url } = await response.json();
          awsURL = url;
          
        } catch(error) {
          if(error.message.includes("401")) {
            toast.error("Unauthorized. Logging you out...");
            console.log(error.message);
            return navigate("/");
          };
          
          console.log(error.message);
          toast.error("Error uploading picture(s)");
          return;
        };

        // post image to aws s3 bucket
        try {
          await fetch(awsURL, {
            method: "PUT",
            body: photo.photoData
          });

          const imageUrl = `${awsURL.split('?')[0]}`;
          const objectName = imageUrl.split(`/${AWS_DIRNAME}/`)[1];

          const projectPhoto = {display_order: photo.displayOrder, photo_url: objectName };

          project.project_photos.push(projectPhoto);
        } catch(error) {
          console.log(error);
          toast.error("Error creating project");
          setIsLoading(false);
          return;
        };
      };
    };

    try {
      const method = isAddProject ? "POST" : "PUT";
      const endpoint = isAddProject ? "projects/project/add" : `projects/project/edit/${projectID}`;

      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: method,
        headers: headers,
        body: JSON.stringify(project)
        }
      );
      
      if(!response.ok) {
        const { errors, message } = await response.json();
        errors?.forEach(error => toast.error(error));
        toast.error(message);

        throw new Error(`Failed to send message: status ${response.status}`);
      };

      const { newToken, newRefreshToken } = await response.json();
      
      setTokens(newToken, newRefreshToken);

      isAddProject 
        ? toast.success("Project created!") 
        : toast.success("Project updated!");

      navigate("/");
    } catch(error) {
      if(error.message.includes("401")) {
        toast.error("Unauthorized. Logging you out...");
        navigate("/");
      } else {
        console.log(error.message);
      };
      
      return;
    } finally {
      setIsLoading(false);
    };
  };

  const handleCancel = () => {
    navigate("/");
  };


  // fetch existing project on mount useEffect
  useEffect(() => {
    if(isEditProject) { 
      fetchProjectDetails(projectID);
    };
    
    if(isAddProject) {
      setProjectDate(getFormattedDate(new Date()))
    };
    
    if(titleRef.current) {
      titleRef.current.focus();
    };

    scrollToTop();
  }, []);


  // update title of page
  useEffect(() => {
    if(isAddProject) {
      document.title = "Generic Eric's New Project Page";
    };
    
    if(isEditProject) {
      document.title = "Generic Eric's Edit Project Page";
    };
  }, []);

  return (
    <>
      <div className="addEditProject">
        <div className="addEditProject__inner">
          {children}

          <form 
            className="addEditProject__form"
            onSubmit={handleSubmit}
            noValidate
          >

            <h1 id="addEditHeading" className="addEditProject__heading">
              {isAddProject
                ? "Add New Project"
                : `Edit Project #${projectID}`
              }
            </h1>

            <ProjectDatePicker 
              projectDate={projectDate}
              setProjectDate={setProjectDate}
              isAddProject={isAddProject}
              iconClassName={"addEditProject__calendar-icon"}
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
                type="text" 
                id="projectTitle"
                className={`addEditProject__input addEditProject__input--title ${!titleIsValid && initialFormCheck 
                  ? "error" 
                  : ""}`} 
                value={title}
                ref={titleRef}
                onChange={(e) => handleTitleChange(e)}
                placeholder="Title for project"
              />

              <div className="addEditProject__descContainer">

                <label className="addEditProject__label" htmlFor="projectDescription">
                  {`Description for project ${title}`}
                </label>

                <textarea 
                  id="projectDescription"
                  type="text"
                  className={`addEditProject__desc ${!descIsValid && initialFormCheck 
                    ? "error" 
                    : ""}`}
                  value={desc}
                  ref={descRef}
                  onChange={(e) => handleDescChange(e)}
                  placeholder="Description of the project"
                  ></textarea>

              </div>

              <div className="addEditProject__urls">

                <label className="addEditProject__label" htmlFor="deployedURL">
                  Deployed URL
                </label>

                <input 
                  type="url" 
                  id="deployedURL"
                  className={`addEditProject__input addEditProject__input--deployedURL ${!deployedURLIsValid && initialFormCheck 
                    ? "error" 
                    : ""}`}
                  value={deployedURL}
                  ref={deployedURLRef}
                  onChange={(e) => handleDeployedURLChange(e)}
                  placeholder="Deployed site url"
                />
     
                <label className="addEditProject__label" htmlFor="youtubeURL">
                  YouTube Video URL
                </label>

                <input 
                type="url" 
                  id="youtubeURL"
                  className={`addEditProject__input addEditProject__input--youtubeURL ${!youtubeURLIsValid && initialFormCheck 
                    ? "error" 
                    : ""}`}
                  value={youtubeVideoURL}
                  ref={youtubeURLRef}
                  onChange={(e) => handleYoutubeVideoURLChange(e)}
                  placeholder="Youtube video url (optional)"
                />

                <label className="addEditProject__label" htmlFor="githubClient">
                  GitHub Client URL
                </label>

                <input 
                  type="url" 
                  id="githubClient"
                  className={`addEditProject__input addEditProject__input--githubClient ${!githubClientURLIsValid && initialFormCheck 
                    ? "error" 
                    : ""}`}
                  value={githubClientURL}
                  ref={githubClientURLRef}
                  onChange={(e) => handleGithubClientURLChange(e)}
                  placeholder="Github client url (optional)"
                />
                
                <label className="addEditProject__label" htmlFor="githubServer">
                  GitHub Server URL
                </label>

                <input 
                  type="url" 
                  id="githubServer"
                  className={`addEditProject__input addEditProject__input--githubServer ${!githubServerURLIsValid && initialFormCheck 
                    ? "error" 
                    : ""}`}
                  value={githubServerURL}
                  ref={githubServerURLRef}
                  onChange={(e) => handleGithubServerURLChange(e)}
                  placeholder="Github server url (optional)"
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

          </form>

        </div>
      </div>
      
    </>
  )};

export default AddEditProject;