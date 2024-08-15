import { createContext, useContext, useReducer, useEffect } from "react";

const AppContext = createContext();

// stand in for api response
const user = { email: "ericdelmermillen@gmail.com", password: "12345678"};

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  colorMode: localStorage.getItem('colorMode') || "light",
  error: ""
};

const reducer = (state, action) => {
  switch(action.type) {

    case "app/loading":
      return {...state, isLoading: true};

    case "user/login":
      const { email, password } = action.payload;

      if(!email || !password) {
        return "Email and Password required";
      }
      
      if(email === user.email && password === user.password) {
        // handle login call here
        // set token in local storage
        // set refresh token in local storage
        return {...state, isLoggedIn: true};
      }
      
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


const AppContextProvider = ({ children }) => {
  // const [ state, dispatch ] = useReducer(reducer, initialState);
  const [ {isLoading, isLoggedIn, colorMode} = state, dispatch ] = useReducer(reducer, initialState);
  // const { isLoading, isLoggedIn, colorMode } = state;

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

  const contextValues = {
    isLoading,
    isLoggedIn,
    loginUser,
    logoutUser,
    colorMode,
    toggleColorMode
  };


  // Update local storage when color mode state changes
  useEffect(() => {
    localStorage.setItem('colorMode', colorMode);
  }, [colorMode]);


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