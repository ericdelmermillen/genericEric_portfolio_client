import { useEffect } from "react";
import { scrollToTop } from "../../../utils/utils";
import BlogFeed from "../../components/BlogFeed/BlogFeed.jsx";
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
          <div className="blog__content">

            <TypingText 
              classNames={"blog__heading"}
              textToType = 'Blog Page'
            /> 
            <BlogFeed />
            <BlogFeed />
            <BlogFeed />
            <BlogFeed />
            <BlogFeed />
            <BlogFeed />
            <BlogFeed />
            <BlogFeed />
            <BlogFeed />

          </div>
        </div>
      </div>
    </>
  )};

export default Blog;
