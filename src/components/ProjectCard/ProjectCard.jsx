import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
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
  handleSetShowPortfolioPlaceholders,
  handleDeleteProject
}) => {

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleDeleteProject(projectID)
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`edit card ${idx + 1}?`)
  };


  return (
    <>
      <div 
        className={`projectCard ${isProjectOrderEditable ? "draggable" : ""}`}
        onClick={() => handleProjectCardClick(idx)}
      >

        <div 
          className={`projectCard__button projectCard__button--edit ${isLoggedIn && !isProjectOrderEditable && isEditMode
            ? "show" 
            : ""}`}
          onClick={(e) => handleEditClick(e)}
        >
          <MdModeEdit className="projectCard__button-icon"/>

        </div>
        <div 
          className={`projectCard__button projectCard__button--delete ${isLoggedIn && !isProjectOrderEditable && isEditMode
            ? "show" 
            : ""}`}
          onClick={(e) => handleDeleteClick(e)}
        >
          <MdDelete className="projectCard__button-icon"/>

        </div>


				<div className="projectCard__inner">
          <img 
            className="projectCard__img"
            src={imgSrc}
            alt={`Card Image for ${projectTitle} Project`}
            onLoad={idx === maxIdx
              ? () => handleSetShowPortfolioPlaceholders()
              : null
            }
          />
				</div>
			</div>
    </>
  )};

export default ProjectCard;