import { useEffect, useState } from "react";
import Project from "../Project/Project";
import "./ProjectsFeed.scss";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProjectsFeed = () => {
  const [ projectsData, setProjectsData ] = useState([]);
  

  useEffect(() => {

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

    fetchProjects();
  }, []);

  // console.log(projectsData)


  return (
    <>
      <div className="projectsFeed">
        
        <div className="projectsFeed__inner">



        </div>



      </div>
    </>
  )};

export default ProjectsFeed;