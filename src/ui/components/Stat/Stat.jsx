import "./Stat.scss";

const Stat = ({ faClasses, howMany, thingName }) => {
  
  return (
    <>
      <div className="">
        <div className="">
          <i className={`${faClasses}`}></i>
          <p className="">{howMany}</p>
          <h3 className="">{thingName}</h3>
        </div>
      </div>

    </>
  )};

export default Stat;