import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import ProjectPlaceholder from "../ProjectPlaceholder/ProjectPlaceholder";
import "./ProjectCard.scss";


const ProjectCard = ({ 
  projectID,
  idx,
  maxIdx,
  imgSrc, 
  projectTitle, 
  isProjectOrderEditable,
  isLoggedIn,
  isEditMode,
  handleProjectCardClick,
  handleDeleteProjectClick,
  handleEditProjectClick,
  isInitialPlaceholder
}) => {

  const [ showPlaceholder, setShowPlaceholder ] = useState(true);

  const handleOnLoad = () => {
    setShowPlaceholder(false);
    console.log(`Loaded card ${projectID}`)
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
    handleEditProjectClick(projectID)
    console.log(`projectID: ${projectID}`)
  };

  if(isInitialPlaceholder) {
    return (
      <ProjectPlaceholder />
    )
  }


  return (
    <>
      <div 
        className={`projectCard ${isProjectOrderEditable ? "draggable" : ""}`}
        onClick={!isProjectOrderEditable
          ? () => handleProjectCardClick(idx)
          : null
        }
      >

        {showPlaceholder
          ? (
            <div className="projectCard__placeholder">
              <ProjectPlaceholder />
            </div>
              )
          : null
        }


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
            onLoad={handleOnLoad}
          />
				</div>
			</div>
    </>
  )};

export default ProjectCard;