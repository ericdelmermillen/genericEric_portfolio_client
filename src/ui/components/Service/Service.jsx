import "./Service.scss";

const Service = ({ faClasses, serviceName, serviceDesc }) => {
  return (
    <>
      <div className="service">
        <div className="service__icon">
          <i className={`${faClasses} fa-3x`}></i>
        </div>
        <h3 className="service__name">
          {serviceName}
        </h3>
        <p className="service__description">
          {serviceDesc}
        </p>
      </div>
    </>
  )};

export default Service;