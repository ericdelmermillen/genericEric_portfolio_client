import { Link, Outlet, useNavigation } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext.jsx";
import Footer from "./Footer/Footer.jsx";
import Nav from "./Nav/Nav.jsx";
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
        <Nav />

        <div
          className="appLayout__mobileLogo"
        >
          <Link
            to="/"
          >
            mobileLogo
          </Link>
        </div>

        <div className="appLayout__inner">
          <Outlet />
        </div>
        <Footer/> 
      </div>
    </>
  )};

export default AppLayout;