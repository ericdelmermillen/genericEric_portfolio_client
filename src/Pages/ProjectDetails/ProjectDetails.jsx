import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { scrollToTop } from "../../../utils/utils";
import "./ProjectDetails.scss";
import BackButton from "../../components/BackButton/BackButton";

const ProjectDetails = ({ children }) => {
  const { projectID } = useParams();

  const navigate = useNavigate();

  // scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
    <div className="projectDetails">
      <BackButton />
      <div className="projectDetails__inner">
        {children}
        <h1 className="projectDetails__heading">Project Details: Project {projectID}</h1>
      </div>
    </div>
    </>
  )};

export default ProjectDetails;