import "./Stat.scss";

const Stat = ({ faClasses, howMany, thingName }) => {
  
  return (
    <>
      <div className="col-md-4 col-lg-2">
        <div className="stat text-center border-end border-dark">
          <i className={`${faClasses} fa-3x mb-3`}></i>
          <p className="fs-1">{howMany}</p>
          <h3 className="fs-6 text-uppercase">{thingName}</h3>
        </div>
      </div>

    </>
  )};

export default Stat;