import { Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext.jsx";
import ColorModeToggle from "./ColorModeToggle/ColorModeToggle.jsx";
import Footer from "./Footer/Footer.jsx";
import Nav from "./Nav/Nav.jsx";
import SideNav from "./SideNav/SideNav.jsx"
import "./AppLayout.scss";

const AppLayout = () => {
  const { 
    colorMode,
    toggleColorMode,
    toggleSideNav,
    isLoading,
    isLoggedIn,
    loginUser,
    logoutUser
   } = useAppContext();

   const navigate = useNavigate();

   const handleLogoutNav = () => {
    logoutUser();
    navigate("/");
   };

   const handleLogoutSideNav = () => {
    handleLogoutNav();
    toggleSideNav();
   };
  
  return (
    <>
      <div className="appLayout" data-color-mode={colorMode}>

        <div 
          className={`loading ${isLoading 
            ? "isLoading" 
            : ""}`}
        ></div>

        <div className="appLayout__inner">

        <Nav>
          {isLoggedIn
            ? 
              (
                <button
                  className="appLayout__logout--nav"
                  onClick={handleLogoutNav}
                >
                  Logout
                </button>
              )
            : null
          }
        </Nav>

        <SideNav>
          <div className="appLayout__sideNav-children">

            {isLoggedIn
              ? 
                (
                  <button
                    className="appLayout__logout--sideNav"
                    onClick={handleLogoutSideNav}
                  >
                    Logout
                  </button>
                )
              : null
            }

            <ColorModeToggle 
              inputId={"sideNavColorModeToggle"} 
            />
          </div>
        </SideNav>

        <div className="appLayout__inner">
          <Outlet />
        </div>
        <Footer/> 
      </div>
      </div>
    </>
  )};

export default AppLayout;