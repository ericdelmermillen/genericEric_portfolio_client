import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/AppContext";
import "./LightBox.scss";

const LightBox = ({ setShowLightBox, toggleShowLightBox }) => {
  const { scrollYPos, prevScrollYPos } = useAppContext();


  // useEffect to close LightBox on scrollY change
  useEffect(() => {
    if(scrollYPos !== prevScrollYPos) {
      setShowLightBox(false)
    }
  },[ scrollYPos, prevScrollYPos]);


  return (
    <>
      <div className="lightBox">
        <div className="lightBox__inner">
          erbh srhtf
          <div 
            className="lightBox__overlay"
            onClick={toggleShowLightBox}
          ></div>

        </div>
      </div>
    </>
  )};

export default LightBox;