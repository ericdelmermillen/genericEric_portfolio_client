import { 
  createContext, 
  useContext, 
  useReducer, 
  useEffect, 
  useState,
  useRef
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { checkTokenIsValid, removeTokens, scrollToTop } from "../../utils/utils";
import { toast } from 'react-hot-toast'; 
import { setTokens } from "../../utils/utils.js"

const AppContext = createContext();

const initialState = {
  scrollYPos: window.scrollY,
  prevScrollYPos: window.scrollY,
};

const reducer = (state, action) => {
  switch(action.type) {

    case "app/scrollY":
      return {
        ...state, 
        prevScrollYPos: state.scrollYPos,
        scrollYPos: action.payload
      };

    default: 
      throw new Error("Unknown action type")
  };
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AppContextProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const { 
    scrollYPos, 
    prevScrollYPos
  } = state;
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const [ colorMode, setcolorMode ] = useState(localStorage.getItem('colorMode') || "light");
  const [ isLoggedIn, setisLoggedIn ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ showSideNav, setshowSideNav ] = useState(false);
  const [ isProjectOrderEditable, setIsProjectOrderEditable ] = useState(false);
  const [ isEditMode, setIsEditMode ] = useState(false);
  const [ rerenderTrigger, setRerenderTrigger ] = useState(1);
  const [ prevPathname, setPrevPathname ] = useState(location.pathname);

  const contactSectionRef = useRef(null); 
  const contactNameRef = useRef(null); 

  const MIN_LOADING_INTERVAL = 250;
  const MODAL_TRANSITION_INTERVAL = 200;

  const toggleSideNav = () => setshowSideNav(c => !c);

  const toggleColorMode = () => {
    const newColorMode = colorMode === "light"
      ? "dark" 
      : "light";

      setcolorMode(newColorMode);
      localStorage.setItem('colorMode', newColorMode);
  };
  
  const checkLoginStatus = async () => {
    try {
      const isLoggedIn = await checkTokenIsValid(navigate);
      
      if(isLoggedIn) {
        setisLoggedIn(true);
      } else {
        setisLoggedIn(false);
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
  
      let responseData;
  
      try {
        responseData = await response.json();
      } catch(jsonError) {
        throw new Error("Failed to parse server response. Please try again later.");
      };
  
      const { message, token, refreshToken } = responseData;
  
      if(!response.ok) {
        throw new Error(message || "Failed to log in. Please check your credentials.");
      };
  
      setTokens(token, refreshToken);
  
      toast.success(message || "Login successful!");
      // dispatch({ type: "user/login" });
      setisLoggedIn(true);
  
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
      setisLoggedIn(false);
      setIsProjectOrderEditable(false);
      setIsEditMode(false);
      navigate("/");
      setRerenderTrigger(c => c + 1);
      scrollToTop();
      setTimeout(() => {
        setIsLoading(false);
      }, MIN_LOADING_INTERVAL);
    };
  };
  
  const focusContactNameInput = () => {
    if(contactNameRef.current) {
      contactNameRef.current.focus();
    }
  };


  const hideNav = () => {
    document.getElementById("nav").classList.add("hide");
  };


  const handleBlogClick = () => {
    if(location.pathname === "/blog" || location.pathname === "/blog/") {
      scrollToTop();
      setIsLoading(true);
      
      setTimeout(() => {
        setIsLoading(false);
      }, MIN_LOADING_INTERVAL);
    };
  };

  const handleContactClick = () => {
    if(location.pathname === "/contact" || location.pathname === "/contact/") {
      scrollToTop();
      setIsLoading(true);
      
      setTimeout(() => {
        setIsLoading(false);
      }, MIN_LOADING_INTERVAL);
    };
  };

  const handleProjectsClick = () => {
    if(location.pathname === "/projects" || location.pathname === "/projects/") {
      scrollToTop();
      setIsLoading(true);
      
      setTimeout(() => {
        setIsLoading(false);
      }, MIN_LOADING_INTERVAL);
    };
  };


  // Update local storage when color mode state changes
  useEffect(() => {
    localStorage.setItem('colorMode', colorMode);
  }, [colorMode]);


  // useEffect for updating of scrollYPos
  useEffect(() => {
    const handleScrollY = () => {
      const newScrollYPos = window.scrollY;
      
      if(scrollYPos !== undefined && newScrollYPos !== scrollYPos) {
        dispatch({ type: "app/scrollY", payload: newScrollYPos});
      };

    };

    handleScrollY();

    window.addEventListener("scroll", handleScrollY);

    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  }, [scrollYPos]);


  // useEffect to turn off isLoading if it is set true on one page but the user goes to another before it is set to false
  useEffect(() => {
    const currentPathname = location.pathname;

    if(prevPathname !== currentPathname && isLoading) {
      setIsLoading(false);
      checkLoginStatus();
      setPrevPathname(currentPathname)
    }

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
    toggleSideNav,
    isProjectOrderEditable, 
    setIsProjectOrderEditable,
    MIN_LOADING_INTERVAL,
    MODAL_TRANSITION_INTERVAL,
    isEditMode, 
    setIsEditMode,
    rerenderTrigger, 
    setRerenderTrigger,
    contactSectionRef,
    contactNameRef,
    focusContactNameInput,
    hideNav,
    handleBlogClick,
    handleContactClick,
    handleProjectsClick
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

export { AppContextProvider, useAppContext};