import { useState, useRef, useEffect, useCallback } from "react";
import BlogPostPlaceholder from "../BlogPostPlaceholder/blogPostPlaceholder";
import "./BlogPost.scss";

const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;

const BlogPost = ({ 
  isInitialPlaceholder,
  title, 
  description, 
  videoID, 
  isOnHome, 
  handleIncrementBlogPostLoadedCount })=> {
  
  const embedUrl = `https://www.youtube.com/embed/${videoID}?rel=0`;
  
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
    handleIncrementBlogPostLoadedCount();
    setTimeout(() => {
      setShowPlaceholder(false);
    }, MIN_LOADING_INTERVAL);

    setTimeout(() => {
      setDisplayNonePlaceholder(true);
      setPostIsReady(true);
    }, MIN_LOADING_INTERVAL * 2);
  };  

  const checkHasLongTitle = useCallback(() => {
    if(titleRef.current) {
      const lineHeight = parseFloat(getComputedStyle(titleRef.current).lineHeight);
      const height = titleRef.current.getBoundingClientRect().height;
      setHasLongTitle(height > lineHeight); 
    };
  });

  const checkHasLongDesc = useCallback(() => {
    if(descRef.current) {
      const lineHeight = parseFloat(getComputedStyle(descRef.current).lineHeight);
      const height = descRef.current.getBoundingClientRect().height;
      setHasLongDesc(description.split("\n").length > 1 || height > (lineHeight * 3)); 
    };
  });

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
            allowFullScreen={true}
            onLoad={handleOnLoad}
            aria-label={`YouTube video player for ${title}`}
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

            {((hasLongDesc && !isOnHome) || (hasLongTitle && !isOnHome)) 
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