import { useAppContext } from "../../contexts/AppContext.jsx";
import { Link, NavLink, useLocation } from "react-router-dom";
import ColorModeToggle from "../ColorModeToggle/ColorModeToggle";
import "./Nav.scss";

const Nav = ({ children }) => {
  const { 
    scrollYPos,
    prevScrollYPos,
    toggleSideNav
   } = useAppContext();
   
  const { pathname } = useLocation();

  return (
    <nav className={`nav ${prevScrollYPos < scrollYPos && scrollYPos > 50 ? "hide" : ""}`}>
      <div className="nav__content">

        <div className="nav__logo">
          <Link to={"/"}>
            Logo
          </Link>
        </div>
      
        <ul className="nav__links">
          <li className="nav__item">
            <Link className={`nav__link ${
              pathname === "/" || pathname === "/home" || pathname === "/home/"
                ? "active" 
                : ""}`} 
              to={"/home"}
            >
              HOME
            </Link>
          </li>
          <li className="nav__item">
            <NavLink className="nav__link" to={"/projects"}>
              PROJECTS
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink className="nav__link" to={"/blog"}>
              BLOG
            </NavLink>
          </li>
          <li className="nav__item">
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
          className="nav__open-button"
          onClick={toggleSideNav}
        >
          Open
        </div>
        
        {children}
      </div>
    </nav>
  )};

export default Nav;