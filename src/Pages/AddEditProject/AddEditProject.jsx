import { useCallback, useEffect, useState } from "react";
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

  const { loading, setIsLoading } = useAppContext();
  const [ projectDate, setProjectDate ] = useState(new Date());
  const [ rawDate, setRawDate ] = useState('');

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


  const fetchProjectDetails = async (projectID) => {
    // setIsLoading(true);
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
          "x-refresh-token": refreshToken, 
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
      console.log(data)
    } catch(error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    };
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
      fetchProjectDetails(projectID)
    }
    scrollToTop()
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

            {photos.map(shootPhoto => 
              <div 
              className="addEditProject__photoInput"
              key={shootPhoto.photoNo}
              > 
                <PhotoInput 
                  shootPhoto={shootPhoto}
                  setPhotos={setPhotos}
                  handleImageChange={handleImageChange}
                />
              </div>
              )
            }

          </div>


          <div className="addEditProject__buttons">
            <button 
              className="addEditProject__button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              className="addEditProject__button"
              onClick={handleSubmit}
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