import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { scrollToTop } from "../../../utils/utils";
import BackButton from "../../components/BackButton/BackButton";
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
      <BackButton />
      <div className="blogPostDetails__inner">
        {children}

        <h1
          className="blogPostDetails__heading"
        >
          Blog Post: {postID}
        </h1>

      </div>
    </div>
    </>
  )};

export default BlogPostDetails;