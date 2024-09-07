import { useEffect } from "react";
import { scrollToTop } from "../../../utils/utils";
import TypingText from "../../ui/components/TypingText/TypingText";
import "./Projects.scss";

const Projects = ({ children }) => {

  // scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, []);
  
  return (
    <>
      <div className="projects">

        <div className="projects__inner">
          {children}
          <TypingText 
            classNames={"projects__heading"}
            textToType = 'Projects Page'
          />
        </div>
      </div>
    </>
  )};

export default Projects;