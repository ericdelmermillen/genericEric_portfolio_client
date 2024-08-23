import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { scrollToTop } from "../../../utils/utils";
import "./ProjectDetails.scss";

const ProjectDetails = () => {
  const { projectID } = useParams();

  const navigate = useNavigate();

  // scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
    <div className="projectDetails">
      <h1>Project Details: Project {projectID}</h1>

      <button
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      
    </div>
    </>
  )};

export default ProjectDetails;