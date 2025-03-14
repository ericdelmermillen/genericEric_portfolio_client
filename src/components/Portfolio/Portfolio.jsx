import { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../../contexts/AppContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md';
import { removeTokens, setTokens } from '../../../utils/utils.js';
import EditDeleteProjectModal from '../EditDeleteProjectModal/EditDeleteProjectModal.jsx';
import PortfolioCard from '../PortfolioCard/PortfolioCard.jsx';
import toast from 'react-hot-toast';
import './Portfolio.scss';

// const PROJECT_COUNT = 6;
const PROJECT_COUNT = 4;
// const PROJECT_COUNT = 2;

const AWS_SS3_BUCKET_URL = import.meta.env.VITE_AWS_S3_BUCKET_URL;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;

const initialImages = Array.from({length: PROJECT_COUNT}, () => ({isInitialPlaceholder: true}));

const Portfolio = () => {  
  const portfolioLink = document.getElementById("portfolio-link")

  const {
    setIsLoading,
    isLoggedIn,
    logoutUser,
    isProjectOrderEditable, 
    setIsProjectOrderEditable,
    isEditMode, 
    setIsEditMode,
    rerenderTrigger,
    showNav,
    hideNav,
    lightboxOpen,
    handleSetLightBoxState
  } = useAppContext();

  const navigate = useNavigate();

  const [ activeDragProject, setActiveDragProject ] = useState({project_id: -1}); 
  const [ displayNonePlaceholders, setDisplayNonePlaceholders ] = useState(false);
  const [ isInitialMount, setIsInitialMount ] = useState(true);
  const [ modalAction, setModalAction ] = useState("");
  const [ projectsData, setProjectsData ] = useState(initialImages);
  const [ selectedProject, setSelectedProject ] = useState({});
  const [ showActionModal, setShowActionModal ] = useState(false);
  const [ showPlaceholders, setShowPlaceholders ] = useState(true);

  const handlePortfolioCardClick = (idx) => {
    const images = projectsData.map((photo, idx) => ({
      src: `${AWS_SS3_BUCKET_URL}/${photo.img_src}`,
      alt: `Photo number ${idx + 1} from ${photo.project_title}`,
    }));
    
    hideNav();
    handleSetLightBoxState(images, idx);
  };

  const handleAddNewProject = () => {
    navigate("/projects/add")
  };

  const handlePortfolioLinkClick = () => {
    portfolioLink.click()
  };

  const handleSetIsEditModeTrue = async () => {
    setIsLoading(true);
    setProjectsData(initialImages);

    setShowPlaceholders(true);
    toast("Fetching all Project Summaries...");
  
    try {
      const isSuccess = await getPortfolioProjects();
      
      if(isSuccess) {
        setIsEditMode(true);
        toast("Fetch successful. Ready to edit.");
      } else {
        toast.error("Failed to fetch project summaries.");
      };
    } catch (error) {
      console.error("Error in fetching summaries:", error);
      toast.error("Unexpected error occurred.");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, MIN_LOADING_INTERVAL);
      
      setTimeout(() => {
        hideNav();
      }, MIN_LOADING_INTERVAL * 3);
      
      handlePortfolioLinkClick();
    };
  };
  
  const handleSetIsEditModeFalse = () => {
    setIsLoading(true);
    setIsEditMode(false);
    
    handlePortfolioLinkClick();
    toast("Exiting edit mode...");

    setTimeout(() => {
      setIsLoading(false);
    }, MIN_LOADING_INTERVAL);

    setTimeout(() => {
      hideNav();
    }, MIN_LOADING_INTERVAL * 3);
  };

  const handleSetOrderIsEditable = () => {
    setIsProjectOrderEditable(true);
  };

  const handleDragStart = useCallback((projectID) => {
      setActiveDragProject(() => projectsData.find(project => project.project_id === projectID));
  }, [projectsData]);  

  const handleDropTarget = useCallback((dropTargetID, dropTargetDisplayOrder) => {
    setProjectsData(prevProjects => {
      const activeDraggedID = activeDragProject.project_id;
      const activeDraggedProjectOldDisplayOrder = activeDragProject.display_order;
      const highestDisplayOrder = prevProjects.reduce((maxDisplayOrder, project) => {
        return Math.max(maxDisplayOrder, project.display_order);
      }, 0);

      const updatedProjects = prevProjects.map(project => ({ ...project }));

      for(const project of updatedProjects) {
        
        if(dropTargetID !== activeDraggedID) {
          
          if(dropTargetDisplayOrder === highestDisplayOrder) {

            if(project.project_id === dropTargetID) {
              project.display_order = dropTargetDisplayOrder - 1;
            } else if(project.project_id === activeDraggedID) {
              project.display_order = dropTargetDisplayOrder;
            } else if(project.display_order < dropTargetDisplayOrder && project.display_order >= activeDraggedProjectOldDisplayOrder) {
              project.display_order--;
            };

          } else if(activeDraggedProjectOldDisplayOrder > dropTargetDisplayOrder) {

            if(project.project_id === dropTargetID) {
              project.display_order = dropTargetDisplayOrder + 1;
            } else if(project.project_id === activeDraggedID) {
              project.display_order = dropTargetDisplayOrder;
            } else if(project.display_order > dropTargetDisplayOrder && project.display_order <= activeDraggedProjectOldDisplayOrder) {
              project.display_order++;
            };

          } else if(dropTargetDisplayOrder > activeDraggedProjectOldDisplayOrder) {

            if(project.project_id === dropTargetID) {
              project.display_order = dropTargetDisplayOrder - 1;
            } else if(project.project_id === activeDraggedID) {
              project.display_order = dropTargetDisplayOrder;
            } else if(project.display_order <= dropTargetDisplayOrder && project.display_order > activeDraggedProjectOldDisplayOrder) {
              project.display_order--;
            };

          };
        };
      };

      updatedProjects.sort((a, b) => a.display_order - b.display_order);
      return updatedProjects;
    });
  
    setActiveDragProject({id: -1});
  }, [activeDragProject.project_id]);

  const getPortfolioProjects = async (limit) => {
    try {
      const url = `${BASE_URL}/projects/portfoliosummary${limit ? `?limit=${limit}` : ""}`;
      const response = await fetch(url);
      const data = await response.json();
  
      if(!response.ok) {
        toast.error(data.message);
        throw new Error("Error fetching portfolio project summaries");
      };
  
      setProjectsData(data);
      return true;

    } catch (error) {
      console.error('Error fetching portfolio summaries:', error);
      return false;
    };
  };

  const handleDeleteOrEditClick = (projectID) => {
    setShowActionModal(true);
    const project = projectsData.find(summary => summary.project_id === projectID);
    setSelectedProject(project);
  };

  const handleDeleteProjectClick = (projectID) => {
    handleDeleteOrEditClick(projectID);
    setModalAction("Delete");
  };

  const handleEditProjectClick = (projectID) => {
    handleDeleteOrEditClick(projectID);
    setModalAction("Edit");
  };

  const handleClearActionState = () => {
    setSelectedProject({});
    setModalAction("");
    setShowActionModal(false);
  };

  const handleCancel = () => {
    setIsLoading(true);
    toast("Cancelling...");
    setIsEditMode(false);
    setIsProjectOrderEditable(false);
    
    setShowPlaceholders(true);
    
    const refreshPlaceholders = Array.from({length: projectsData.length}, () => (
      { isInitialPlaceholder: true }
    ));

    getPortfolioProjects();
    setProjectsData(refreshPlaceholders);

    handlePortfolioLinkClick();
    
    setTimeout(() => {
      setIsLoading(false);
    }, MIN_LOADING_INTERVAL);
    
    setTimeout(() => {
      hideNav();
    }, MIN_LOADING_INTERVAL * 3);
  };

  const saveNewOrder = async () => {
    setIsProjectOrderEditable(false);
    setIsLoading(true);

    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
  
    if(!token || !refreshToken) {
      toast.error('Authorization or refresh token missing.');
      logoutUser();
      return;
    };

    try {
      const newProjectOrder = projectsData.map((project, idx) => (
        {project_id: project.project_id, display_order: idx + 1}));

      const response = await fetch(`${BASE_URL}/projects/updateorder`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "x-refresh-token": refreshToken, 
        },
        body: JSON.stringify({ new_project_order: newProjectOrder })
      });

      const { message, newToken, newRefreshToken } = await response.json();

      if(!response.ok) {
        throw new Error(message);
      };
      
      toast("Saving new order...");
      setTokens(newToken, newRefreshToken);
    } catch(error) {
      console.log(error.message);
      toast.error(error.message);
      removeTokens();
      logoutUser();
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, MIN_LOADING_INTERVAL);
      setActiveDragProject({project_id: -1});
    };
  };
   
  const handleSave = () => {
    saveNewOrder();
    handlePortfolioLinkClick();
    setIsEditMode(false);
        
    setTimeout(() => {
      hideNav();
      setIsLoading(false);
    }, MIN_LOADING_INTERVAL);
  };

  // useEffect to get portfolio summaries for ProjectCards
  useEffect(() => {
    if(isInitialMount) {
      getPortfolioProjects(PROJECT_COUNT);
      setIsInitialMount(false);
    };
    
    if(!isInitialMount) {
      setProjectsData(initialImages);
      setShowPlaceholders(true);
      setDisplayNonePlaceholders(false);
      setActiveDragProject({project_id: -1}); 

      setTimeout(() => {
        getPortfolioProjects(PROJECT_COUNT);
      }, MIN_LOADING_INTERVAL);
    };
  }, [rerenderTrigger, isInitialMount]);

    // useEffect to show Nav after user closes Lightbox to deal with lightbox Nav content shift
    useEffect(()=> {
      if(!lightboxOpen)  {
        showNav();
      };
    }, [lightboxOpen]);

  return (
    <>
      <section className="portfolio" id="portfolio">

        <a href="#portfolio" id="portfolio-link" className='portfolio__scrollTopLink'>Scroll To Portfolio Section Top</a>

        {isLoggedIn && showActionModal && isEditMode
          ? 
            (
              <EditDeleteProjectModal 
                showActionModal={showActionModal}
                setShowActionModal={setShowActionModal}
                projectID={selectedProject.project_id}
                modalAction={modalAction}
                handleClearActionState={handleClearActionState}
                setProjectsData={setProjectsData}
              />
            )
          : null
        }

        <div className="portfolio__inner">

          <div className="portfolio__header">

            <h4 className="portfolio__heading">
              PORTFOLIO
              <button 
                className={`portfolio__editModeButton ${isLoggedIn && !isEditMode ? "" : "hide"}`}
                onClick={handleSetIsEditModeTrue}
                aria-label="Enter edit mode"
              >
                <MdModeEdit className="portfolio__editMode-icon"/>
              </button>
            </h4>

            <h2 className="portfolio__sub-heading">
              Check Out My Work
            </h2>
            <p className="portfolio__lead">
              Here is a sample of my projects:
            </p>

            <button 
              className={`portfolio__addOrEditProjectOrder ${
                  isLoggedIn && isEditMode && !isProjectOrderEditable
                  ? "show" 
                  : isLoggedIn && isEditMode && isProjectOrderEditable
                  ? "show disabled" 
                  : ""
                }`
              } 
              onClick={isLoggedIn && isEditMode
                ? handleSetOrderIsEditable
                : handleAddNewProject}
            >
              {isLoggedIn && !isEditMode && !isProjectOrderEditable 
              ? "Add New Project"
              : isLoggedIn && isEditMode
              ? "Edit Project Order"
              : ""
            }
            </button>
            
          </div>

          <div id="projects" className="portfolio__projects">
            
            <div id="portfolio__projects-inner" className="portfolio__projects-inner">

              {projectsData.map((project, idx) => 

                  <PortfolioCard 
                    key={project.project_id || idx}
                    idx={idx}
                    maxIdx={projectsData.length - 1}
                    imgSrc={project.img_src}
                    projectTitle={project.project_title}
                    displayOrder={project.display_order}
                    isInitialPlaceholder={project.isInitialPlaceholder}
                    showPlaceholders={showPlaceholders}
                    setShowPlaceholders={setShowPlaceholders}
                    displayNonePlaceholders={displayNonePlaceholders}
                    setDisplayNonePlaceholders={setDisplayNonePlaceholders}
                    projectID={project.project_id}
                    isLoggedIn={isLoggedIn}
                    isEditMode={isEditMode}
                    isProjectOrderEditable={isProjectOrderEditable}
                    handleDeleteProjectClick={handleDeleteProjectClick}
                    handleEditProjectClick={handleEditProjectClick}
                    modalAction={modalAction}
                    handleDragStart={handleDragStart}
                    handleDropTarget={handleDropTarget}
                    handlePortfolioCardClick={handlePortfolioCardClick}
                  />
                )
              }
              
            </div> 

          </div>


          {!isLoggedIn

            ?
              (
                <Link
                  className="portfolio__button portfolio__button--moreProjects"
                  to="/projects"
                >
                  More Projects
                </Link>
              )
            : isLoggedIn && !isEditMode && !isProjectOrderEditable
            ? 
              (
                <button
                  className="portfolio__button portfolio__button--edit"
                  onClick={handleSetIsEditModeTrue}
                >
                  Edit
                </button>
              )
            : isLoggedIn && isEditMode && !isProjectOrderEditable
            ?
              (
                <button
                  className="portfolio__button portfolio__button--edit"
                  onClick={handleSetIsEditModeFalse}
                >
                  Finish
                </button>
              )
            :
              (
                <div className="portfolio__buttons">
                  <button 
                    className='portfolio__button portfolio__button--cancel'
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button 
                    className='portfolio__button portfolio__button--save'
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              )
          }

        </div>

      </section>
      
    </>
  )};

export default Portfolio;