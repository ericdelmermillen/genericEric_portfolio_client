import { useEffect, useState } from "react";
import LightBox from "../../components/LightBox/LightBox.jsx";
import Project from "../Project/Project";
import "./ProjectsFeed.scss";
import { useLightBoxContext } from "../../contexts/LightBoxContext.jsx";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProjectsFeed = () => {
  const { 
    showLightBox, 
    setShowLightBox
  } = useLightBoxContext()
  
  
  const [ projectsData, setProjectsData ] = useState([]);
  const [ currentIdx, setCurrentIdx ] = useState(0);


  const [ currentProjectPhotos, setCurrentProjectPhotos ] = useState([]);

  const handleSetShowLightBoxTrue = (projectID) => {
    setShowLightBox(true);
    console.log(projectID)
    setCurrentProjectPhotos(projectsData[0].project_photos)

    // console.log(projectsData[0].project_photos)
  };

  const handleSetShowLightBoxFalse = () => {
    setTimeout(() => {
      setShowLightBox(false);
    }, LIGHTBOX_TIMING_INTERVAL);
  };

  const handleIncrementCurrentIdx = () => {
    if(currentIdx >= projectsData.length - 1) {
      setCurrentIdx(0);
    } else {
      setCurrentIdx(c => c + 1);
    };
  };

  const handleDecrementCurrentIdx = () => {
    if(currentIdx <= 0) {
      setCurrentIdx(projectsData.length - 1);
    } else {
      setCurrentIdx(c => c - 1);
    };
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

  // console.log(projectsData)


  return (
    <>
      <div className="projectsFeed">

        {showLightBox
          ? 
            (
              <LightBox 
                images={currentProjectPhotos}
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
              handleSetShowLightBoxTrue={handleSetShowLightBoxTrue}
            />

          )}

        </div>



      </div>
    </>
  )};

export default ProjectsFeed;