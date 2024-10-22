import "./ProjectCard.scss";

const ProjectCard = ({ 
  imgSrc, 
  projectTitle, 
  handleProjectCardClick, 
  idx
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
          />
				</div>
			</div>
    </>
  )};

export default ProjectCard;