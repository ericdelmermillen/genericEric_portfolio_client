import "./ProjectPlaceholder.scss"

const ProjectPlaceholder = () => {
  return (
    <>
      <div className="projectPlaceholder">
        <div className="projectPlaceholder__inner">

          <div className="projectPlaceholder__date"></div>
          <div className="projectPlaceholder__image"></div>
          <div className="projectPlaceholder__title"></div>
          
          <div className="projectPlaceholder__desc">
            <div className="projectPlaceholder__desc-line"></div>
            <div className="projectPlaceholder__desc-line"></div>
            <div className="projectPlaceholder__desc-line"></div>
          </div>
          
          <div className="projectPlaceholder__links">
            <div className="projectPlaceholder__links-lead"></div>
            <div className="projectPlaceholder__urls">
              <div className="projectPlaceholder__url"></div>
              <div className="projectPlaceholder__url"></div>
              <div className="projectPlaceholder__url"></div>
              <div className="projectPlaceholder__url"></div>
            </div>
          </div>

          <div className="projectPlaceholder__info"></div>
        </div>
      </div>
      
    </>
  )};

export default ProjectPlaceholder;