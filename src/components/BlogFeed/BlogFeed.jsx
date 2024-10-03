import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BlogPost from '../BlogPost/BlogPost.jsx';
import "./BlogFeed.scss";

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_BASE_URL = import.meta.env.VITE_YOUTUBE_BASE_URL;
// SMW's playlist
const PLAYLIST_ID = "UU6aTLuI_j4-0wiDSzmaPctQ";
// GE's playlist
// const PLAYLIST_ID = "UUxF40kFyhKJ9JGuvNtfypyQ";

const BlogFeed = () => {
  
  const [ blogPosts, setBlogPosts ] = useState([]);
  const [ isInitialFetch, setIsInitialFetch ] = useState(true);
  const [ nextPageToken, setNextPageToken ] = useState("");
  const [ allResultsFetched, setAllResultsFetched ] = useState(false);
  const location = useLocation();
  const [ isOnHome ] = useState(location.pathname === "/" || location.pathname === "/home" || location.pathname === "/home/")

  const MAX_RESULTS = isOnHome
    ? 1
    : 5;
  // const MAX_RESULTS = isOnHome
  //   ? 1
  //   : 10;

    // console.log(MAX_RESULTS)

  const isOnBlogPage = location.pathname === "/blog" || location.pathname === "/blog/";

  const handleFetchBlogPosts = async () => {
    
    if(!allResultsFetched) {

      try {
        const response = await fetch(`${YOUTUBE_BASE_URL}/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=${MAX_RESULTS}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}&key=${YOUTUBE_API_KEY}`);

        const data = await response.json();

        const hasMorePages = data.nextPageToken;

        
        if(data.error) {
          console.error('Error fetching blog posts:', data.error);
          return;
        }
        
        if(!hasMorePages) {
          setAllResultsFetched(true);
        } else if(hasMorePages) {
          setNextPageToken(hasMorePages);
        }
        
        const posts = data.items.map(item => ({
          videoId: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          description: item.snippet.description
        }));

        const updatedBlogPosts = [...new Set([...blogPosts, ...posts])]

        setBlogPosts(updatedBlogPosts);
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  // initial blogPost fetch on mount
  useEffect(() => {
    if(isInitialFetch) {
      setIsInitialFetch(false)
      handleFetchBlogPosts();
    }
  }, []);


  return (
    <>
      <div className={isOnHome ? "blogFeed home" : "blogFeed"}>
        <div className="blogFeed__inner">

          {isOnHome
            ? (
                <div className="blogFeed__header">
                  <h4 className="blogFeed__heading">MY BLOG</h4>
                  <h2 className="blogFeed__sub-heading">Check out my most recent post</h2>
                </div>
              )
            
            : null
          }
          

          {blogPosts.map(post => (
            <BlogPost 
              key={post.videoId}
              description={post.description}
              title={post.title}
              videoID={post.videoId}
            />

          ))}

          <div className="blogFeed__cta">
            {isOnBlogPage ? (
              <button
                className="blogFeed__button"
                onClick={handleFetchBlogPosts}
                disabled={allResultsFetched} 
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
