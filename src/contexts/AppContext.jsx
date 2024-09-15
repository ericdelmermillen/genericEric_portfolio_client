import { createContext, useContext, useReducer, useEffect, useState } from "react";

const AppContext = createContext();

// stand in for api response
const user = { email: "ericdelmermillen@gmail.com", password: "12345678"};

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
      console.log("From reducer")
      // api call wil be made either in Login
      // initial mount will check for token in local storage so no need to check email and password here
      // const { email, password } = action.payload;

      // if(!email || !password) {
      //   return "Email and Password required";
      // }
      
      // if(email === user.email && password === user.password) {
      //   // handle login call here
      //   // set token in local storage
      //   // set refresh token in local storage
      //   return {...state, isLoggedIn: true};
      // }
      return {...state, isLoggedIn: true};
      
    case "user/logout":
      // remove token
      // remove refresh token
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
  const [ isLoading, setIsLoading ] = useState(false)

  const toggleColorMode = () => {
    dispatch({ type: "colorMode/toggle"});
  };

  const loginUser = (email, password) => {
    dispatch({ 
      type: "user/login",
      payload: { email, password}
    });
  };

  const logoutUser = () => {
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