import { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useParams } from "react-router-dom";
import { scrollToTop } from "../../../utils/utils";
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
  const [ githubClientUrl, setGithubClientUrl ] = useState('');
  const [ githubServerUrl, setGithubServerUrl ] = useState('');
  
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
          setGithubClientUrl(Object.entries(url)[0][1]);
        } else if(url["Github (Server)"]) {
          setGithubServerUrl(Object.entries(url)[0][1]);
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
    setTitle(e.target.value);
  };
  
  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };
  
  const handleDeployedURLChange = (e) => {
    setDeployedURL(e.target.value);
  };
  
  
  const handleYoutubeVideoURLChange = (e) => {
    setYoutubeVideoURL(e.target.value);
  };

  const handleGithubClientURLChange = (e) => {
    setGithubClientUrl(e.target.value);
  };
  
  const handleGithubServerURLChange = (e) => {
    setGithubServerUrl(e.target.value);
  };
  
  



  const handleCancel = () => {
    console.log("Cancel")
  };


  const handleSubmit = () => {
    console.log(`Submitting ${isAddProject ? "new project" : "updated project"}`)
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

            <h1 className="addEditProject__heading">
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
            />

            <div className="addEditProject__photoInputs">

              {photos.map(photo => 

                <div className="addEditProject__photoInput" key={photo.photoNo}> 
                  <PhotoInput 
                    photo={photo}
                    setPhotos={setPhotos}
                    handleImageChange={handleImageChange}
                    handleInputDragStart={handleInputDragStart}
                    handleDropInputTarget={handleDropInputTarget}
                  />
                </div>

              )}

            </div>


            <div className="addEditProject__text">

              <label className="addEditProject__title-label" htmlFor="projectTitle">
                {`Title for project ${title}`}
              </label>

              <input 
                id="projectTitle"
                className="addEditProject__title" 
                type="text" 
                value={title}
                onChange={(e) => handleTitleChange(e)}
                placeholder="Title for project"
              />


              <label className="addEditProject__desc-label" htmlFor="projectTitle">
                {`Description for project ${title}`}
              </label>

              <textarea 
                id="projectDescription"
                className="addEditProject__desc" 
                value={desc}
                onChange={(e) => handleDescChange(e)}
                placeholder="Description of the project"
              ></textarea>

              <label className="addEditProject__label" htmlFor="deployedURL">
                {/* {`Title for project ${title}`} */}
              </label>

              <input 
                id="deployedURL"
                className="addEditProject__deployed-url" 
                type="url" 
                value={deployedURL}
                onChange={(e) => handleDeployedURLChange(e)}
                placeholder="Deployed site url"
              />

              <label className="addEditProject__label" htmlFor="youtubeURL">
                {/* {`Title for project ${title}`} */}
              </label>

              <input 
                id="youtubeURL"
                className="addEditProject__youtube-url" 
                type="url" 
                value={youtubeVideoURL}
                onChange={(e) => handleYoutubeVideoURLChange(e)}
                placeholder="Youtube video url"
              />
    
              <label className="addEditProject__label" htmlFor="githubClient">
                {/* {`Title for project ${title}`} */}
              </label>

              <input 
                id="githubClient"
                className="addEditProject__githubClient-url" 
                type="url" 
                value={githubClientUrl}
                onChange={(e) => handleGithubClientURLChange(e)}
                placeholder="Github client url"
              />
    
              <label className="addEditProject__label" htmlFor="githubServer">
                {/* {`Title for project ${title}`} */}
              </label>

              <input 
                id="githubServer"
                className="addEditProject__githubServer-url" 
                type="url" 
                value={githubServerUrl}
                onChange={(e) => handleGithubServerURLChange(e)}
                placeholder="Github server url"
              />
              
            </div>



            <div className="addEditProject__buttons">

              <button className="addEditProject__button" onClick={handleCancel}>
                Cancel
              </button>

              <button className="addEditProject__button" onClick={handleSubmit}>
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