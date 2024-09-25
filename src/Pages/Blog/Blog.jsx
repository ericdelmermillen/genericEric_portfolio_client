import { useEffect } from "react";
import { scrollToTop } from "../../../utils/utils";
import TypingText from "../../components/TypingText/TypingText.jsx";
import "./Blog.scss";

const Blog = ({ children }) => {


  // scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <div className="blog">
        <div className="blog__inner">
          {children}
          <TypingText 
          classNames={"blog__heading"}
          textToType = 'Blog Page'
        />
        </div>
      </div>
    </>
  )};

export default Blog;
