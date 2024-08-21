import { useAppContext } from '../../../contexts/AppContext.jsx'; 
import { useLocation, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
import './SideNav.scss';

const SideNav = ({ handleLogOut, children }) => {
  const { 
    showSideNav,
    toggleSideNav
   } = useAppContext();

  const location = useLocation();
  const navigate = useNavigate();
  
  // const handleNavLinkBio = () => {
  //   handleNavLinkClick();

  //   if(location.pathname === "/bio") {
  //     setShowSideNav(false);
  //     toast.info("Already on Bio");
  //   } else {
  //     setShowSideNav(false);
  //     setTimeout(() => {
  //       navigate('/bio');
  //     }, minLoadingInterval);
  //   }
  // };
  
  // const handleNavLinkContact = () => { 
  //   handleNavLinkClick();
    
  //   if(location.pathname === "/contact") {
  //     setShowSideNav(false);
  //     toast.info("Already on Contact");
  //   } else {
  //     setShowSideNav(false);
  //     setTimeout(() => {
  //       navigate('/contact');
  //     }, minLoadingInterval);
  //   }
  // };
  
  // const handleSideNavLogout = () => {
  //   setTimeout(() => {
  //     handleLogOut();
  //   }, 500);
  //   setShowSideNav(false);
  // };

  return (
    <>

     {showSideNav 
     
      ? (
          <div 
            className="sideNav__touchOff-div"
            onClick={toggleSideNav}
          ></div>
        )

        : null
      }
      
      <div 
        className={`sideNav ${showSideNav 
          ? "show" 
          : ""}`}
      >
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
                className='sideNav__link'
                // onClick={handleNavLinkBio}
              >
                Home
              </li>
              <li 
                className='sideNav__link'
                // onClick={handleNavLinkBio}
              >
                Projects
              </li>
              <li 
                className='sideNav__link'
                // onClick={handleNavLinkContact}
              >
                Blog
              </li>
                <li 
                  className='sideNav__link'
                  // onClick={() => setShowSideNav(false)}
                  >
                    Contact
                </li>


            </ul>

          </div>

          {children}

        </div>
      </div>
    </>
  )};

export default SideNav;