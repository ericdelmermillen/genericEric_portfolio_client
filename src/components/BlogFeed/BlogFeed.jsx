import { useState, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext.jsx';
import { Link, useLocation } from 'react-router-dom';
import { scrollToTop } from '../../../utils/utils.js';
import BlogPost from '../BlogPost/BlogPost.jsx';
import toast from 'react-hot-toast';
import "./BlogFeed.scss";

const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_BASE_URL = import.meta.env.VITE_YOUTUBE_BASE_URL;

// SMW's playlist
const PLAYLIST_ID = "UU6aTLuI_j4-0wiDSzmaPctQ"; 

// GE's playlist
// const PLAYLIST_ID = "UUxF40kFyhKJ9JGuvNtfypyQ"; 

const environment = import.meta.env.VITE_NODE_ENV;

const BlogFeed = () => {
  const location = useLocation();
  const [ isOnHome ] = useState(
    location.pathname === "/" || 
    location.pathname === "/home" || 
    location.pathname === "/home/");
    
  const RESULTS_PER_PAGE = isOnHome ? 1 : 3;
    
  const initialVideos = Array.from({length: RESULTS_PER_PAGE}, () => (
    {
      isInitialPlaceholder: true,
      description: ""
    }
  ));
  
  const [ allResultsFetched, setAllResultsFetched ] = useState(false);
  const [ blogPosts, setBlogPosts ] = useState(initialVideos);
  const [ isPaginationComplete, setIsPaginationComplete] = useState(false);
  const [ isInitialLoad, setIsInitialLoad ] = useState(true);
  const [ nextPageToken, setNextPageToken ] = useState("");
  const [ page, setPage ] = useState(1);
  const [ blogPostLoadedCount, setBlogPostLoadedCount ] = useState(0);

  const { isLoading, setIsLoading} = useAppContext();

   
   const handleFetchBlogPosts = async () => {
    if(allResultsFetched && !isPaginationComplete) {
      setIsLoading(true);
      setIsPaginationComplete(true);
      toast("No more posts to show");

      setTimeout(() => {
        setIsLoading(false);
      }, MIN_LOADING_INTERVAL);
    };
    
    if(!allResultsFetched) {
      setIsLoading(true);

      try {
        const response = await fetch(`${YOUTUBE_BASE_URL}/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=${RESULTS_PER_PAGE}${nextPageToken 
          ? `&pageToken=${nextPageToken}` 
          : ''}&key=${YOUTUBE_API_KEY}`);

        const data = await response.json();

        const hasMorePages = data.nextPageToken;

        if(data.error) {
          console.error('Error fetching blog posts:', data.error);
          return;
        };
        
        if(!hasMorePages) {
          setAllResultsFetched(true);
        } else if(hasMorePages) {
          setNextPageToken(hasMorePages);
        };
        
        const posts = data.items.map(item => ({
          videoId: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          description: item.snippet.description
        }));

        // using set to deal with doubling in dev: may refactor to use conditional logic with functional state updating in prod
        if(environment === "development") {

          if(page === 1) {
            setBlogPosts(posts);
            scrollToTop();
            
          } else {
            const updatedBlogPosts = [...new Set([...blogPosts, ...posts])];
            setBlogPosts(updatedBlogPosts);
          };

        } else if(environment === "production") {
          console.log(`In ${environment} mode`);

          if(page === 1) {
            setBlogPosts(posts);
          } else {
            setBlogPosts(prevPosts => [...prevPosts, ...posts]);
          };

        };
        setPage(c => c + 1);

      } catch (error) {
        console.log(error);
        toast.error("Error connecting to youtube");
      } finally {
        if(isInitialLoad) {
          setIsInitialLoad(false);
        };
      };
    };
  };

  const handleIncrementBlogPostLoadedCount = () => {
    setBlogPostLoadedCount(c => c + 1);
  };


  // useEffect to handle setting isLoading false after loaded and fetched post increment count reaches equality
  useEffect(() => {
    if(blogPostLoadedCount === blogPosts.length && !isInitialLoad) {
      setIsLoading(false);
    }

  }, [blogPosts.length, blogPostLoadedCount]);

  
  // initial blogPost fetch on mount
  useEffect(() => {
    if(isInitialLoad) {
      setIsLoading(true);
      handleFetchBlogPosts();
    };
  }, []);


  return (
    <>
      <div className={isOnHome ? "blogFeed home" : "blogFeed"}>
        <div className="blogFeed__inner">

          <div className={`blogFeed__content ${isOnHome ? "isOnHome" : ""}`}>

            {isOnHome
              ? (
                  <div className="blogFeed__header">
                    <h4 className="blogFeed__heading">
                      MY BLOG
                    </h4>
                    <h2 className="blogFeed__sub-heading">
                      Check out my <span className="blogFeed__most-recent">most recent post</span>
                    </h2>
                  </div>
                )
              
              : null
            }

            {blogPosts.map((post, idx) => (
              <BlogPost 
                key={post.videoId || idx}
                isInitialPlaceholder={post.isInitialPlaceholder}
                title={post.title}
                description={post.description}
                videoID={post.videoId}
                isLoading={isLoading}
                isOnHome={isOnHome}
                RESULTS_PER_PAGE={RESULTS_PER_PAGE}
                allResultsFetched={allResultsFetched}
                handleIncrementBlogPostLoadedCount={handleIncrementBlogPostLoadedCount}
              />
            ))}
          </div>

          {!isInitialLoad

            ?
              (
                <div className="blogFeed__cta">
                  {isOnHome 
                    ? 
                      (
                        <Link to="/blog" className="blogFeed__button isOnHome">
                          See More Posts
                        </Link>
                      )
    
                    : 
                    
                      (
                        <button
                          className={`blogFeed__button ${isPaginationComplete 
                            ? "disabled"
                            : ""
                          }`}
                          onClick={handleFetchBlogPosts}
                        >
                          Load More Posts
                        </button>
                      ) 
                  }
                </div>
              )
            : null
          }

        </div>
      </div>
    </>
  )};

export default BlogFeed;