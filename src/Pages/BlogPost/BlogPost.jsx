import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { scrollToTop } from "../../../utils/utils";
import "./BlogPost.scss";

const BlogPost = ({ children }) => {
  const { postID } = useParams();

  const navigate = useNavigate();

  // scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, []);
  
  return (
    <>
    <div className="blogPost">
      <div className="blogPost__inner">
        {children}

        <h1
          className="blogPost__heading"
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

export default BlogPost;