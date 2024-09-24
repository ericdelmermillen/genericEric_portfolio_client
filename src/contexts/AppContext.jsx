import { 
  createContext, 
  useContext, 
  useReducer, 
  useEffect, 
  useState
} from "react";
import { useNavigate } from "react-router-dom";
import { checkTokenExpiration } from "../../utils/utils";

const AppContext = createContext();

// stand in for api response
const user = { email: "ericdelmermillen@gmail.com", password: "12345678" };

const initialState = {
  isLoggedIn: false,
  colorMode: localStorage.getItem('colorMode') || "light",
  scrollYPos: window.scrollY,
  prevScrollYPos: window.scrollY,
  showSideNav: false,
  error: ""
};

// console.log(initialState)


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
      // api call wil be made either in Login
      // initial mount will check for token in local storage so no need to check email and password here
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
  }
};

const minLoadingTime = 200;

const AppContextProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const { isLoggedIn, colorMode, scrollYPos, prevScrollYPos, showSideNav} = state;
  const [ isLoading, setIsLoading ] = useState(false);

  const toggleColorMode = () => {
    dispatch({ type: "colorMode/toggle"});
  };

  const loginUser = (user) => {
    const { token, refreshToken } = user;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken); 

    dispatch({ type: "user/login" });
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken'); 
    dispatch({ type: "user/logout" });
  };

  const toggleSideNav = () => {
    dispatch({ type: "app/toggleSideNav"})
  }

  const contextValues = {
    isLoading,
    setIsLoading,
    minLoadingTime,
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


  // useEffect to check for token for isLoggedIn status
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await checkTokenExpiration();
        
        if(isLoggedIn) {
          dispatch({ type: "user/login" });
        } else {
          dispatch({ type: "user/logout" });
        }
      } catch (error) {
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
      }

    };

    handleScrollY();

    window.addEventListener("scroll", handleScrollY);

    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  }, [scrollYPos]);


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