import { useEffect } from "react";
import { scrollToTop } from "../../../utils/utils";
import TypingText from "../../components/TypingText/TypingText.jsx";
import Portfolio from "../../components/Portfolio/Portfolio.jsx";
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
          {/* {children}
          <TypingText 
            classNames={"projects__heading"}
            textToType = 'Projects Page'
          /> */}
          <Portfolio />
        </div>
      </div>
    </>
  )};

export default Projects;