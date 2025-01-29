import { useState, useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { addClassToDiv, removeClassFromDiv } from "../../../utils/utils";
import { removeTokens, setTokens } from '../../../utils/utils.js';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./AddEditDeleteProjectModal.scss";

const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;
const MODAL_TRANSITION_INTERVAL = import.meta.env.VITE_MODAL_TRANSITION_INTERVAL;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddEditDeleteProjectModal = ({ 
  modalAction,
  showActionModal,
  setShowActionModal, 
  projectID,
  handleClearActionState,
  setProjectsData,
  lightBoxImages,
  setLightBoxImages
}) => {

  const [ modalIsOpen, setModalIsOpen ] = useState(false);

  const { 
    setIsLoading,
    scrollYPos, 
    prevScrollYPos,
    logoutUser
  } = useAppContext();

  const navigate = useNavigate();

  const handleActionClearing = () => {
    removeClassFromDiv("addEditDeleteProjectModal", "show")

    setTimeout(() => {
      setShowActionModal(false);
      handleClearActionState();
    }, MODAL_TRANSITION_INTERVAL);
  };

  const handleOverlayClick = () => {
    handleActionClearing();
  };

  const handleCancelClick = () => {
    handleActionClearing();
  };

  const handleDeleteProject = async (projectID) => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
  
    if(!token || !refreshToken) {
      toast.error('Authorization or refresh token missing.');
      logoutUser();
      return;
    };
  
    try {
      const response = await fetch(`${BASE_URL}/projects/project/delete/${projectID}`, {
        method: 'DELETE',
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
        throw new Error(errorResponse.message || 'Failed to delete project');
      };
  
      const { message, newToken, newRefreshToken } = await response.json();
  
      setTokens(newToken, newRefreshToken);

      setProjectsData(c => c.filter(summary => summary.project_id !== projectID));

      setLightBoxImages(lightBoxImages.filter(image => image.img_id !== projectID).map(image => (

        {
          img_id: image.img_id,
          img_alt: image.img_alt,
          img_src: image.img_src
        }
      )));

      toast.success(message);  
    } catch(error) {
      console.error('Error deleting project:', error);
      toast.error(error.message);
      logoutUser();
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        handleActionClearing();
      }, MIN_LOADING_INTERVAL * 2);
    };
  };

  const handleEditProject = (projectID) => {
    navigate(`/projects/edit/${projectID}`);
  };


  // useEffect to close overlay on scroll
  useEffect(() => {
    if(scrollYPos !== prevScrollYPos && modalIsOpen) {
      removeClassFromDiv("addEditDeleteProjectModal", "show");
      setTimeout(() => {
        if(showActionModal) {
          setShowActionModal(false);
        }
      }, MODAL_TRANSITION_INTERVAL);
    };
  }, [scrollYPos, prevScrollYPos]);


  // useEffect to add show class after initial render to allow transitioning on height, width and opacity
  useEffect(() => {
    setTimeout(() => {
      addClassToDiv("addEditDeleteProjectModal", "show");
      setModalIsOpen(true);
    }, MODAL_TRANSITION_INTERVAL);
  }, []);


  return (
    <>
      <div id="addEditDeleteProjectModal" className="addEditDeleteProjectModal">

        <div className="addEditDeleteProjectModal__overlay" onClick={handleOverlayClick}></div>

        <div className="addEditDeleteProjectModal__inner">

          <div className="addEditDeleteProjectModal__content">

            <div className="addEditDeleteProjectModal__header">

              <h4 className="addEditDeleteProjectModal__heading">
              {modalAction} Project #{projectID}?
              </h4>
            </div>

          <div className="addEditDeleteProjectModal__buttons">

            <button 
              className="addEditDeleteProjectModal__button addEditDeleteProjectModal__button--cancel"
              onClick={handleCancelClick}
            >
              Cancel
            </button>

            <button 
              className="addEditDeleteProjectModal__button addEditDeleteProjectModal__button--commit"
              onClick={modalAction === "Delete"
                ? () => handleDeleteProject(projectID)
                : modalAction === "Edit"
                ? () => handleEditProject(projectID)
                : null
              }
            >{modalAction}
            </button>

          </div>

          </div>

        </div>

      </div>
      
    </>
  )};

export default AddEditDeleteProjectModal;