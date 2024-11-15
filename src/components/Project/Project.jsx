import { useState, useRef, useEffect } from "react";
import { getMonthYear } from "../../../utils/utils";
import "./Project.scss";
import { useAppContext } from "../../contexts/AppContext";

const Project = ({ 
  idx,
  projectDate,
  projectID,
  projectTitle,
  projectPhotos,
  projectURLs,
  projectDescription,
  handleSetCurrentProjectImages,
  handleCardClick
 }) => {

  const { isLoading } = useAppContext();

  const [ showFullInfo, setShowFullInfo ] = useState(false);
  const [ hasLongTitle, setHasLongTitle ] = useState(false);
  const [ hasLongDesc, setHasLongDesc ] = useState(false);

  const titleRef = useRef(null); 
  const descRef = useRef(null); 

  const desc = showFullInfo 
  ? projectDescription 
  : projectDescription.split("\n")[0];


  // if(projectID === 8) {
  //   console.log(desc)
  // }


  const handleImageClick = () => {
    console.log(`projectID: ${projectID}`)
    handleSetCurrentProjectImages(projectID);
    handleCardClick();
  };

  const handleToggleShowFullInfo = () => {
    setShowFullInfo(prev => !prev)
  }


  const checkHasLongTitle = () => {
    if(titleRef.current) {
      const lineHeight = parseFloat(getComputedStyle(titleRef.current).lineHeight);
      const height = titleRef.current.getBoundingClientRect().height;
      setHasLongTitle(height > lineHeight); 
    }
  };

  const checkHasLongDesc = () => {
    if(descRef.current) {
      const lineHeight = parseFloat(getComputedStyle(descRef.current).lineHeight);
      const height = descRef.current.getBoundingClientRect().height;
      setHasLongDesc(projectDescription.split("\n").length > 1 || height > (lineHeight * 3)); 
    }
  };

  const handleResize = () => {
    checkHasLongTitle();
    checkHasLongDesc();
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

      <div className="project">
          
        <div className="project__inner">

          <h4 className="project__date" dateTime={projectDate}>
            {getMonthYear(projectDate)}
          </h4>

         <img 
            className="project__image" 
            src={projectPhotos[0].photo_url} 
            alt={`Main image for project ${projectTitle}`} 
            onClick={() => handleImageClick()}
          /> 

          <div className="project__text">

            <h3 
              className={`project__title ${hasLongTitle && !showFullInfo 
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
                      : "ellipsis"

                    }`}
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


        {projectURLs.length 

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


            {((hasLongDesc && !isLoading) || (hasLongTitle &&!isLoading)) 
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