import { Outlet, useNavigation } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext.jsx";
import Footer from "./Footer/Footer.jsx";
import "./AppLayout.scss";

const AppLayout = () => {
  const { 
    colorMode,
    toggleColorMode,
    isLoading,
    isLoggedIn,
    loginUser,
    logoutUser
   } = useAppContext();
  
  return (
    <>
      <div className="appLayout" data-color-mode={colorMode}>
        
        <div className="appLayout__inner">
          <h1 className="appLayout__h1">App Layout/Nav</h1>

          <button
            onClick={toggleColorMode}
            >
            Color Mode: {colorMode}
          </button>

          <button
            onClick={() => loginUser(
              "ericdelmermillen@gmail.com", 
              "12345678"
            )}
            >
            LogIn
          </button>

          <button
            onClick={logoutUser}
            >
            LogOut
          </button>

          <h2>Logged In: {isLoggedIn ? "true" : "false"}</h2>
        
          <Outlet />

          <Footer/> 
        </div>
      </div>
    </>
  )};

export default AppLayout;