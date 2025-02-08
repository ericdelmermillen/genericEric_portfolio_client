import { useEffect } from "react";
import TypingText from "../../components/TypingText/TypingText.jsx";
import ProjectsFeed from "../../components/ProjectsFeed/ProjectsFeed.jsx";
import "./Projects.scss";

const Projects = ({ children }) => {

  // update title of page
    // useEffect(() => {
    //   document.title = "Eric Millen's Software Portfolio";
    // }, []);
  
  return (
    <>
      <div className="projects">
        <div className="projects__inner">
            {children}
          <div className="projects__content">
            <TypingText 
              classNames={"projects__heading"}
              textToType = 'Some Of My Projects'
            />
            <ProjectsFeed />
          </div>

        </div>
      </div>
    </>
  )};

export default Projects;