import { MdModeEdit, MdDelete } from "react-icons/md";
import { checkIfIsFirefox } from "../../../utils/utils";
import PortfolioCardPlaceholder from "../PortfolioCardPlaceholder/PortfolioCardPlaceholder";
import "./PortfolioCard.scss";

const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;
const VITE_DISPLAY_NONE_TIMEOUT = import.meta.env.VITE_VITE_DISPLAY_NONE_TIMEOUT;
const AWS_SS3_BUCKET_URL = import.meta.env.VITE_AWS_S3_BUCKET_URL;

const isFirefox = checkIfIsFirefox();

const PortfolioCard = ({ 
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
  displayOrder,
  isProjectOrderEditable,
  isLoggedIn,
  isEditMode,
  handlePortfolioCardClick,
  handleDeleteProjectClick,
  handleEditProjectClick,
  handleDragStart,
  handleDropTarget
}) => {

  const handleOnLoad = () => {
    setTimeout(() => {
      setShowPlaceholders(false);
    }, MIN_LOADING_INTERVAL);

    setTimeout(() => {
      setDisplayNonePlaceholders(true);
    }, VITE_DISPLAY_NONE_TIMEOUT);
  };  
  
  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleDeleteProjectClick(projectID);
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleEditProjectClick(projectID);
  };

  if(isInitialPlaceholder) {
    return (
      <PortfolioCardPlaceholder />
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div 
        className={`portfolioCard ${isProjectOrderEditable ? "draggable" : ""}`}
        draggable={isProjectOrderEditable}
        onDragStart={isProjectOrderEditable && !isFirefox
          ? () => handleDragStart(projectID)
          : null}
        onMouseDown={isProjectOrderEditable && isFirefox
          ? () => handleDragStart(projectID)
          : null}
        onDragOver={isProjectOrderEditable
          ? handleDragOver
          : null}
        onDrop={isProjectOrderEditable
          ? () => handleDropTarget(projectID, displayOrder)
          : null}
        onClick={!isProjectOrderEditable
          ? () => handlePortfolioCardClick(idx)
          : null}
      >

        <div className={`portfolioCard__placeholder ${!showPlaceholders && displayNonePlaceholders
          ? "hide" 
          : !showPlaceholders
          ? "fade"
          : ""}`}
        >
          <PortfolioCardPlaceholder />
        </div>

        <button 
          className={`portfolioCard__button portfolioCard__button--delete ${isLoggedIn && isEditMode && !isProjectOrderEditable
            ? "show" 
            : ""}`}
            onClick={isLoggedIn && isEditMode &!isProjectOrderEditable
              ? (e) => handleDeleteClick(e)
              : null
            }
        >
          <MdDelete className="portfolioCard__button-icon"/>
        </button>

        <button 
          className={`portfolioCard__button portfolioCard__button--edit ${isLoggedIn && isEditMode && !isProjectOrderEditable
            ? "show" 
            : ""}`}
          onClick={isLoggedIn && isEditMode &!isProjectOrderEditable
              ? (e) => handleEditClick(e)
              : null
            }
        >
          <MdModeEdit className="portfolioCard__button-icon"/>
        </button>

				<div className="portfolioCard__inner">
          <img 
            className="portfolioCard__img"
            src={`${AWS_SS3_BUCKET_URL}/${imgSrc}`} 
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

export default PortfolioCard;