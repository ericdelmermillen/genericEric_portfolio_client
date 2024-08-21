import { useAppContext } from "../../../contexts/AppContext";
import { Link } from "react-router-dom";
import ColorModeToggle from "../ColorModeToggle/ColorModeToggle";
import "./Nav.scss";

const Nav = () => {
  const { 
    colorMode,
    toggleColorMode,
    scrollYPos,
    prevScrollYPos,
    toggleSideNav,
    isLoading,
    isLoggedIn,
    loginUser,
    logoutUser
   } = useAppContext();
   
  return (
    <nav 
      className={`nav ${prevScrollYPos < scrollYPos && scrollYPos > 50
        ? "hide"
        : ""}`
    }>
      <div className="nav__content">

        <div className="nav__logo">
          <Link
            to={"/"}
            >
            Logo
          </Link>
        </div>
      
        <ul className="nav__links">
          <li className="nav__link">
            <Link
              to={"/home"}
            >
              HOME
            </Link>
          </li>
          <li className="nav__link">
            <Link
              to={"/projects"}
            >
              PROJECTS
            </Link>
          </li>
          <li className="nav__link">
            <Link
              to={"/blog"}
            >
              BLOG
            </Link>
          </li>
          <li className="nav__link">
            <Link
              to={"/contact"}
            >
              CONTACT
            </Link>
          </li>

          {/* <li 
            className="nav__link"
            onClick={toggleColorMode}
          >
            {colorMode}
          </li> */}

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
      </div>
    </nav>
  )};

export default Nav;