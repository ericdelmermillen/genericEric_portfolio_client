import { 
  createContext, 
  useContext, 
  useState,
  useRef,
  useEffect,
  useMemo
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { throttle } from "lodash";
import { checkTokenIsValid, removeTokens, scrollToTop } from "../../utils/utils";
import { toast } from 'react-hot-toast'; 
import { setTokens } from "../../utils/utils.js"

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;
const LONG_THROTTLE_VALUE = import.meta.env.VITE_LONG_THROTTLE_VALUE;

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [ colorMode, setColorMode ] = useState(localStorage.getItem('colorMode') || "light");
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ showSideNav, setShowSideNav ] = useState(false);
  const [ scrollYPos, setScrollYPos ] = useState(window.scrollY);
  const [ prevScrollYPos, setPrevScrollYPos ] = useState(window.scrollY);
  const [ isProjectOrderEditable, setIsProjectOrderEditable ] = useState(false);
  const [ isEditMode, setIsEditMode ] = useState(false);
  const [ rerenderTrigger, setRerenderTrigger ] = useState(1);
  const [ prevPathname, setPrevPathname ] = useState(location.pathname);
  const [ lightboxOpen, setLightboxOpen ] = useState(false);
  const [ lightboxIndex, setLightboxIndex ] = useState(0);
  const [ slides, setSlides ] = useState([]);

  const handleSetLightBoxState = (images, idx = 0) => {
    setSlides(images);
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const contactSectionRef = useRef(null); 
  const contactNameRef = useRef(null); 

  const toggleColorMode = () => {
    const newColorMode = colorMode === "light" ? "dark" : "light";
    setColorMode(newColorMode);
    localStorage.setItem('colorMode', newColorMode);
  };

  const handleUpdateScrollYPos = () => {
    setPrevScrollYPos(scrollYPos);
    setScrollYPos(window.scrollY);
  };
  
  const checkLoginStatus = async () => {
    try {
      const isLoggedIn = await checkTokenIsValid(navigate);
      
      if(isLoggedIn) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        removeTokens();
      }
    } catch(error) {
      console.error("Error checking token expiration", error);
    };
  };

  const loginUser = async (email, password) => {
    setIsLoading(true);
  
    try {
      const response = await fetch(`${BASE_URL}/auth/loginuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if(!response.ok) {
        throw new Error(data.message || "Failed to log in. Please check your credentials.");
      };
  
      const { message, token, refreshToken } = data;
      setTokens(token, refreshToken);
  
      toast.success(message || "Login successful!");
      setIsLoggedIn(true);
  
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    };
  };

  const logoutUser = async () => {
    setIsLoading(true);
  
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
  
    try {
      const response = await fetch(`${BASE_URL}/auth/logoutuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "x-refresh-token": refreshToken, 
        }
      });
  
      if(!response.ok) {
        const { errors } = await response.json();
        errors?.forEach(error => console.log(error))
        throw new Error("Error, logging you out");
      };

      const { message } = await response.json();
      toast.success(message);
  
    } catch(error) {
      toast.error(error.message)
    } finally {
      removeTokens();
      setIsLoggedIn(false);
      setIsProjectOrderEditable(false);
      setIsEditMode(false);
      navigate("/");
      scrollToTop();
      setTimeout(() => {
        setIsLoading(false);
      }, MIN_LOADING_INTERVAL);
    };
  };
  
  const focusContactNameInput = () => {
    if(contactNameRef.current) {
      contactNameRef.current.focus();
    };
  };

  const showNav = () => {
    document.getElementById("nav").classList.remove("hide");
  };

  const hideNav = () => {
    document.getElementById("nav").classList.add("hide");
  };

  const handleBlogClick = useMemo(() => 
    throttle(() => {
      if(location.pathname.includes("blog")) {
        scrollToTop();
        setIsLoading(true);
        
        setTimeout(() => {
          setIsLoading(false);
        }, MIN_LOADING_INTERVAL);
      }
    }, LONG_THROTTLE_VALUE),
  [location.pathname]);

  const handleContactClick = useMemo(() => 
    throttle(() => {
      if(location.pathname.includes("contact")) {
        scrollToTop();
        setIsLoading(true);
  
        setTimeout(() => {
          setIsLoading(false);
        }, MIN_LOADING_INTERVAL);
      }
    }, LONG_THROTTLE_VALUE), 
  [location.pathname]);

  const handleProjectsClick = useMemo(() => 
    throttle(() => {
      if(location.pathname.includes("projects")) {
        setIsLoading(true);
        scrollToTop();
        
        setTimeout(() => {
          setIsLoading(false);
        }, MIN_LOADING_INTERVAL);
      };
    }, LONG_THROTTLE_VALUE),
  [location.pathname]);

  // useEffect to disable scroll to on esc press
  useEffect(() => {
    const handleKeyDown = (e) => {
      e.stopPropagation();

      if(e.key === "Escape") {
        e.preventDefault();
      };
    };
  
    document.addEventListener("keydown", handleKeyDown, true); // Capture phase
  
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, []);

  // update local storage when color mode state changes
  useEffect(() => {
    localStorage.setItem('colorMode', colorMode);
  }, [colorMode]);

  // useEffect for updating of scrollYPos
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if(!ticking) {
        requestAnimationFrame(() => {
          handleUpdateScrollYPos();
          setShowSideNav(false);
          ticking = false;
        });
        ticking = true;
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollYPos]);

  // useEffect to turn off isLoading if it is set true on one page but the user goes to another before it is set to false: blog page loads slowly from youtube embed
  useEffect(() => {
    const currentPathname = location.pathname;

    if(prevPathname !== currentPathname && isLoading) {
      setIsLoading(false);
      checkLoginStatus();
      setPrevPathname(currentPathname);
    };

    setIsProjectOrderEditable(false);
    setIsEditMode(false);
  }, [location.pathname]);

    // useEffect to check for token for isLoggedIn status on initial mount
    useEffect(() => {
      checkLoginStatus();
    }, []);

  const contextValues = {
    isLoading,
    setIsLoading,
    isLoggedIn,
    loginUser,
    logoutUser,
    colorMode,
    toggleColorMode,
    scrollYPos,
    prevScrollYPos,
    showSideNav,
    setShowSideNav,
    isProjectOrderEditable, 
    setIsProjectOrderEditable,
    isEditMode, 
    setIsEditMode,
    rerenderTrigger, 
    setRerenderTrigger,
    contactSectionRef,
    contactNameRef,
    focusContactNameInput,
    showNav,
    hideNav,
    handleBlogClick,
    handleContactClick,
    handleProjectsClick,
    lightboxOpen, 
    setLightboxOpen,
    lightboxIndex, 
    setLightboxIndex,
    slides, 
    setSlides,
    handleSetLightBoxState
  };

  return (
    <AppContext.Provider value={contextValues}>
      { children }
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContextProvider, useAppContext };