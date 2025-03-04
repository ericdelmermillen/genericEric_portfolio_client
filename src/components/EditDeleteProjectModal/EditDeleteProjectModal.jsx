import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext.jsx";
import { addClassToDiv, removeClassFromDiv } from "../../../utils/utils.js";
import { removeTokens, setTokens } from '../../../utils/utils.js';
import toast from "react-hot-toast";
import "./EditDeleteProjectModal.scss";

const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;
const MODAL_TRANSITION_INTERVAL = import.meta.env.VITE_MODAL_TRANSITION_INTERVAL;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EditDeleteProjectModal = ({ 
  modalAction,
  showActionModal,
  setShowActionModal, 
  projectID,
  handleClearActionState,
  setProjectsData,
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
    removeClassFromDiv("editDeleteProjectModal", "show")

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

      setProjectsData(c => c.filter((summary) => summary.project_id !== projectID));

      // setLightBoxImages(c => 
      //   c.filter((image) => image.img_id !== projectID).map(({ img_id, img_alt, img_src }) => ({
      //     img_id,
      //     img_alt,
      //     img_src
      //   }))
      // );

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
      removeClassFromDiv("editDeleteProjectModal", "show");
      setTimeout(() => {
        if(showActionModal) {
          setShowActionModal(false);
        };
      }, MODAL_TRANSITION_INTERVAL);
    };
  }, [scrollYPos, prevScrollYPos]);

  // useEffect to add show class after initial render to allow transitioning on height, width and opacity
  useEffect(() => {
    setTimeout(() => {
      addClassToDiv("editDeleteProjectModal", "show");
      setModalIsOpen(true);
    }, MODAL_TRANSITION_INTERVAL);
  }, [MODAL_TRANSITION_INTERVAL]);

  return (
    <>
      <div id="editDeleteProjectModal" className="editDeleteProjectModal">
        <div className="editDeleteProjectModal__overlay" onClick={handleOverlayClick}></div>

        <div className="editDeleteProjectModal__inner">

          <div className="editDeleteProjectModal__content">

            <div className="editDeleteProjectModal__header">

              <h4 className="editDeleteProjectModal__heading">
              {modalAction} Project #{projectID}?
              </h4>
            </div>

          <div className="editDeleteProjectModal__buttons">

            <button 
              className="editDeleteProjectModal__button editDeleteProjectModal__button--cancel"
              onClick={handleCancelClick}
            >
              Cancel
            </button>

            <button 
              className="editDeleteProjectModal__button editDeleteProjectModal__button--commit"
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

export default EditDeleteProjectModal;