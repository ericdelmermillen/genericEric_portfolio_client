import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { addClassToDiv, removeClassFromDiv } from "../../../utils/utils";
import "./LightBox.scss";

const TIMEOUT_DELAY = 400;
const MODAL_TRANSITION_INTERVAL = import.meta.env.VITE_MODAL_TRANSITION_INTERVAL;
const AWS_SS3_BUCKET_URL = import.meta.env.VITE_AWS_S3_BUCKET_URL;

const LightBoxImage = ({ 
  idx, 
  currentIdx,
  maxIdx,
  imageID,
  imgSrc,
  imgAlt,
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
          
          return;
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
        };
      } else if(!isMovingForward) {
        lightBoxImage.classList.add("transition");
          
        if(isCurrentImage) { 
          lightBoxImage.classList.remove("right");
          lightBoxImage.classList.add("current");

          return;
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
        };
      };

      setTimeout(() => {
        setIsTransitioning(false);
      }, TIMEOUT_DELAY + 400);
    }

  }, [idx, currentIdx]);
  
  return (
    <>
      <div id={imageID} className={`lightBoxImage`}>
        <img 
          src={`${AWS_SS3_BUCKET_URL}/${imgSrc}`} 
          alt={imgAlt} 
          className="lightBoxImage__img" 
        />
      </div>
    </>
  )};
  

const LightBox = ({ 
  lightBoxImages,
  currentIdx,
  setCurrentIdx,
  setShowLightBox,
  handleIncrementCurrentIdx,
  handleDecrementCurrentIdx,
  handleSetShowPortfolioPlaceholders
}) => {

  const { 
    scrollYPos, 
    prevScrollYPos
  } = useAppContext();

  const [ isMovingForward, setIsMovingForward ] = useState(true);
  const [ isInitialView, setIsInitialView ] = useState(true);
  const [ isTransitioning, setIsTransitioning ] = useState(true);

  const maxIdx = lightBoxImages.length - 1;
 
  const handleOverlayClick = () => {
    removeClassFromDiv("lightBox", "show");
    setTimeout(() => {
      setShowLightBox(false);
    }, MODAL_TRANSITION_INTERVAL);
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
  
      requestAnimationFrame(() => {
        handleDecrementCurrentIdx();
      });
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
  
      requestAnimationFrame(() => {
        handleIncrementCurrentIdx();
      });
    } else {
      handleIncrementCurrentIdx();
    };
  };
  

  // useEffect to add show class to lightbox after initial render to allow for transitions
  useEffect(() => {
    setTimeout(() => {
      addClassToDiv("lightBox", "show");
    }, MODAL_TRANSITION_INTERVAL);
  }, []);


  // useEffect to close overlay on scroll
  useEffect(() => {
    if(!isTransitioning) {

      if(scrollYPos !== prevScrollYPos) {
        removeClassFromDiv("lightBox", "show")
        setTimeout(() => {
          setShowLightBox(false);
          setCurrentIdx(null);
        }, MODAL_TRANSITION_INTERVAL);
      };
    };
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

            {lightBoxImages.map((image, idx) => (
              <LightBoxImage 
                key={image.img_id}
                idx={idx}
                currentIdx={currentIdx}
                maxIdx={maxIdx}
                imageID={image.img_id}
                imgSrc={image.img_src}
                imgAlt={image.img_alt}
                isInitialView={isInitialView}
                isMovingForward={isMovingForward}
                setIsTransitioning={setIsTransitioning}
                handleSetShowPortfolioPlaceholders={handleSetShowPortfolioPlaceholders}
              />
            ))}

            {lightBoxImages.length > 1

              ? 
                (
                  <>                    
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
                  </>
                )
              : null
            }

            {lightBoxImages.length <= 6
            
              ?
                (
                  <div className="lightBox__count"> 

                    {lightBoxImages.map((img, idx) => (
                      <div 
                        key={img.img_id} 
                        className={`lightBox__count-indicatior ${idx === currentIdx ? "current" : ""}`}>
                      </div>
                    ))}

                  </div>
                )
              : 
                (
                  <div className="lightBox__numeric-counter">
                  <h4 className="lightBox__numeric-count">
                    {currentIdx + 1} / {lightBoxImages.length}
                  </h4>
                </div>
                )
            }

          </div>

        </div>
      </div>
    </>
  )};

export default LightBox;