import { useState, useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext.jsx";
import { useLightBoxContext } from "../../contexts/LightBoxContext.jsx";
import { scrollToTop } from "../../../utils/utils.js";
import LightBox from "../../components/LightBox/LightBox.jsx";
import Project from "../Project/Project";
import toast from "react-hot-toast";
import "./ProjectsFeed.scss";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const PROJECTS_PER_PAGE = 1;
const PROJECTS_PER_PAGE = 2;
// const PROJECTS_PER_PAGE = 3;
// const PROJECTS_PER_PAGE = 8;
// const PROJECTS_PER_PAGE = 10;

// *** use for placeholders
  const initialPosts = Array.from({length: PROJECTS_PER_PAGE}, () => (
    {
      isInitialPlaceholder: true,
      description: ""
    }
  ));

const ProjectsFeed = () => {
  const { setIsLoading } = useAppContext();
  
  const {
    showLightBox, 
    setShowLightBox,
    lightBoxImages, 
    setLightBoxImages,
    currentIdx, 
    setCurrentIdx,
    handleCardClick,
    handleIncrementCurrentIdx,
    handleDecrementCurrentIdx
  } = useLightBoxContext();
  
  const [ projectsData, setProjectsData ] = useState(initialPosts);
  const [ isFinalPageFetched, setIsFinalPageFetched ] = useState(false);
  const [ isFinalPageLoaded, setIsFinalPageLoaded ] = useState(false);
  
  const [ isInitialFetch, setIsInitialFetch ] = useState(true);
  const [ page, setPage ] = useState(1);
  const [ isInitialLoad, setIsInitialLoad ] = useState(true);
  const [ showPlaceholders, setShowPlaceholders ] = useState(true);

  const handleSetCurrentProjectImages = (projectID) => {
    setShowLightBox(true);

    const selectedProject = projectsData.find(project => project.project_id === projectID);
    const projectTitle = selectedProject.project_title;

    setLightBoxImages(selectedProject.project_photos.map((photo, idx) => (
      {
        img_id: photo.photo_id,
        img_src: photo.photo_url,
        img_alt: `Photo number ${idx + 1} from ${projectTitle}`
      }
    )));    
  };

  const handleSetShowLightBoxFalse = () => {
    setTimeout(() => {
      setShowLightBox(false);
    }, LIGHTBOX_TIMING_INTERVAL);
  };

  const fetchProjects = async () => {
    if(!isFinalPageFetched) {
      setIsLoading(true);
      setShowPlaceholders(true)
      const offset = PROJECTS_PER_PAGE * (page - 1);

      try {
        const response = await fetch(`${BASE_URL}/projects/all?limit=${PROJECTS_PER_PAGE}&offset=${offset}`);

        if(!response.ok) {
          throw new Error(error);
        };
        
        const { projects, isPaginationComplete, error } = await response.json();

        if(!projects.length && isInitialFetch) {
          setIsInitialFetch(false);
          setIsFinalPageFetched(true);
          setIsFinalPageLoaded(true);
          scrollToTop();
          toast("No projects available");
        };

        if(isInitialFetch) {
          setIsInitialFetch(false);
          setProjectsData(projects);
          scrollToTop();
        } else if(!isInitialFetch) {
          setProjectsData(c => [...c, ...projects])
        };

        if(isPaginationComplete) {
          setIsFinalPageFetched(true);
        };
        
      } catch(error) {
        console.log(error);
        toast.error(error.message);
      } finally {
        if(isInitialLoad) {
          setIsInitialLoad(false);
        };
        setIsLoading(false);
      };
    };
  };

  const handleFetchNextPage = () => {
    if(!isFinalPageFetched) {
      setPage(c => c + 1);
    } else if(isFinalPageFetched) {
      setIsFinalPageLoaded(true);
      toast("No more projects to show");
    };
  };

  // // fetch next page useEffect
  useEffect(() => {
    if(!isFinalPageFetched) {
      fetchProjects();
    };
  }, [page]);
 
  return (
    <>
      <div className="projectsFeed">

        {showLightBox
          ? 
            (
              <LightBox 
                lightBoxImages={lightBoxImages}
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
        
        <div className="projectsFeed__inner">

          {projectsData.map((project, idx) => 
            
            <Project 
              key={project.project_id || idx}
              idx={idx}
              maxIdx={projectsData.length - 1}
              page={page}
              PROJECTS_PER_PAGE={PROJECTS_PER_PAGE}
              isInitialLoad={isInitialLoad}
              showPlaceholders={showPlaceholders}
              setShowPlaceholders={setShowPlaceholders}
              projectID={project.project_id}
              projectDate={project.project_date}
              projectTitle={project.project_title}
              projectPhotos={project.project_photos}
              projectURLs={project.project_urls}
              projectDescription={project.project_description}
              setShowLightBox={setShowLightBox}
              handleCardClick={handleCardClick}
              handleSetCurrentProjectImages={handleSetCurrentProjectImages}
              isInitialFetch={isInitialFetch}
            />

          )}
        </div>
        
        <button
          className={`projectsFeed__button ${isFinalPageLoaded 
            ? "disabled"
            : ""}`}
          onClick={!isFinalPageLoaded
            ? handleFetchNextPage
            : null
          }
          aria-label="Load more projects"
        >
          Load More Posts
        </button>

      </div>
    </>
  )};

export default ProjectsFeed;