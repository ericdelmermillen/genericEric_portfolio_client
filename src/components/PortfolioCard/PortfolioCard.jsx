import { useAppContext } from "../../contexts/AppContext";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { checkIfIsFirefox } from "../../../utils/utils";
import PortfolioCardPlaceholder from "../PortfolioCardPlaceholder/PortfolioCardPlaceholder";
import "./PortfolioCard.scss";

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
  handleCardClick,
  handleDeleteProjectClick,
  handleEditProjectClick,
  handleDragStart,
  handleDropTarget
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
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleEditProjectClick(projectID);
    console.log(`projectID: ${projectID}`);
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
          ? () => handleCardClick(idx)
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

export default PortfolioCard;