import { getMonthYear } from "../../../utils/utils";
import "./Project.scss";

const Project = ({ projectDate }) => {

  console.log(projectDate)
  return (
    <>

      <div className="project">
          
        <div className="project__inner">
          {/* <h4 
            className="project__date"
            dateTime={projectDate}
            >
            Date
          </h4> */}
          {/* 

          <img 
            src={projectsData.project_photos[0].photo_url} 
            alt={`Main photo for project ${projectsData.project_title}`} className="project__mainImage" 
          />

          <h3 className="project__title">
            {projectsData.project_title ? projectsData.project_title : null}
          </h3>

            Project */}
          </div>

        </div>

    </>
  )};

export default Project;