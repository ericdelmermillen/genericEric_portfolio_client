import { useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { addClassToDiv, removeClassFromDiv } from "../../../utils/utils";
import { removeTokens, setTokens } from '../../../utils/utils.js';
import "./AddEditDeleteProjectModal.scss";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// console.log(`${BASE_URL}/projects/project`)

const AddEditDeleteProjectModal = ({ 
  setShowActionModal, 
  modalAction,
  projectID,
  handleClearActionState,
  setPortfolioSummaries
}) => {

  const { 
    setIsLoading,
    scrollYPos, 
    prevScrollYPos,
    MIN_LOADING_INTERVAL,
    logoutUser,
    MODAL_TRANSITION_INTERVAL
  } = useAppContext();

  const handleActionClearing = () => {
    removeClassFromDiv("addEditDeleteProjectModal", "show")
    setTimeout(() => {
      setShowActionModal(false);
      handleClearActionState()
    }, MODAL_TRANSITION_INTERVAL);
  }

  const handleOverlayClick = () => {
    handleActionClearing();
  };




  const handleCancelClick = () => {
    handleActionClearing();
  }


  const handleDeleteProject = async (projectID) => {
    console.log(projectID)
    // return
    setIsLoading(true);
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
  
    if(!token || !refreshToken) {
      toast.error('Authorization or refresh token missing.');
      logoutUser();
      return;
    }
  
    try {
      const response = await fetch(`${BASE_URL}/projects/project/delete/${projectID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          refreshToken: refreshToken,
        },
      });
  
      if(!response.ok && response.status === 401) {
        removeTokens();
        logoutUser();
        throw new Error("Not authorized. Logging you out...");
      } else if(!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to delete project');
      }
  
      const { message, newToken, newRefreshToken } = await response.json();
  
      setTokens(newToken, newRefreshToken);

      setPortfolioSummaries(c => c.filter(summary => summary.project_id !== projectID));
      toast.success(message);  
    } catch(error) {
      console.error('Error deleting project:', error);
      toast.error(error.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        handleActionClearing();
      }, MIN_LOADING_INTERVAL * 2);
    };
  };


    // useEffect to close overlay on scroll
    useEffect(() => {
      if(scrollYPos !== prevScrollYPos) {
        removeClassFromDiv("addEditDeleteProjectModal", "show");
        setTimeout(() => {
          setShowActionModal(false);
        }, MODAL_TRANSITION_INTERVAL);
      };
    }, [scrollYPos, prevScrollYPos]);

  // useEffect to add show class after initial render to allow transitioning on sheight, width and opacity
  useEffect(() => {
    setTimeout(() => {
      addClassToDiv("addEditDeleteProjectModal", "show");
    }, MODAL_TRANSITION_INTERVAL);
  }, []);


  return (
    <>
      <div id="addEditDeleteProjectModal" className="addEditDeleteProjectModal">

        <div className="addEditDeleteProjectModal__overlay" onClick={handleOverlayClick}></div>

        <div className="addEditDeleteProjectModal__inner">

          <div className="addEditDeleteProjectModal__content">
            <h4 className="addEditDeleteProjectModal__header">{modalAction} Project</h4>
          <h3 className="addEditDeleteProjectModal__sub-heading">{modalAction} Project {projectID}?</h3>

          <div className="addEditDeleteProjectModal__buttons">

            <button 
              className="addEditDeleteProjectModal__button addEditDeleteProjectModal__button--cancel"
              onClick={handleCancelClick}
            >Cancel
            </button>

            <button 
              className="addEditDeleteProjectModal__button addEditDeleteProjectModal__button--commit"
              onClick={modalAction === "Delete"
                ? () => handleDeleteProject(projectID)
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