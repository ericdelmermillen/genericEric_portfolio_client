import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { scrollToTop } from "../../../utils/utils";
import "./BlogPostDetails.scss";

const BlogPostDetails = ({ children }) => {
  const { postID } = useParams();


  // scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, []);
  
  return (
    <>
    <div className="blogPostDetails">
      <div className="blogPostDetails__inner">
        {children}

        <h1
          className="blogPostDetails__heading"
        >
          Blog Post: {postID}
        </h1>
        
        {/* <button
          onClick={() => navigate(-1)}
        >
          Back
        </button> */}

      </div>
    </div>
    </>
  )};

export default BlogPostDetails;