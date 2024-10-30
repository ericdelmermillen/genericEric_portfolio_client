import { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/AppContext.jsx';
import { Link } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md';
import AddEditDeleteProjectModal from '../AddEditDeleteProjectModal/AddEditDeleteProjectModal.jsx';
import LightBox from '../LightBox/LightBox.jsx';
import ProjectCard from '../ProjectCard/ProjectCard.jsx';
import toast from 'react-hot-toast';
import './Portfolio.scss';

// const PROJECT_COUNT = 6;
// const PROJECT_COUNT = 4;
const PROJECT_COUNT = 2;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const initialProjects = Array.from({length: PROJECT_COUNT}, () => ({isInitialPlaceholder: true}))

const Portfolio = () => {
  
  const [ showLightBox, setShowLightBox ] = useState(false);
  const [ currentIdx, setCurrentIdx ] = useState(null);
  const [ showPlaceholders, setShowPlaceholders ] = useState(true);
  const [ displayNonePlaceholders, setDisplayNonePlaceholders ] = useState(false);
  const [ portfolioSummaries, setPortfolioSummaries ] = useState(initialProjects);
  const [ showActionModal, setShowActionModal ] = useState(false);
  const [ selectedProject, setSelectedProject ] = useState({});
  const [ modalAction, setModalAction ] = useState("");
  
  const {
    setIsLoading,
    isLoggedIn,
    logoutUser,
    isProjectOrderEditable, 
    setIsProjectOrderEditable,
    MIN_LOADING_INTERVAL,
    LIGHTBOX_TIMING_INTERVAL,
    isEditMode, 
    setIsEditMode
  } = useAppContext();

  const handleSetShowLightBoxTrue = () => {
    setShowLightBox(true);
  };

  const handleSetShowLightBoxFalse = () => {
    setTimeout(() => {
      setShowLightBox(false);
    }, LIGHTBOX_TIMING_INTERVAL);
  };

  const handleProjectCardClick = (idx) => {
    handleSetShowLightBoxTrue();
    setCurrentIdx(idx);

  };

  const handleIncrementCurrentIdx = () => {
    if(currentIdx >= portfolioSummaries.length - 1) {
      setCurrentIdx(0);
    } else {
      setCurrentIdx(c => c + 1);
    };
  };

  const handleDecrementCurrentIdx = () => {
    if(currentIdx <= 0) {
      setCurrentIdx(portfolioSummaries.length - 1);
    } else {
      setCurrentIdx(c => c - 1);
    };
  };

  const handleAddNewProject = () => {
    console.log("add new project")
  };

  const handleSetIsEditMode = async () => {
    setIsLoading(true);
    setPortfolioSummaries(initialProjects);
    setShowPlaceholders(true);
    toast("Fetching all Project Summaries...");
  
    try {
      const isSuccess = await getPortfolioSummaries();
      
      if(isSuccess) {
        setIsEditMode(true);
        toast("Fetch successful. Ready to edit.");
      } else {
        toast.error("Failed to fetch project summaries.");
      }
    } catch (error) {
      console.error("Error in fetching summaries:", error);
      toast.error("Unexpected error occurred.");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, MIN_LOADING_INTERVAL)
    };
  };

  const handleSetOrderIsEditable = () => {
    setIsProjectOrderEditable(true);
  };

  const getPortfolioSummaries = async (limit) => {
    try {
      const url = `${BASE_URL}/projects/portfoliosummary${limit ? `?limit=${limit}` : ''}`;
      const response = await fetch(url);
      const data = await response.json();
  
      if(!response.ok) {
        throw new Error("Error fetching portfolio project summaries");
      }
  
      setPortfolioSummaries(data);
      return true;
  
    } catch (error) {
      console.error('Error fetching portfolio summaries:', error);
      toast.error(error.message);
      return false;
    };
  };

  const handleDeleteOrEditClick = (projectID) => {
    setShowActionModal(true);
    const project = portfolioSummaries.find(summary => summary.project_id === projectID);
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
    console.log("state cleared")
  }

  const scrollToDivTop = () => {
    const targetDiv = document.getElementById("portfolio");
    if(targetDiv) {
      const offsetTop = targetDiv.offsetTop; 
      window.scrollTo({
        top: offsetTop + 750,
        behavior: "smooth"
      });
    }
  };

  const handleCancel = () => {
    setIsLoading(true);
    toast("Exiting Edit Mode...");
    setIsEditMode(false);
    setIsProjectOrderEditable(false);
    setPortfolioSummaries(initialProjects);
    getPortfolioSummaries(PROJECT_COUNT);
    scrollToDivTop();
    
    setTimeout(() => {
      setIsLoading(false);
    }, MIN_LOADING_INTERVAL)
    
  };
  
  const handleSave = () => {
    console.log("save")
    // make call to update project order here

  };
  

  // useEffect to get portfolio summaries for ProjectCards
  // only need at initial mount
  useEffect(() => {
    getPortfolioSummaries(PROJECT_COUNT);
  }, []);


  return (
    <>
      <section className="portfolio" id="portfolio">

        {isLoggedIn && showActionModal && isEditMode
          ? 
            (
              <AddEditDeleteProjectModal 
                showActionModal={showActionModal}
                setShowActionModal={setShowActionModal}
                projectID={selectedProject.project_id}
                modalAction={modalAction}
                handleClearActionState={handleClearActionState}
                setPortfolioSummaries={setPortfolioSummaries}
              />
            )
          : null
        }

        {showLightBox
          ? 
            (
              <LightBox 
                images={portfolioSummaries}
                currentIdx={currentIdx}
                setCurrentIdx={setCurrentIdx}
                showLightBox={showLightBox}
                setShowLightBox={setShowLightBox}
                handleSetShowLightBoxFalse={handleSetShowLightBoxFalse}
                handleIncrementCurrentIdx={handleIncrementCurrentIdx}
                handleDecrementCurrentIdx={handleDecrementCurrentIdx}
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
                onClick={handleSetIsEditMode}
              >
                <MdModeEdit className="portfolio__editMode-icon"/>
              </button>
            </h4>

            <h2 className="portfolio__sub-heading">
              Check Out My Work
            </h2>
            <p className="portfolio__lead">
              Here is a small smaple of my projects:
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

              {
                portfolioSummaries.map((project, idx) => 
                  <ProjectCard 
                    key={project.project_id || idx}
                    showPlaceholders={showPlaceholders}
                    setShowPlaceholders={setShowPlaceholders}
                    displayNonePlaceholders={displayNonePlaceholders}
                    setDisplayNonePlaceholders={setDisplayNonePlaceholders}
                    projectID={project.project_id}
                    idx={idx}
                    maxIdx={portfolioSummaries.length - 1}
                    imgSrc={project.imgSrc}
                    projectTitle={project.projectTitle}
                    isLoggedIn={isLoggedIn}
                    isEditMode={isEditMode}
                    isProjectOrderEditable={isProjectOrderEditable}
                    handleSetShowLightBoxTrue={handleSetShowLightBoxTrue}
                    handleProjectCardClick={handleProjectCardClick}
                    handleDeleteProjectClick={handleDeleteProjectClick}
                    handleEditProjectClick={handleEditProjectClick}
                    modalAction={modalAction}
                    isInitialPlaceholder={project.isInitialPlaceholder}
                  />
                )
              }
              
            </div>

          </div>

          {isLoggedIn && isEditMode

            ? (
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
              : (
                  <Link
                    className="portfolio__button portfolio__button--moreProjects"
                    to="/projects"
                  >
                    More Projects
                  </Link>
                )
          }

        </div>

      </section>
      
    </>
  )};

export default Portfolio;