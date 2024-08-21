import { Link, Outlet, useNavigation } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext.jsx";
import Footer from "./Footer/Footer.jsx";
import Nav from "./Nav/Nav.jsx";
import SideNav from "./SideNav/SideNav.jsx"
import ColorModeToggle from "./ColorModeToggle/ColorModeToggle.jsx";
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

        <SideNav>
          <div className="appLayout__sideNav-children">
            {/* logout button if user logged in*/}
            {isLoggedIn
              ? <h1>Logout</h1>
              : null
            }
            <ColorModeToggle inputId={"sideNavColorModeToggle"} />
          </div>
        </SideNav>

        <div className="appLayout__inner">
          <Outlet />
        </div>
        <Footer/> 
      </div>
    </>
  )};

export default AppLayout;