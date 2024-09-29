import { 
  createContext, 
  useContext, 
  useReducer, 
  useEffect, 
  useState
} from "react";
import { useNavigate } from "react-router-dom";
import { checkTokenIsValid } from "../../utils/utils";
import { toast } from 'react-hot-toast'; 

const AppContext = createContext();

const initialState = {
  isLoggedIn: false,
  colorMode: localStorage.getItem('colorMode') || "light",
  scrollYPos: window.scrollY,
  prevScrollYPos: window.scrollY,
  showSideNav: false,
  error: ""
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
  const [ isLoading, setIsLoading ] = useState(false);

  const navigate = useNavigate();

  const toggleColorMode = () => {
    dispatch({ type: "colorMode/toggle"});
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

      if(!response.ok) {

        if(response.status === 401) {
          return toast.error("Incorrect email or password");
        } else {
          throw new Error("Error logging you in");
        }
      }

      const { message, token, refreshToken } = await response.json();

      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken); 
  
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

  const logoutUser = () => {

    // call logoutuser here with the token and refresh token
    // 
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken'); 
    dispatch({ type: "user/logout" });
  };

  const toggleSideNav = () => {
    dispatch({ type: "app/toggleSideNav"})
  };

  // useEffect to check for token for isLoggedIn status
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await checkTokenIsValid(navigate);
        
        if(isLoggedIn) {
          dispatch({ type: "user/login" });
        } else {
          logoutUser();
        }
      } catch(error) {
        console.error("Error checking token expiration", error);
      }
    };
  
    checkLoginStatus();
  }, []);


  // Update local storage when color mode state changes
  useEffect(() => {
    localStorage.setItem('colorMode', colorMode);
  }, [colorMode]);


  // handle scroll position for show hide of menu
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

  const contextValues = {
    isLoading,
    setIsLoading,
    // minLoadingTime,
    isLoggedIn,
    loginUser,
    logoutUser,
    colorMode,
    toggleColorMode,
    scrollYPos,
    prevScrollYPos,
    showSideNav,
    toggleSideNav
  };

  return (
    <AppContext.Provider value={contextValues}>
      { children }
    </AppContext.Provider>
  )
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContextProvider, useAppContext};