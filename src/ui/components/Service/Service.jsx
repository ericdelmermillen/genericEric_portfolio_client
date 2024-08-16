import "./Service.scss";

const Service = ({ faClasses, serviceName, serviceDesc }) => {
  return (
    <>
      <div 
        className="col-md-4 text-center"
      >
        <i className={`${faClasses} fa-3x text-primary mb-3`}></i>
        <h3 className="fs-3">
          {serviceName}
        </h3>
        <hr className="w-25 mx-auto" />
        <p className="fs-5">
          {serviceDesc}
        </p>
      </div>
    </>
  )};

export default Service;