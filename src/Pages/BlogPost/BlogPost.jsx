import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { scrollToTop } from "../../../utils/utils";
import "./BlogPost.scss";

const BlogPost = () => {
  const { postID } = useParams();

  const navigate = useNavigate();

  // scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, []);
  
  return (
    <>
    <div className="blogPost">
      <h1>
        Blog Post: {postID}
      </h1>
      
      <button
        onClick={() => navigate(-1)}
      >
        Back
      </button>

    </div>
    </>
  )};

export default BlogPost;