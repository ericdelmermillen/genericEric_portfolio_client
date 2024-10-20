import { useEffect, useState } from "react";
// import { useAppContext } from "../../contexts/AppContext";
import "./LightBox.scss";

const LightBoxImage = ({ 
  img, 
  idx, 
  currentIdx,
  maxIdx,
  isMovingForward
 }) => {

  const isCurrentImage = idx === currentIdx;

  useEffect(() => {
    const lightBoxImage = document.getElementById(`${img.id}`);

    if(isMovingForward) {
      // console.log("forward")
      
      if(isCurrentImage) {
        lightBoxImage.classList.add("current");
      } else if(idx < currentIdx) {
        lightBoxImage.classList.remove("current");
        lightBoxImage.classList.add("right");
      } else  {
        console.log("else")
        lightBoxImage.classList.remove("right");
      }

    } 

    if(!isMovingForward) {
      console.log("moving backward")
    }
  }, [idx, currentIdx])
  
  return (
    <>
      <div 
        id={img.id}
        className={`lightBoxImage`}
      >
        <img 
          src={img.imgSrc}
          alt={img.projectTitle} 
          className="lightBoxImage__img" 
        />
      </div>
    </>
  )};








const LightBox = ({ 
  showLightBox, 
  handleSetShowLightBoxFalse, 
  images, 
  currentIdx,
  handleIncrementCurrentIdx,
  handleDecrementCurrentIdx
}) => {
  // const { scrollYPos, prevScrollYPos } = useAppContext();
  const [ fadeOpacity, setFadeOpacity ] = useState(false);
  const [ isMovingForward, setIsMovingForward ] = useState(true);

  const maxIdx = images.length;
 
  const handleOverlayClick = () => {
    handleSetShowLightBoxFalse();
    setFadeOpacity(true);
  };

  const handlePrevClick = () => {
    console.log("prev");
    if(isMovingForward) {
      setIsMovingForward(false)
    };
    handleDecrementCurrentIdx();
  };

  const handleNextClick = () => {
    if(!isMovingForward) {
      setIsMovingForward(true)
    };
    handleIncrementCurrentIdx();
  };


  // useEffect to add or remove show class once lightbox has been conditionally rendered in client
  useEffect(() => {
    const lightBox = document.getElementById("lightBox");

    if(showLightBox && !fadeOpacity) {
      // setTimeout reequired to allow parent to render the component before adding the class to it since the transitions are triggered by the class being added or removed
      setTimeout(() => {
        lightBox.classList.add("show");
      }, 0);
    } 
    
    if(fadeOpacity) {
      lightBox.classList.remove("show");
    }

  }, [showLightBox, fadeOpacity]);


  return (
    <>
      <div 
        id="lightBox" 
        className="lightBox"
      >
        <div className={"lightBox__inner"}>

          <div 
            className="lightBox__overlay"
            onClick={handleOverlayClick}
          ></div>

            <div className="lightBox__images">

              <LightBoxImage 
                img={images[0]}
                idx={0}
                currentIdx={currentIdx}
                isMovingForward={isMovingForward}
                maxIdx={maxIdx}
                />
              <LightBoxImage 
                img={images[1]}
                idx={1}
                currentIdx={currentIdx}
                isMovingForward={isMovingForward}
                maxIdx={maxIdx}
                />
              <LightBoxImage 
                img={images[2]}
                idx={2}
                currentIdx={currentIdx}
                isMovingForward={isMovingForward}
                maxIdx={maxIdx}
                />
              <LightBoxImage 
                img={images[3]}
                idx={3}
                currentIdx={currentIdx}
                isMovingForward={isMovingForward}
                maxIdx={maxIdx}
                />
              <LightBoxImage 
                img={images[4]}
                idx={4}
                currentIdx={currentIdx}
                isMovingForward={isMovingForward}
                maxIdx={maxIdx}
                />
              <LightBoxImage 
                img={images[5]}
                idx={5}
                currentIdx={currentIdx}
                isMovingForward={isMovingForward}
                maxIdx={maxIdx}
              />

              <button
                className="lightBox__button lightBox__button--prev"
                onClick={handlePrevClick}
              >PREV</button>

              <button
                className="lightBox__button lightBox__button--next"
                onClick={handleNextClick}
              >NEXT</button>

              <div className="lightBox__count"> 

                {images.map((img, idx) => (
                  <div key={img.id} className="lightBox__count-circle"></div>
                ))}

              </div>

            </div>

        </div>
      </div>
    </>
  )};

export default LightBox;