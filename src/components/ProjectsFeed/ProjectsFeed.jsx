import { useEffect, useState } from "react";
import { useLightBoxContext } from "../../contexts/LightBoxContext.jsx";
import LightBox from "../../components/LightBox/LightBox.jsx";
import Project from "../Project/Project";
import "./ProjectsFeed.scss";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProjectsFeed = () => {
  const {
    showLightBox, 
    setShowLightBox,
    handleSetShowLightBoxTrue,
    lightBoxImages, 
    setLightBoxImages,
    currentIdx, 
    setCurrentIdx,
    handleCardClick,
    handleIncrementCurrentIdx,
    handleDecrementCurrentIdx
  } = useLightBoxContext();
  
  const [ projectsData, setProjectsData ] = useState([]);

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
    try {
      const response = await fetch(`${BASE_URL}/projects/all`);
      const data = await response.json();

      setProjectsData(data)

      if(!response.ok) {
        throw new Error(data.message);
      }
       
    } catch(error) {
      console.log(error)
    }
  }
  

  useEffect(() => {

    fetchProjects();
  }, []);


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
                handleSetShowLightBoxTrue={handleSetShowLightBoxTrue}
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
              key={project.project_id}
              idx={idx}
              projectID={project.project_id}
              projectDate={project.project_date}
              projectTitle={project.project_title}
              projectPhotos={project.project_photos}
              projectURLs={project.project_urls}
              projectDescription={project.project_description}
              setShowLightBox={setShowLightBox}
              handleCardClick={handleCardClick}
              handleSetCurrentProjectImages={handleSetCurrentProjectImages}
            />

          )}

        </div>

      </div>
    </>
  )};

export default ProjectsFeed;