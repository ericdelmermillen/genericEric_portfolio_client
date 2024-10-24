import "./ProjectCard.scss";

const ProjectCard = ({ 
  idx,
  maxIdx,
  imgSrc, 
  projectTitle, 
  handleProjectCardClick,
  handleSetShowPortfolioPlaceholders
}) => {

  return (
    <>
      <div 
        className="projectCard"
        onClick={() => handleProjectCardClick(idx)}
      >
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