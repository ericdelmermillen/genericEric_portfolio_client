import { getMonthYear } from "../../../utils/utils";
import { FaGlobe, FaYoutube, FaGithub } from "react-icons/fa6";
import "./Project.scss";

const Project = ({ 
  idx,
  projectDate,
  projectID,
  projectTitle,
  projectPhotos,
  projectURLs,
  projectDescription,
  handleSetShowLightBoxTrue
 }) => {
  
  projectURLs.forEach((url, idx) => {
    if(Object.keys(url)[0] === "Deployed Url") {
      url.url_icon = FaGlobe
    } else if(Object.keys(url)[0] === "Youtube Video") {
      url.url_icon = FaYoutube
    } else if(Object.keys(url)[0].includes("Github")) {
      url.url_icon = FaGithub
    };
  });

  // console.log(projectDescription)


  const handleImageClick = () => {
    // console.log(`projectID: ${projectID}`)
    handleSetShowLightBoxTrue(projectID)
  }

  return (
    <>

      <div className="project">
          
        <div className="project__inner">

          <h4 
            className="project__date"
            dateTime={projectDate}
          >
            {getMonthYear(projectDate)}
          </h4>

          <img 
            className="project__image" 
            src={projectPhotos[0].photo_url} 
            alt={`Main image for project ${projectTitle}`} 
            onClick={() => handleImageClick()}
          />

          <h3 className="project__title">
            {projectTitle}
          </h3>

        {projectURLs.length ? (
          <ul className="project__urls">
            {projectURLs.map((project, index) => (
              <li key={index} className="project__url">
                {project.url_icon && (
                  <project.url_icon className="project__url-icon" />
                )}
                <a 
                  className="project__url-link" 
                  href={Object.values(project)[0]} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {Object.values(project)[0]}
                </a>
              </li>
            ))}
          </ul>
        ) : null}

     
          </div>

        </div>

    </>
  )};

export default Project;