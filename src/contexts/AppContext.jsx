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

// move new global state to initial state where appropriate and make functions to dispatch updates
const initialState = {
  isLoggedIn: false,
  colorMode: localStorage.getItem('colorMode') || "light",
  scrollYPos: window.scrollY,
  prevScrollYPos: window.scrollY,
  showSideNav: false
};

const reducer = (state, action) => {
  switch(action.type) {

    case "app/scrollY":
      return {
        ...state, 
        prevScrollYPos: state.scrollYPos,
        scrollYPos: action.payload
      };

    case "app/toggleSideNav":
      return {...state, showSideNav: !state.showSideNav}

    case "user/login":
      return {...state, isLoggedIn: true};
      
    case "user/logout":
      return {...state, isLoggedIn: false};

    case "colorMode/toggle":
      const newColorMode = state.colorMode === "light"
        ? "dark"
        : "light"
      
      localStorage.setItem('colorMode', newColorMode);

      return {...state, colorMode: newColorMode};

    default: 
      throw new Error("Unknown action type")
  };
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AppContextProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const { isLoggedIn, colorMode, scrollYPos, prevScrollYPos, showSideNav } = state;
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isProjectOrderEditable, setIsProjectOrderEditable ] = useState(false);
  const [ isEditMode, setIsEditMode ] = useState(false);
  const [ rerenderTrigger, setRerenderTrigger ] = useState(1);

  const contactSectionRef = useRef(null); 
  const contactNameRef = useRef(null); 

  const MIN_LOADING_INTERVAL = 250;
  const MODAL_TRANSITION_INTERVAL = 200;

  const toggleColorMode = () => {
    dispatch({ type: "colorMode/toggle"});
  };

  const loginUser = async (email, password) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/auth/loginuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }),
      });

      if(!response.ok) {

        if(response.status === 401) {
          return toast.error("Incorrect email or password");
        } else {
          throw new Error("Error logging you in");
        }
      };

      const { message, token, refreshToken } = await response.json();

      setTokens(token, refreshToken);
  
      toast.success(message);
      
      dispatch({ type: "user/login" });

      return navigate("/");
          
      } catch(error) {
        console.log(error);
        return toast.error(error.message);
      } finally {
      setIsLoading(false);
    }
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
        throw new Error("Error logging you out");
      } else {
        const { message } = await response.json();
        toast.success(message);
      }
  
    } catch (error) {
      console.log(error.message);
    } finally {
      removeTokens();
      dispatch({ type: "user/logout" });
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


  const toggleSideNav = () => {
    dispatch({ type: "app/toggleSideNav"});
  };

  
  const focusContactNameInput = () => {
    if(contactNameRef.current) {
      contactNameRef.current.focus();
    }
  };


  const hideNav = () => {
    document.getElementById("nav").classList.add("hide");
  };

  
  // useEffect to check for token for isLoggedIn status
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await checkTokenIsValid(navigate);
        
        if(isLoggedIn) {
          dispatch({ type: "user/login" });
        } else {
          removeTokens();
          dispatch({ type: "user/logout" });
        }
      } catch(error) {
        console.error("Error checking token expiration", error);
      };
    };
  
    checkLoginStatus();
  }, []);


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
    console.log(currentPathname)

    if(isLoading) {
      setIsLoading(false);
    }

    setIsProjectOrderEditable(false);
    setIsEditMode(false);

  }, [location.pathname]);

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
    hideNav
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