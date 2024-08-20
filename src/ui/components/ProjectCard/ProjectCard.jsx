import "./ProjectCard.scss";

const ProjectCard = ({ imgSrc, projectTitle }) => {
  // don't need <a></a>: can use onClick to set the active project for the LightBox

  return (
    <>
      <div className="projectCard">
				<div className="projectCard__inner">
					<a href="images/project1.jpg">
						<img 
							className="projectCard__img"
              src={imgSrc}
            	alt={`Card Image for ${projectTitle} Project`}
						/>
					</a>
				</div>
			</div>
    </>
  )};

export default ProjectCard;