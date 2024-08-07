

const ProgressBar = ({ barLabel, classNames, currentValue }) => {
  return (
    <>
      <h5>
        <i className="fas fa-check me-2"></i>{barLabel}
      </h5>
        <div
        className={classNames}
        role="progressbar"
        aria-valuenow={currentValue}
        aria-valuemin="0"
        aria-valuemax="100"
        >
        <div
        className="profile__skill--progress-fill progress-bar"
        style={{width: currentValue}}
        >
        {currentValue}
        </div>
      </div>
      
    </>
  )};

export default ProgressBar;