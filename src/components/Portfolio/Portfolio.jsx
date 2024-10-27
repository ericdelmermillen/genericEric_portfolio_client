import { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/AppContext.jsx';
import { Link } from 'react-router-dom';
import { removeTokens, setTokens } from '../../../utils/utils.js';
import LightBox from '../LightBox/LightBox.jsx';
import ProjectCard from '../ProjectCard/ProjectCard.jsx';
import toast from 'react-hot-toast';
import './Portfolio.scss';
import { MdModeEdit } from 'react-icons/md';

const PROJECT_COUNT = 6;
// const PROJECT_COUNT = 2;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Portfolio = () => {
  const [ showLightBox, setShowLightBox ] = useState(false);
  const [ currentIdx, setCurrentIdx ] = useState(null);
  const [ portfolioSummaries, setPortfolioSummaries ] = useState([]);
  const [ showPortfolioPlaceholders, setShowPortfolioPlaceholders ] = useState(true);
  const [ isEditMode, setIsEditMode ] = useState(false);

  
  const {
    isLoading, 
    setIsLoading,
    isLoggedIn,
    logoutUser,
    isProjectOrderEditable, 
    setIsProjectOrderEditable,
    MIN_LOADING_INTERVAL,
    LIGHTBOX_TIMING_INTERVAL
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

  const handleSetShowPortfolioPlaceholders = () => {
    setShowPortfolioPlaceholders(false);
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
    }
  };


  const handleDeleteProject = async (projectID) => {
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
      }, MIN_LOADING_INTERVAL);
    };
  };

  const handleSetIsEditMode = async () => {
    setIsLoading(true);
    setPortfolioSummaries([]);
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
    }
  
    setIsLoading(false);
    setShowPortfolioPlaceholders(true);
  };

  const handleCancel = () => {
    console.log("cancel")
    
  };
  
  const handleSave = () => {
    console.log("save")

  };
  

  // useEffect to get portfolio summaries for ProjectCards
  // only need at initial mount
  useEffect(() => {
    getPortfolioSummaries(PROJECT_COUNT);
  }, []);


  return (
    <>
      <section className="portfolio">

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
            <button 
              className={`portfolio__editModeButton ${isLoggedIn && !isEditMode ? "" : "hide"}`}
              onClick={handleSetIsEditMode}
            >
              <MdModeEdit className="portfolio__editMode-icon"/>
            </button>

            <h4 className="portfolio__heading">
              PORTFOLIO
            </h4>
            <h2 className="portfolio__sub-heading">
              Check Out My Work
            </h2>
            <p className="portfolio__lead">
              Here is a small smaple of my projects:
            </p>
      
          <button 
            className={`portfolio__editProjectOrder ${
                isLoggedIn && isEditMode && !isProjectOrderEditable
                ? "show" 
                : isLoggedIn && isEditMode && isProjectOrderEditable
                ? "show disabled" 
                : ""
              }`
            } 
            onClick={handleSetOrderIsEditable}
          >
            Edit Project Order
          </button>
           
          </div>

          <div className={`portfolio__projects ${isLoading ? "" : "isLoaded"}`}>

            <div className={`portfolio__projects-inner ${showPortfolioPlaceholders ? "" : "show"}`}>

              {
                portfolioSummaries.map((project, idx) => 
                  <ProjectCard 
                    key={project.project_id}
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
                    handleSetShowPortfolioPlaceholders={handleSetShowPortfolioPlaceholders}
                    handleDeleteProject={handleDeleteProject}
                  />
                )
              }

            </div>

            <div className={`portfolio__project-placeholders ${showPortfolioPlaceholders ? "" : "hide"}`}>

              {Array.from({ length: PROJECT_COUNT}).map((_, idx) => (
                <div 
                  key={idx}
                  className='portfolio__project-placeholder'
                >
                </div>
                ))
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