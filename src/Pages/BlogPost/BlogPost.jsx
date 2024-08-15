import { useParams } from "react-router-dom";
import "./BlogPost.scss";

const BlogPost = () => {
  const { postID } = useParams();
  return (
    <>
      <h1>Blog Post: {postID}</h1>
    </>
  )};

export default BlogPost;