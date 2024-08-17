import "./Service.scss";

const Service = ({ faClasses, serviceName, serviceDesc }) => {
  return (
    <>
      <div 
        className=""
      >
        <i className={`${faClasses} fa-3x`}></i>
        <h3 className="fs-3">
          {serviceName}
        </h3>
        <hr className="" />
        <p className="fs-5">
          {serviceDesc}
        </p>
      </div>
    </>
  )};

export default Service;