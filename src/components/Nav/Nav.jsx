import { useAppContext } from "../../contexts/AppContext.jsx";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { scrollToTop } from "../../../utils/utils.js";
import Logo from "../../assets/svgs/Logo.jsx";
import ColorModeToggle from "../ColorModeToggle/ColorModeToggle";
import "./Nav.scss";

const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;

const Nav = ({ children }) => {
  const { 
    setIsLoading,
    scrollYPos,
    prevScrollYPos,
    setShowSideNav,
    handleBlogClick,
    handleContactClick,
    handleProjectsClick
   } = useAppContext();
   
  const { pathname } = useLocation();
  const isOnHome = useMemo(() => pathname === "/" || pathname === "/home" || pathname === "/home/");

  const handleScrollToTop = () => {
    setIsLoading(true);
    scrollToTop();
    setTimeout(() => {
      setIsLoading(false);
    }, MIN_LOADING_INTERVAL);
  };

  const handleSetShowSideNavTrue = () => setShowSideNav(true);

  return (
    <nav id="nav" className={`nav ${prevScrollYPos < scrollYPos && scrollYPos > 50 ? "hide" : ""}`}>
      <div className="nav__content">

        <Link to={"/"}>
          <div 
            className="nav__logo-box"
            onClick={isOnHome 
              ? handleScrollToTop
              : null}
          >
            <Logo className={"nav__logo"}/>
          </div>
        </Link>
      
        <ul className="nav__links">
          <li 
            className="nav__item"
            onClick={isOnHome
              ? handleScrollToTop
              :null
            }
          >
            <Link className={`nav__link ${
              isOnHome
                ? "active" 
                : ""}`} 
              to={"/home"}
            >
              HOME
            </Link>
          </li>
          <li 
            className="nav__item"
            onClick={handleProjectsClick}
          >
            <NavLink className="nav__link" to={"/projects"}>
              PROJECTS
            </NavLink>
          </li>
          <li 
            className="nav__item"
            onClick={handleBlogClick}
          >
            <NavLink className="nav__link" to={"/blog"}>
              BLOG
            </NavLink>
          </li>
          <li 
            className="nav__item"
            onClick={handleContactClick}
          >
            <NavLink className="nav__link" to={"/contact"}>
              CONTACT
            </NavLink>
          </li>

        </ul>

        <div className="nav__colorModeToggle">
          <ColorModeToggle
            inputId={"nav__colorModeToggler"}
          />
        </div> 

        <div 
          className="nav__toggle-button" 
          aria-label="Toggle Menu"
          onClick={handleSetShowSideNavTrue}
        >
        <div className="nav__toggle-icon"></div>
        <div className="nav__toggle-icon"></div>
        <div className="nav__toggle-icon"></div>
      </div>
        
        {children}
      </div>
      
    </nav>
  )};

export default Nav;