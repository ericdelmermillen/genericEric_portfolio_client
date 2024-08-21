import { Link, Outlet, useNavigation } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext.jsx";
import Footer from "./Footer/Footer.jsx";
import Nav from "./Nav/Nav.jsx";
import "./AppLayout.scss";
import SideNav from "./SideNav/SideNav.jsx"

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
        {/* refactor sideNav to accept children for color Mode Toggle and logoutButton */}
        <SideNav />

        <div className="appLayout__inner">
          <Outlet />
        </div>
        <Footer/> 
      </div>
    </>
  )};

export default AppLayout;