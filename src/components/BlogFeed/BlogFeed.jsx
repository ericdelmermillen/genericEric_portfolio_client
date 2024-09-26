import { Link } from 'react-router-dom';
import BlogPostSummary from '../BlogPostSummary/BlogPostSummary';
import "./BlogFeed.scss";

const BlogFeed = () => {
  // call for blog posts here from youtube
  // limit === 1 if on / or /home or /home/
  // pagination for blog posts: overscroll or "More" button?
  return (
    <>
      <div className="blogFeed">
        <div className="blogFeed__inner">

          <div className="blogFeed__header">
            <h4 className="blogFeed__heading">
              MY BLOG
            </h4>
            <h2 className="blogFeed__sub-heading">
              Check out my most recent post
            </h2>
          </div>
          {/* 
            map through returned blog posts
            each BlogPostSummary gets truncated info and thumbnail:
            may make video playable
           */}
          <BlogPostSummary />   
          
          <div className="blogFeed__cta">

            {/* 
              may make button conditional on being on /, /home, /home/
             */}

            <Link to="/blog" className="blogFeed__button">
              See More Posts
            </Link>
          </div>

        </div>
      </div>
    </>
  )};

export default BlogFeed;