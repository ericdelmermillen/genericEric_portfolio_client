import { Link, useLocation } from 'react-router-dom';
import BlogPost from '../BlogPost/BlogPost.jsx';
import { useEffect, useState } from 'react';
import "./BlogFeed.scss";

// const MAX_RESULTS = 5;
const MAX_RESULTS = 1;

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_BASE_URL = import.meta.env.VITE_YOUTUBE_BASE_URL;


const BlogFeed = () => {
  const [nextPageToken, setNextPageToken] = useState("");
  const [blogPosts, setBlogPosts] = useState([]); // State to hold blog posts
  const location = useLocation();

  const isOnBlogPage = location.pathname === "/blog" || location.pathname === "/blog/";

  const handleFetchBlogPosts = async () => {
    try {
      const response = await fetch(`${YOUTUBE_BASE_URL}/playlistItems?part=snippet&playlistId=UU6aTLuI_j4-0wiDSzmaPctQ&maxResults=${MAX_RESULTS}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}&key=${YOUTUBE_API_KEY}`, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if (data.error) {
        console.error('Error fetching blog posts:', data.error);
        return; // Early return on error
      }

      // Update state with new blog posts
      setBlogPosts(prevPosts => [...prevPosts, ...data.items]);
      // Update the nextPageToken for pagination
      setNextPageToken(data.nextPageToken);

      console.log(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch the initial set of blog posts when the component mounts
    // handleFetchBlogPosts();
  }, []); // Only run on mount

  return (
    <>
      <div className="blogFeed">
        <div className="blogFeed__inner">
          <div className="blogFeed__header">
            <h4 className="blogFeed__heading">MY BLOG</h4>
            <h2 className="blogFeed__sub-heading">Check out my most recent post</h2>
          </div>
          {/* Map through returned blog posts */}
          {/* {blogPosts.map((post, index) => ( */}
            {/* <BlogPost key={index} post={post} /> // Pass post data to BlogPost component */}
            <BlogPost />
          {/* ))} */}
          <div className="blogFeed__cta">
            {isOnBlogPage ? (
              <button
                className="blogFeed__button"
                onClick={handleFetchBlogPosts}
                // disabled={!nextPageToken} 
              >
                Load More Posts
              </button>
            ) : (
              <Link to="/blog" className="blogFeed__button">
                See More Posts
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogFeed;
