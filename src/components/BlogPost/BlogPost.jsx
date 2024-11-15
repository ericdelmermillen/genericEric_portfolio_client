import { useState, useRef, useEffect } from "react";
import BlogPostPlaceholder from "../BlogPostPlaceholder/blogPostPlaceholder";
import { useAppContext } from "../../contexts/AppContext";
import "./BlogPost.scss";

// ***crazy issue with resizing on calling for next page on narrow screen: current fix is maxWidth on &__video at 75vw

const BlogPost = ({ 
  idx, 
  isInitialPlaceholder,
  title, 
  description, 
  videoID, 
  isOnHome, 
  isLoading })=> {
  
  const embedUrl = `https://www.youtube.com/embed/${videoID}?rel=0`;

  // can use windowWidth to determine values to use for font-size and line-height and pass them in as inline styles to deal with issues getting ref div line height for determining if the elipse class should be used
  // const windowWidth = window.innerWidth;
  // console.log(windowWidth)
  
  
  const { LIGHTBOX_TIMING_INTERVAL } = useAppContext();
  
  const [ showFullInfo, setShowFullInfo ] = useState(false);
  const [ hasLongTitle, setHasLongTitle ] = useState(false);
  const [ hasLongDesc, setHasLongDesc ] = useState(false);
  const [ showPlaceholder, setShowPlaceholder ] = useState(true);
  const [ displayNonePlaceholder, setDisplayNonePlaceholder ] = useState(false);
  const [ postIsReady, setPostIsReady ] = useState(false);

  const titleRef = useRef(null); 
  const descRef = useRef(null); 

  const desc = showFullInfo 
    ? description 
    : description.split("\n")[0];

  const handleToggleShowFullInfo = () => {
    setShowFullInfo(prev => !prev);
  };

  const handleOnLoad = () => {
    setTimeout(() => {
      setShowPlaceholder(false);
    }, LIGHTBOX_TIMING_INTERVAL);

    setTimeout(() => {
      setDisplayNonePlaceholder(true);
      setPostIsReady(true);
    }, 500);
  };  

  const checkHasLongTitle = () => {
    if(titleRef.current) {
      const lineHeight = parseFloat(getComputedStyle(titleRef.current).lineHeight);
      const height = titleRef.current.getBoundingClientRect().height;
      setHasLongTitle(height > lineHeight); 
    }
  };

  const checkHasLongDesc = () => {
    if(descRef.current) {
      const lineHeight = parseFloat(getComputedStyle(descRef.current).lineHeight);
      const height = descRef.current.getBoundingClientRect().height;
      setHasLongDesc(description.split("\n").length > 1 || height > (lineHeight * 3)); 
    }
  };

  const handleResize = () => {
    checkHasLongTitle();
    checkHasLongDesc();
  };

  //add event listener for resize of window and call handleResize for initial calculation
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  if(isInitialPlaceholder) {
    return (
      <BlogPostPlaceholder />
    );
  };
  
  return (
    <div className={`blogPost ${postIsReady ? "isReady" : "" }`}>

      <div className={`blogPost__placeholder ${displayNonePlaceholder
        ? "hide"
        : !showPlaceholder
        ? "fade"
        : ""
      }`}>
        <BlogPostPlaceholder />
      </div>

      <div className={`blogPost__inner ${showPlaceholder ? "" : "show"}`}>
        <div className="blogPost__video">
          <iframe
            className="blogPost__iframe"
            src={embedUrl}
            title={title}
            allow="clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-presentation"
            onLoad={handleOnLoad}
          ></iframe>

          <div className="blogPost__video-text">
            <h3 
              className={`blogPost__video-text--title ${hasLongTitle && !showFullInfo 
                ? "ellipsis" 
                : ""}`
              } 
              ref={titleRef}
            >
              <span className="blogPost__video-text--label">Title:</span> {title}
            </h3>

            {desc.length && description.split("\n").length === 1
              ? 
                <>
                  <p className={`blogPost__description ${hasLongDesc && !showFullInfo 
                    ? "ellipsis" 
                    : ""}`}
                    ref={descRef}
                  >
                    <span className="blogPost__description--label">Description:</span> {desc}
                  </p>
                </>
             
              : desc.length && description.split("\n").length > 1 && showFullInfo
              ?
                <>
                  {description.split("\n").map((paragraph, idx) => 
                    <p className="blogPost__description" key={idx}>
                      {idx === 0
                        ? <span className="blogPost__description--label">Description:</span> 
                        : null
                      } {paragraph}
                    </p>
                    )
                  }
                </>
              : desc.length && description.split("\n").length > 1 && !showFullInfo
              ?
                <>
                  <p className={`blogPost__description ${hasLongDesc && !showFullInfo 
                    ? "ellipsis" 
                    : ""}`}
                    ref={descRef}
                  >
                    <span className="blogPost__description--label">Description:</span> {desc}
                  </p>
                </>
              : null
            }

            {((hasLongDesc && !isOnHome && !isLoading) || (hasLongTitle && !isOnHome &&!isLoading)) 
              ?
                <button 
                  className="blogPost__show-full-info"  
                  onClick={handleToggleShowFullInfo}>
                    {showFullInfo ? "Show Less" : "Show Full Info"}
                  </button>
              : null
            }
          </div>
        </div>
      </div>
    </div>
  )};

export default BlogPost;