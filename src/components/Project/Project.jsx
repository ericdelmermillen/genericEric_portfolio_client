import { useState, useRef, useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { getMonthYear } from "../../../utils/utils";
import ProjectPlaceholder from "../ProjectPlaceholder/ProjectPlaceholder";
import "./Project.scss";

const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;
const AWS_SS3_BUCKET_URL = import.meta.env.VITE_AWS_S3_BUCKET_URL;

const Project = ({ 
  idx,
  maxIdx,
  page,
  PROJECTS_PER_PAGE,
  isInitialLoad,
  showPlaceholders, 
  setShowPlaceholders,
  projectDate,
  projectID,
  projectTitle,
  projectPhotos,
  projectURLs,
  projectDescription,
  handleSetCurrentProjectImages,
  handleCardClick
 }) => {
   
  const { setIsLoading} = useAppContext();
  
  const startIdx = (page - 1) * PROJECTS_PER_PAGE;
  const endIdx = Math.min(startIdx + PROJECTS_PER_PAGE - 1, maxIdx);
  const isCurrentPage = idx >= startIdx && idx <= endIdx;

  const [ showFullInfo, setShowFullInfo ] = useState(false);
  const [ hasLongTitle, setHasLongTitle ] = useState(false);
  const [ hasLongDesc, setHasLongDesc ] = useState(false);
  
  const [ displayNonePlaceholder, setDisplayNonePlaceholder ] = useState(false);
  const [ projectIsLoaded, setProjectIsLoaded ] = useState(false);

  const titleRef = useRef(null); 
  const descRef = useRef(null); 

  const desc = showFullInfo 
  ? projectDescription 
  : projectDescription?.split("\n")[0] || "";
  
  const handleImageClick = () => {
    handleSetCurrentProjectImages(projectID);
    handleCardClick();
  };

  const handleToggleShowFullInfo = () => {
    setShowFullInfo(prev => !prev);
  };

  const checkHasLongTitle = () => {
    if(titleRef.current) {
      const lineHeight = parseFloat(getComputedStyle(titleRef.current).lineHeight);
      const height = titleRef.current.getBoundingClientRect().height;
      setHasLongTitle(height > lineHeight); 
    };
  };

  const checkHasLongDesc = () => {
    if(descRef.current) {
      const lineHeight = parseFloat(getComputedStyle(descRef.current).lineHeight);
      const height = descRef.current.getBoundingClientRect().height;
      setHasLongDesc(projectDescription.split("\n").length > 1 || height > (lineHeight * 2.25)); 
    };
  };

  const handleResize = () => {
    checkHasLongTitle();
    checkHasLongDesc();
  };

  const handleOnLoad = () => {
    if(idx === maxIdx) {
      setTimeout(() => {
        setShowPlaceholders(false);
        setIsLoading(false);
      }, MIN_LOADING_INTERVAL);
    }
    
    if(isCurrentPage) {
      setTimeout(() => {
        setDisplayNonePlaceholder(true);
        setProjectIsLoaded(true);
      }, MIN_LOADING_INTERVAL * 2);
    };
  };
  

  //add event listener for resize of window and call handleResize for initial calculation
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return (
    <>
      <div className={`project ${projectIsLoaded
        ? "isReady" 
        : ""}`}>
          
        <div className={`project__placeholder ${displayNonePlaceholder 
          ? "hide"
          : !showPlaceholders
          ? "fade"
          : ""
        }`}>

          <ProjectPlaceholder />

        </div>

        <div className="project__inner ">

          {!isInitialLoad && projectDate
            ? (              
                <>
                  <h4 className="project__date" dateTime={projectDate}>
                    {getMonthYear(projectDate)}
                  </h4>

                  <img 
                  className={`project__image ${projectIsLoaded ? "isReady" : ""}`} 
                  // concatatenate string for url with aws s3 bucket url
                  src={`${AWS_SS3_BUCKET_URL}/${projectPhotos[0].photo_url}`} 
                  alt={`Main image for project ${projectTitle}`} 
                  onClick={() => handleImageClick()}
                  onLoad={handleOnLoad}
                  />
                </>
              )
            : null
          }


          <div className="project__text">

            <h3 
              className={`project__title ${!showFullInfo 
                ? "ellipsis"
                : ""}`}
              ref={titleRef}
            >
              {projectTitle}
            </h3>

            {desc.length && projectDescription.split("\n").length === 1
              ?
                (
                  <p 
                    className={`project__description ${showFullInfo
                      ? ""
                      : "ellipsis"}`}
                      ref={descRef}
                  >
                    {desc}
                  </p>
                )
              : desc.length && projectDescription.split("\n").length > 1 && showFullInfo
              ?
                <>
                  {projectDescription.split("\n").map((paragraph, idx) => 
                    <p className="project__description" key={idx}>
                      {paragraph}
                    </p>
                    )
                  }
                </>
              : desc.length && projectDescription.split("\n").length > 1 && !showFullInfo
              ?
              <>
                <p className={`project__description ${hasLongDesc && !showFullInfo 
                  ? "ellipsis" 
                  : ""}`}
                  ref={descRef}
                >
                  {desc}
                </p>
              </>
              : null
            }

          </div>


          {projectURLs?.length 

            ? 
              (
                <>
                  
                  <h4 className="project__links">Project Links:</h4>
                  <ul className="project__urls">
                    {projectURLs.map((project, index) => (

                      <li key={index} className="project__url">
                        
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
                </>
              ) 
            : null
          } 

          {hasLongDesc || hasLongTitle
            ?
              <button 
                className="project__show-full-info"  
                onClick={handleToggleShowFullInfo}>
                  {showFullInfo ? "Show Less" : "Show Full Info"}
                </button>
            : null
          }
     
        </div>

      </div>

    </>
  )};

export default Project;