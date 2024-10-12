import { useState, useRef, useEffect } from "react";
import "./BlogPost.scss";

const BlogPost = ({ description, title, videoID }) => {
  const embedUrl = `https://www.youtube.com/embed/${videoID}`;
  
  const [ showFullInfo, setShowFullInfo ] = useState(false);
  const [ titleLineCount, setTitleLineCount ] = useState(1); 
  const [ hasLongTitle, setHasLongTitle ] = useState(false);
  const titleRef = useRef(null); 
  const descriptionRef = useRef(null); 

  const hasLongDesc = description.split("\n").length > 1;

  const desc = showFullInfo 
    ? description 
    : description.split("\n")[0];

  const handleToggleShowFullInfo = () => {
    setShowFullInfo((prev) => !prev);
  };

  const calculateTitleLines = () => {
    if(titleRef.current) {
      const lineHeight = parseFloat(getComputedStyle(titleRef.current).lineHeight);
      const height = titleRef.current.getBoundingClientRect().height;
      const titleLines = Math.round(height / lineHeight) 
      setTitleLineCount(titleLines);
      setHasLongTitle(titleLines > 1)
    }
  };

  useEffect(() => {
    calculateTitleLines(); 

    window.addEventListener("resize", calculateTitleLines);
    return () => {
      window.removeEventListener("resize", calculateTitleLines);
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
                : ""
              }`} ref={titleRef}
            >
              <span className="blogPost__video-text--label">Title:</span> {title}
            </h3>

      
            {desc.length && !hasLongDesc
              ?
                (
                  <p className="blogPost__description ellipsis" ref={descriptionRef}>
                    <span className="blogPost__description--label">Description:</span> {desc}
                  </p>
                ) 
              : null
            }

            {desc.length && hasLongDesc && !showFullInfo
              ?
                (
                  <p className="blogPost__description ellipsis" ref={descriptionRef}>
                    <span className="blogPost__description--label">Description:</span> {desc}
                  </p>
                ) 
              : null
            }

            {desc.length && hasLongDesc && showFullInfo 

              ? 
                (description.split("\n").map((paragraph, idx) => 
                    <p className="blogPost__description" key={idx} ref={descriptionRef}>
                      {idx === 0 
                        ? <span className="blogPost__description--label">Description:</span>
                        : null
                      }
                      {paragraph}
                  </p>
                    
                  )
                )

              : null
            }

            {hasLongDesc || hasLongTitle
              ? 
                (
                  <button
                    className="blogPost__show-full-info"
                    onClick={handleToggleShowFullInfo}
                  >
                    {showFullInfo ? "Show Less" : "Show Full Info"}
                  </button>
                )
                : null
              }

            {/* Display the number of lines for the title */}
            {/* <p>Title spans {titleLineCount} {titleLineCount === 1 ? "line" : "lines"}</p> */}
          </div>
        </div>
      </div>
    </div>
  )};

export default BlogPost;
