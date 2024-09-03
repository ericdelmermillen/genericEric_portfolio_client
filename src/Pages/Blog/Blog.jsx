import { useEffect } from "react";
import { scrollToTop } from "../../../utils/utils";
import "./Blog.scss";

const Blog = () => {

  // scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <div className="blog">
        <h1 className="blog--heading">
          From Blog
        </h1>
      </div>
    </>
  )};

export default Blog;