import { useAppContext } from '../../contexts/AppContext.jsx';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BlogPost from '../BlogPost/BlogPost.jsx';
import BlogPostPlaceholder from '../BlogPostPlaceholder/blogPostPlaceholder.jsx';
import toast from 'react-hot-toast';
import "./BlogFeed.scss";

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

  // const RESULTS_PER_PAGE = isOnHome ? 1 : 5;
  const RESULTS_PER_PAGE = isOnHome ? 1 : 3;

  const [ blogPosts, setBlogPosts ] = useState([]);
  const [ isFirstPage, setIsFirstPage ] = useState(true);
  const [ isInitialFetch, setIsInitialFetch ] = useState(true);
  const [ nextPageToken, setNextPageToken ] = useState("");
  const [ allResultsFetched, setAllResultsFetched ] = useState(false);
  const [ isPaginationComplete, setIsPaginationComplete] = useState(false);
  const [ page, setPage ] = useState(1);
  const [ isInitialLoad, setIsInitialLoad ] = useState(true);
  const [ maxPostIdx, setMaxPostIdx ] = useState((RESULTS_PER_PAGE * page) - 1);

  const { 
    isLoading,
    setIsLoading
   } = useAppContext();

  const handleFetchBlogPosts = async () => {

    if(allResultsFetched && !isPaginationComplete) {
      setIsPaginationComplete(true);
      toast("No more posts to show");
    }
    
    if(!allResultsFetched) {
      setIsLoading(true);

      try {
        const response = await fetch(`${YOUTUBE_BASE_URL}/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=${RESULTS_PER_PAGE}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}&key=${YOUTUBE_API_KEY}`);

        const data = await response.json();

        const hasMorePages = data.nextPageToken;

        if(data.error) {
          console.error('Error fetching blog posts:', data.error);
          return;
        }
        
        if(!hasMorePages) {
          setAllResultsFetched(true);
          setIsFirstPage(false);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        } else if(hasMorePages) {
          setNextPageToken(hasMorePages);
        }
        
        const posts = data.items.map(item => ({
          videoId: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          description: item.snippet.description
        }));

        // using set to deal with doubling in dev: may refactor to use conditional logic with functional state updating in prod
        if(environment === "development") {
            
          const updatedBlogPosts = [...new Set([...blogPosts, ...posts])];
          
          setBlogPosts(updatedBlogPosts);

        } else if(environment === "production") {
          console.log(`In ${environment} mode`)
          setBlogPosts(prevPosts => [...prevPosts, ...posts]);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error connecting to youtube");
      } finally {
        setIsInitialLoad(false)
      }
    }
  };

  const handleMaxIdxPostLoaded = () => {
    if(isFirstPage) {
      setIsFirstPage(false);
    }
    setPage(c => c + 1);
    setMaxPostIdx((RESULTS_PER_PAGE * (page + 1)) - 1);
    setIsLoading(false);
  };
  
  // initial blogPost fetch on mount
  useEffect(() => {
    if(isInitialFetch) {
      setIsInitialFetch(false);
      handleFetchBlogPosts();
    }
  }, []);

  return (
    <>
      <div className={isOnHome ? "blogFeed home" : "blogFeed"}>
        <div className="blogFeed__inner">

          <div className={`blogFeed__content ${isOnHome ? "isOnHome" : ""}`}>

          {isOnHome
            ? (
                <div className="blogFeed__header">
                  <h4 className="blogFeed__heading">MY BLOG</h4>
                  <h2 className="blogFeed__sub-heading">Check out my most recent post</h2>
                </div>
              )
            
            : null
          }

          <div className="blogFeed__placeholders--initial">

            {isFirstPage && Array.from({length: RESULTS_PER_PAGE}).map((_, idx) => (
              <BlogPostPlaceholder key={idx}/>
            ))}

          </div>

          {blogPosts.map((post, idx) => (
            <BlogPost 
              key={post.videoId}
              idx={idx}
              title={post.title}
              description={post.description}
              videoID={post.videoId}
              isLoading={isLoading}
              isOnHome={isOnHome}
              isFirstPage={isFirstPage}
              RESULTS_PER_PAGE={RESULTS_PER_PAGE}
              allResultsFetched={allResultsFetched}
              maxPostIdx={maxPostIdx}
              handleMaxIdxPostLoaded={handleMaxIdxPostLoaded}
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
