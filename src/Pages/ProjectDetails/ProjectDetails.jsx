import { useParams } from "react-router-dom";
import "./ProjectDetails.scss";

const ProjectDetails = () => {
  const { projectID } = useParams();

  return (
    <>
    <div className="projectDetails">
      <h1>Project Details: Project {projectID}</h1>
    </div>
    </>
  )};

export default ProjectDetails;