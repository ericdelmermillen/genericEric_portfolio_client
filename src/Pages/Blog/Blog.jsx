import BlogFeed from "../../components/BlogFeed/BlogFeed.jsx";
import TypingText from "../../components/TypingText/TypingText.jsx";
import "./Blog.scss";

const Blog = ({ children }) => {

  return (
    <>
      <div className="blog">
        <div className="blog__inner">
          {children}
          <div className="blog__content">

            <TypingText 
              classNames={"blog__heading"}
              textToType = 'Welcome To My Blog'
              typingDelayInterval="150"
            /> 
            <BlogFeed />

          </div>
        </div>
      </div>
    </>
  )};

export default Blog;