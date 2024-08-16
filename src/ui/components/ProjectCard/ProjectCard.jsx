import "./ProjectCard.scss";

const ProjectCard = ({ imgSrc, projectTitle }) => {
  // don't need <a></a>: can use onClick to set the active project for the LightBox

  return (
    <>
      <div className="projectCard col-md-6 mb-4">
				<div className="projectCard__inner project shadow-lg rounded-5">
					<a href="images/project1.jpg">
						<img 
							className="projectCard__img img-fluid rounded-3"
              src={imgSrc}
            	alt={`Card Image for ${projectTitle} Project`}
						/>
					</a>
				</div>
			</div>
    </>
  )};

export default ProjectCard;