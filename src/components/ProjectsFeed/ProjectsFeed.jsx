import { useEffect, useState } from "react";
import Project from "../Project/Project";
import "./ProjectsFeed.scss";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProjectsFeed = () => {
  const [ projectsData, setProjectsData ] = useState([]);






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
            />

          )}

        </div>



      </div>
    </>
  )};

export default ProjectsFeed;