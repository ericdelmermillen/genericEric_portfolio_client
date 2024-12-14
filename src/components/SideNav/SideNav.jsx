import { useAppContext } from "../../contexts/AppContext.jsx";
import { NavLink, useLocation } from 'react-router-dom';
import './SideNav.scss';

const SideNav = ({ children }) => {
  const { 
    showSideNav,
    toggleSideNav,
    handleBlogClick,
    handleContactClick,
    handleProjectsClick,
    MIN_LOADING_INTERVAL
   } = useAppContext();

  const location = useLocation();

  const isOnHome = location.pathname === "/" || location.pathname === "/home" || location.pathname === "/home/";

  const handleSideNavClick = () => {
    handleBlogClick();
    handleContactClick();
    handleProjectsClick();

    setTimeout(() => {
      toggleSideNav();
    }, MIN_LOADING_INTERVAL);
  };

  return (
    <>
      {showSideNav 
     
        ? 
          (
            <div 
              className="sideNav__clickOffDiv"
              onClick={toggleSideNav}
            ></div>
          )

          : null
      }
      
      <div className={`sideNav ${showSideNav ? "show" : ""}`}>
        <div className="sideNav__inner">
          <div 
            className="sideNav__close-button"
            onClick={toggleSideNav}
          >
            <div className="sideNav__close-icon"></div>
            <div className="sideNav__close-icon"></div>
          </div>
          
          <div className="sideNav__menu">
            <ul className='sideNav__links'>
              <li 
                className='sideNav__item'
                onClick={handleSideNavClick}
              >
                <NavLink className={`sideNav__link ${isOnHome ? "active" : ""}`} to="/">
                  HOME
                </NavLink>
              </li>
              <li 
                className='sideNav__item'
                onClick={handleSideNavClick}
              >
                <NavLink className='sideNav__link' to="/projects">
                  PROJECTS
                </NavLink>
              </li>
              <li 
                className='sideNav__item'
                onClick={handleSideNavClick}
              >
                <NavLink className='sideNav__link' to="/blog">
                  BLOG
                </NavLink>
              </li>
              <li 
                className='sideNav__item'
                onClick={handleSideNavClick}
              >
                <NavLink className='sideNav__link' to="/contact">
                  CONTACT
                </NavLink>
              </li>
            </ul>

          </div>

          {children}

        </div>
      </div>
    </>
  )};

export default SideNav;