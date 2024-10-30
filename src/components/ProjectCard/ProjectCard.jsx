import { useAppContext } from "../../contexts/AppContext";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import ProjectPlaceholder from "../ProjectPlaceholder/ProjectPlaceholder";
import "./ProjectCard.scss";

const ProjectCard = ({ 
  projectID,
  isInitialPlaceholder,
  showPlaceholders, 
  setShowPlaceholders,
  displayNonePlaceholders, 
  setDisplayNonePlaceholders,
  idx,
  maxIdx,
  imgSrc, 
  projectTitle, 
  isProjectOrderEditable,
  isLoggedIn,
  isEditMode,
  handleProjectCardClick,
  handleDeleteProjectClick,
  handleEditProjectClick
}) => {

  const { LIGHTBOX_TIMING_INTERVAL } = useAppContext();

  const handleOnLoad = () => {
    setTimeout(() => {
      setShowPlaceholders(false);
    }, LIGHTBOX_TIMING_INTERVAL);

    setTimeout(() => {
      setDisplayNonePlaceholders(true);
    }, 500);
  };  
  
  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleDeleteProjectClick(projectID);
    console.log(`projectID: ${projectID}`)
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleEditProjectClick(projectID);
    console.log(`projectID: ${projectID}`)
  };

  if(isInitialPlaceholder) {
    return (
      <ProjectPlaceholder />
    )
  };


  return (
    <>
      <div 
        className={`projectCard ${isProjectOrderEditable ? "draggable" : ""}`}
        onClick={!isProjectOrderEditable
          ? () => handleProjectCardClick(idx)
          : null
        }
      >

        <div className={`projectCard__placeholder ${!showPlaceholders && displayNonePlaceholders
          ? "hide" 
          : !showPlaceholders
          ? "fade"
          : ""}`}
        >
          <ProjectPlaceholder />
        </div>

        <button 
          className={`projectCard__button projectCard__button--delete ${isLoggedIn && isEditMode && !isProjectOrderEditable
            ? "show" 
            : ""}`}
            onClick={isLoggedIn && isEditMode &!isProjectOrderEditable
              ? (e) => handleDeleteClick(e)
              : null
            }
        ><MdDelete className="projectCard__button-icon"/>
        </button>

        <button 
          className={`projectCard__button projectCard__button--edit ${isLoggedIn && isEditMode && !isProjectOrderEditable
            ? "show" 
            : ""}`}
          onClick={isLoggedIn && isEditMode &!isProjectOrderEditable
              ? (e) => handleEditClick(e)
              : null
            }
        ><MdModeEdit className="projectCard__button-icon"/>
        </button>

				<div className="projectCard__inner">
          <img 
            className="projectCard__img"
            src={imgSrc}
            alt={`Card Image for ${projectTitle} Project`}
            onLoad={idx === maxIdx
              ? handleOnLoad
              : null
            }
          />
				</div>
			</div>
    </>
  )};

export default ProjectCard;