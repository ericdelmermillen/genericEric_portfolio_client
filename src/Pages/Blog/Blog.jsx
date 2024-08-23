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
      <h1 className="blog">
        From Blog
      </h1>
    </>
  )};

export default Blog;