import { useState, useRef, useEffect } from "react";
import "./BlogPost.scss";

const BlogPost = ({ description, title, videoID }) => {
  const embedUrl = `https://www.youtube.com/embed/${videoID}`;
  
  const [ showFullInfo, setShowFullInfo ] = useState(false);
  const [ hasLongTitle, setHasLongTitle ] = useState(false);
  const [ hasLongDesc, setHasLongDesc ] = useState(false);
  const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);

  const titleRef = useRef(null); 
  const descRef = useRef(null); 

  const desc = showFullInfo 
    ? description 
    : description.split("\n")[0];

  const handleToggleShowFullInfo = () => {
    setShowFullInfo(prev => !prev)
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
      setHasLongDesc(height > lineHeight); 
    }
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    checkHasLongTitle();
    checkHasLongDesc();
  };

  // set initial value of hasLongDescription after first render
  useEffect(() => {
    setHasLongDesc(description.split("\n").length > 1);
  }, [])

  //add event listener for resize of window and call handleResize for initial calculation
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="blogPost">
      <div className="blogPost__inner">
        <div className="blogPost__video">
          <iframe
            className="blogPost__iframe"
            src={embedUrl}
            title={title}
            allow="clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
          ></iframe>

          <div className="blogPost__video-text">
            <h3 
              className={`blogPost__video-text--title ${hasLongTitle && !showFullInfo 
                ? "ellipse" 
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

            {(hasLongDesc || hasLongTitle) && (
              <button className="blogPost__show-full-info" onClick={handleToggleShowFullInfo}>
                {showFullInfo ? "Show Less" : "Show Full Info"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )};

export default BlogPost;
