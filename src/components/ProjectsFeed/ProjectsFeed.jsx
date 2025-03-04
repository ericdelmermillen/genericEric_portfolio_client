import { useState, useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext.jsx";
import { scrollToTop } from "../../../utils/utils.js";
import { Zoom } from "yet-another-react-lightbox/plugins"; 
import Lightbox from "yet-another-react-lightbox";
import Project from "../Project/Project";
import toast from "react-hot-toast";
import "./ProjectsFeed.scss";
import "yet-another-react-lightbox/styles.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AWS_SS3_BUCKET_URL = import.meta.env.VITE_AWS_S3_BUCKET_URL;
// const PROJECTS_PER_PAGE = 1;
const PROJECTS_PER_PAGE = 2;
// const PROJECTS_PER_PAGE = 3;
// const PROJECTS_PER_PAGE = 4;
// const PROJECTS_PER_PAGE = 8;
// const PROJECTS_PER_PAGE = 10;

// *** use for placeholders
  const initialPosts = Array.from({length: PROJECTS_PER_PAGE}, () => (
    { isInitialPlaceholder: true, description: "" }
  ));

const ProjectsFeed = () => {
  const { setIsLoading, showNav } = useAppContext();

  const [ isFinalPageFetched, setIsFinalPageFetched ] = useState(false);
  const [ isFinalPageLoaded, setIsFinalPageLoaded ] = useState(false);
  const [ isInitialFetch, setIsInitialFetch ] = useState(true);
  const [ isInitialLoad, setIsInitialLoad ] = useState(true);
  const [ page, setPage ] = useState(1);
  const [ projectsData, setProjectsData ] = useState(initialPosts);
  const [ showPlaceholders, setShowPlaceholders ] = useState(true);

  // YARL state
  const [ lightboxOpen, setLightboxOpen ] = useState(false);
  const [ lightboxIndex, setLightboxIndex ] = useState(0);
  const [ slides, setSlides ] = useState([]);
  
  const handleSetCurrentProjectImages = (projectID) => {
    const selectedProject = projectsData.find(project => project.project_id === projectID);

    const images = selectedProject.project_photos.map((photo, idx) => ({
      src: `${AWS_SS3_BUCKET_URL}/${photo.photo_url}`,
      alt: `Photo number ${idx + 1} from ${photo.projectTitle}`,
    }));

    setSlides(images);
    setLightboxOpen(true);
    setLightboxIndex(0);
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

  // useEffect to show Nav after user closes Lightbox to deal with lightbox Nav content shift
  useEffect(()=> {
    if(!lightboxOpen)  {
      showNav();
    };
  }, [lightboxOpen]);

  // // fetch next page useEffect
  useEffect(() => {
    if(!isFinalPageFetched) {
      fetchProjects();
    };
  }, [page]);

  console.log(lightboxOpen)
 
  return (
    <>
      <div className="projectsFeed">

        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={slides}
          plugins={[, Zoom]}
          carousel={{ finite: slides.length === 1 }} 
          className={`yarl-lightbox ${slides.length === 1 ? "hide-arrows" : ""}`}
          on={{click: ({ index }) => setLightboxIndex(index)}}
          zoom={{ enabled: slides.length > 0 }}
        />
        
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