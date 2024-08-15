import { useParams } from "react-router-dom";
import "./ProjectDetails.scss";

const ProjectDetails = () => {
  const { projectID } = useParams();

  return (
    <>
      <h1>Project Details: Project {projectID}</h1>
    </>
  )};

export default ProjectDetails;