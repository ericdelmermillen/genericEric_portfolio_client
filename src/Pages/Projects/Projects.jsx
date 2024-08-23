import { useEffect } from "react";
import { scrollToTop } from "../../../utils/utils";
import "./Projects.scss";

const Projects = () => {

  // scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, []);
  
  return (
    <>
      <div className="projects">
        <h1 className="projects">
          From Projects
        </h1> 
      </div>
    </>
  )};

export default Projects;