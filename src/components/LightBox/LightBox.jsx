import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import "./LightBox.scss";

const TIMEOUT_DELAY = 400;

const LightBoxImage = ({ 
  idx, 
  currentIdx,
  maxIdx,
  imageID,
  imgSrc,
  projectTitle,
  isInitialView,
  isMovingForward,
  setIsTransitioning
 }) => {

  const isCurrentImage = idx === currentIdx;
  const beforeCurrentIdx = idx < currentIdx;
  const afterCurrentIdx = idx > currentIdx;
  const isFirstImage = idx === 0;
  const isLastImage = idx === maxIdx;


  // useEffect to set intial classes only
  useEffect(() => {
    const lightBoxImage = document.getElementById(`${imageID}`);

    if(isCurrentImage && isInitialView) {
      lightBoxImage.classList.add("current");
    } else if(!isCurrentImage && isInitialView) {
      lightBoxImage.classList.add("left");
    };
    
    setIsTransitioning(false);
  }, []);


  // useEffect to handle transitions when moving forward and backward and not when isInitialView
  useEffect(() => {
    
    if(!isInitialView) {
      const lightBoxImage = document.getElementById(`${imageID}`);

      if(isMovingForward) {
        
        lightBoxImage.classList.add("transition");

        if(isCurrentImage) { 
          lightBoxImage.classList.remove("left");
          lightBoxImage.classList.add("current");
          return
        } else if(beforeCurrentIdx) { 
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
      } else if(!isMovingForward) {
        lightBoxImage.classList.add("transition");
          
        if(isCurrentImage) { 
          lightBoxImage.classList.remove("right");
          lightBoxImage.classList.add("current");
          return
        } else if(afterCurrentIdx) { 
          lightBoxImage.classList.remove("current");
          lightBoxImage.classList.add("left");
          setTimeout(() => {
            lightBoxImage.classList.remove("left");
            lightBoxImage.classList.add("right");
          }, TIMEOUT_DELAY);
        } else if(isFirstImage && currentIdx === maxIdx) { 
          lightBoxImage.classList.add("left");
          lightBoxImage.classList.remove("current");
          setTimeout(() => {
            lightBoxImage.classList.remove("left");
            lightBoxImage.classList.add("right");
          }, TIMEOUT_DELAY);
        }
      }
      setTimeout(() => {
        setIsTransitioning(false);
      }, TIMEOUT_DELAY + 400);
    }

  }, [idx, currentIdx]);
  
  return (
    <>
      <div id={imageID} className={`lightBoxImage`}>
        <img 
          src={imgSrc}
          alt={projectTitle} 
          className="lightBoxImage__img" 
        />
      </div>
    </>
  )};

const LightBox = ({ 
  images, 
  currentIdx,
  setCurrentIdx,
  showLightBox, 
  setShowLightBox,
  handleSetShowLightBoxFalse, 
  handleIncrementCurrentIdx,
  handleDecrementCurrentIdx,
  handleSetShowPortfolioPlaceholders
}) => {

  const { scrollYPos, prevScrollYPos } = useAppContext();

  const [ fadeOpacity, setFadeOpacity ] = useState(false);
  const [ isMovingForward, setIsMovingForward ] = useState(true);
  const [ isInitialView, setIsInitialView ] = useState(true);
  const [ isTransitioning, setIsTransitioning ] = useState(true);

  const maxIdx = images.length - 1;
 
  const handleOverlayClick = () => {
    handleSetShowLightBoxFalse();
    setFadeOpacity(true);
  };


  // for resetting LightBoxImage classes on direction change
  const changeLightBoxDirection = (side) => {
    const lightBoxImages = document.querySelectorAll(".lightBoxImage");
    
    lightBoxImages.forEach((image, idx) => {
      if(idx !== currentIdx) {
        image.classList = `lightBoxImage ${side}`;
      };
    });
  };


  const handlePrevClick = () => {
    setIsTransitioning(true);

    if(isInitialView) {
      setIsInitialView(false);
    };

    if(isMovingForward) {
      changeLightBoxDirection("right");
      setIsMovingForward(false);
      setTimeout(() => {
        handleDecrementCurrentIdx();
      }, 0)
    } else {
      handleDecrementCurrentIdx();
    };
  };


  const handleNextClick = () => {
    setIsTransitioning(true);

    if(isInitialView) {
      setIsInitialView(false);
    };
    
    if(!isMovingForward) {
      changeLightBoxDirection("left");
      setIsMovingForward(true);
      setTimeout(() => {
        handleIncrementCurrentIdx();
      }, 0)
    } else {
       handleIncrementCurrentIdx();
    };
  };


  // useEffect to add or remove show class once lightbox has been conditionally rendered in client
  useEffect(() => {
    const lightBox = document.getElementById("lightBox");

    if(showLightBox && !fadeOpacity) {
      // setTimeout reequired to allow parent to render the component before adding the class to it since the transitions are triggered by the class being added or removed
      setTimeout(() => {
        lightBox.classList.add("show");
      }, 0);
    } ;
    
    if(fadeOpacity) {
      lightBox.classList.remove("show");
    };

  }, [showLightBox, fadeOpacity]);


  // useEffect to close overlay on scroll
  useEffect(() => {
    if(!isTransitioning) {

      if(scrollYPos !== prevScrollYPos) {
        setShowLightBox(false);
        setCurrentIdx(null);
      };
    }
  }, [scrollYPos, prevScrollYPos]);


  return (
    <>
      <div 
        id="lightBox" 
        className="lightBox"
      >
        <div className={"lightBox__inner"}>

          <div className="lightBox__overlay" onClick={handleOverlayClick}></div>

          <div className="lightBox__images">

            {images.map((image, idx) => (
              <LightBoxImage 
                key={image.project_id}
                idx={idx}
                currentIdx={currentIdx}
                maxIdx={maxIdx}
                imageID={image.project_id}
                imgSrc={image.imgSrc}
                projectTitle={image.projectTitle}
                isInitialView={isInitialView}
                isMovingForward={isMovingForward}
                setIsTransitioning={setIsTransitioning}
                handleSetShowPortfolioPlaceholders={handleSetShowPortfolioPlaceholders}
              />
            ))}

            <button
              className="lightBox__button lightBox__button--prev"
              onClick={handlePrevClick}
              disabled={isTransitioning}
            >
              <IoChevronBackOutline className="lightBox__prev-icon"/>
            </button>

            <button
              className="lightBox__button lightBox__button--next"
              onClick={handleNextClick}
              disabled={isTransitioning}
            >
              <IoChevronForwardOutline className="lightBox__next-icon"/>
            </button>

            <div className="lightBox__count"> 

              {images.map((img, idx) => (
                <div 
                  key={img.project_id} 
                  className={`lightBox__count-indicatior ${idx === currentIdx ? "current" : ""}`}>
                </div>
              ))}

            </div>

          </div>

        </div>
      </div>
    </>
  )};

export default LightBox;