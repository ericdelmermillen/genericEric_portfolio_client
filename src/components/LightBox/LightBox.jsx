import { useEffect, useState } from "react";
// import { useAppContext } from "../../contexts/AppContext";
import "./LightBox.scss";

const TIMEOUT_DELAY = 750;

const LightBoxImage = ({ 
  img, 
  idx, 
  currentIdx,
  maxIdx,
  isInitialView,
  isMovingForward
 }) => {

  const isCurrentImage = idx === currentIdx;
  const beforeCurrentIdx = idx < currentIdx;
  const isFirstImage = idx === 0;
  const isLastImage = idx === maxIdx;

  // useEffect to set intial classes only
  useEffect(() => {
    const lightBoxImage = document.getElementById(`${img.id}`);

    if(isCurrentImage && isInitialView) {
      lightBoxImage.classList.add("current");
    } else if(!isCurrentImage && isInitialView) {
      lightBoxImage.classList.add("left");
    };
  }, []);



  // useEffect to reset classes when direction changes
  useEffect(() => {
    if(!isInitialView) {
      console.log("toggling")
      const lightBoxImage = document.getElementById(`${img.id}`);
      
      if(isMovingForward && !isCurrentImage) {
        lightBoxImage.classList = "lightBoxImage left";
      // } else if(!isMovingForward && !isCurrentImage) {
      } else if(!isMovingForward && !isCurrentImage) {
        lightBoxImage.classList = "lightBoxImage right";
      }
      else {
        console.log("other condition")
      }
    }
  }, [isMovingForward]);



  // useEffect to handle transitions when moving forward and backward and not when isInitialView
  useEffect(() => {
    
    const lightBoxImage = document.getElementById(`${img.id}`);

    if(!isInitialView && isMovingForward) {
      
        lightBoxImage.classList.add("transition");

        if(isCurrentImage) { 
          lightBoxImage.classList.remove("left");
          lightBoxImage.classList.add("current");
        } 
        
        else if(beforeCurrentIdx) { 
          lightBoxImage.classList.remove("current");
          lightBoxImage.classList.add("right");
          setTimeout(() => {
            lightBoxImage.classList.remove("right");
            lightBoxImage.classList.add("left");
          }, TIMEOUT_DELAY);

        } else if(isLastImage && currentIdx === 0) { 
          lightBoxImage.classList.add("right");
          lightBoxImage.classList.remove("current");
          setTimeout(() => {
            lightBoxImage.classList.remove("right");
            lightBoxImage.classList.add("left");
          }, TIMEOUT_DELAY);

        }

      } else if(!isInitialView && !isMovingForward) {
        lightBoxImage.classList.add("transition");
        // console.log("adding transition")

        if(isCurrentImage) { 
          lightBoxImage.classList.remove("right");
          lightBoxImage.classList.add("current");
        } 
        
        else if(idx > currentIdx) { 
          lightBoxImage.classList.remove("current");
          lightBoxImage.classList.add("left");
          setTimeout(() => {
            lightBoxImage.classList.remove("left");
            lightBoxImage.classList.add("right");
          }, TIMEOUT_DELAY);

        } 

      else if(isFirstImage && currentIdx === maxIdx) { 
        lightBoxImage.classList.add("left");
        lightBoxImage.classList.remove("current");
        setTimeout(() => {
          lightBoxImage.classList.remove("left");
          lightBoxImage.classList.add("right");
        }, TIMEOUT_DELAY);

      }
        
    }

  }, [isInitialView, idx, currentIdx]);
  
  return (
    <>
      <div id={img.id} className={`lightBoxImage`}>
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
  const [ isInitialView, setIsInitialView ] = useState(true);

  const maxIdx = images.length - 1;
 
  const handleOverlayClick = () => {
    handleSetShowLightBoxFalse();
    setFadeOpacity(true);
  };


  const handlePrevClick = () => {
    if(isInitialView) {
      setIsInitialView(false)
    }
    
    if(isMovingForward) {
      setIsMovingForward(false)
      setTimeout(() => {
        handleDecrementCurrentIdx();
      }, 0)
    } else {
      handleDecrementCurrentIdx();
    }
  };




  const handleNextClick = () => {
    if(isInitialView) {
      setIsInitialView(false)
    }
    
    if(!isMovingForward) {
      setIsMovingForward(true)
      setTimeout(() => {
        handleIncrementCurrentIdx();
      }, 0)
    }
     else {
      handleIncrementCurrentIdx();
    }
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
              isInitialView={isInitialView}
              />
            <LightBoxImage 
              img={images[1]}
              idx={1}
              currentIdx={currentIdx}
              isMovingForward={isMovingForward}
              maxIdx={maxIdx}
              isInitialView={isInitialView}
              />
            <LightBoxImage 
              img={images[2]}
              idx={2}
              currentIdx={currentIdx}
              isMovingForward={isMovingForward}
              maxIdx={maxIdx}
              isInitialView={isInitialView}
              />
            <LightBoxImage 
              img={images[3]}
              idx={3}
              currentIdx={currentIdx}
              isMovingForward={isMovingForward}
              maxIdx={maxIdx}
              isInitialView={isInitialView}
              />
            <LightBoxImage 
              img={images[4]}
              idx={4}
              currentIdx={currentIdx}
              isMovingForward={isMovingForward}
              maxIdx={maxIdx}
              isInitialView={isInitialView}
              />
            <LightBoxImage 
              img={images[5]}
              idx={5}
              currentIdx={currentIdx}
              isMovingForward={isMovingForward}
              maxIdx={maxIdx}
              isInitialView={isInitialView}
            />

            <button
              className="lightBox__button lightBox__button--prev"
              onClick={handlePrevClick}
            >
              PREV
            </button>

            <button
              className="lightBox__button lightBox__button--next"
              onClick={handleNextClick}
            >
              NEXT
            </button>

            <div className="lightBox__count"> 

              {images.map((img, idx) => (
                <div 
                  key={img.id} 
                  className={`lightBox__count-circle ${idx === currentIdx ? "current" : ""}`}>
                </div>
              ))}

            </div>

          </div>

          {/* reverse direction button for testing */}
          {/* <button 
            className="reverseButton"
            onClick={() => {
              setIsMovingForward(c => !c)
              setIsInitialView(false)
            }}
          >
            Reverse Direction
          </button> */}
        </div>
      </div>
    </>
  )};

export default LightBox;