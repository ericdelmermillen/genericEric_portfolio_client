import { useAppContext } from './contexts/AppContext.jsx';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Zoom } from "yet-another-react-lightbox/plugins"; 
import AddEditProject from './pages/AddEditProject/AddEditProject.jsx';
import Blog from './pages/Blog/Blog.jsx';
import ColorModeToggle from './components/ColorModeToggle/ColorModeToggle.jsx';
import Contact from "./pages/Contact/Contact.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home/Home.jsx";
import Lightbox from "yet-another-react-lightbox";
import Login from "./pages/Login/Login.jsx";
import Nav from './components/Nav/Nav.jsx';
import NotFound from "./pages/NotFound/NotFound.jsx";
import Projects from "./pages/Projects/Projects.jsx";
import SideNav from './components/SideNav/SideNav.jsx';
import WallPaper from './components/WallPaper/WallPaper.jsx';
import "./App.scss";
import "yet-another-react-lightbox/styles.css";

const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;

const App = () => {
  const { 
    colorMode,
    setShowSideNav,
    isLoading,
    isLoggedIn,
    logoutUser,
    lightboxOpen, 
    setLightboxOpen,
    lightboxIndex, 
    setLightboxIndex,
    slides
   } = useAppContext();

   const navigate = useNavigate();
   
   const handleLogout = () => {
    logoutUser();
    navigate("/");
    setTimeout(() => {
      setShowSideNav(false);
    }, MIN_LOADING_INTERVAL);
   };

  return (
    <>
      <div className="app" data-color-mode={colorMode}>
        <div className="app__backgroundDiv"></div>

        <div className={`loading ${isLoading ? "isLoading" : ""}`}></div>
        
        <div className="app__inner">

          <Nav>
            {isLoggedIn
              ? 
                (
                  <button
                    className="app__logout--nav"
                    onClick={handleLogout}
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                )
              : null
            }
          </Nav>
          
          <SideNav>
            <div className="app__sideNav-children">

              {isLoggedIn
                ? 
                  (
                    <button
                      className="app__logout--sideNav"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  )
                : null
              }

              <ColorModeToggle inputId={"sideNavColorModeToggle"} />
            </div>
          </SideNav>
      
          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/home" element={<Home />} />
          
            <Route 
              path="/projects" 
              element={
                  <Projects>
                    <WallPaper />
                  </Projects>
              } 
            />
            
            {isLoggedIn
              ? 
                (
                  <Route 
                    path="/projects/add" 
                    element={
                      <AddEditProject>
                        <WallPaper />
                      </AddEditProject>
                    } 
                  />
                )
              : null
            }

            {isLoggedIn
              ? 
                (
                  <Route 
                    path="/projects/edit/:projectID" 
                    element={
                      <AddEditProject>
                        <WallPaper />
                      </AddEditProject>
                    } 
                  />
                )
              : null
            }

            <Route 
              path='/blog'
              element={
                <Blog>
                  <WallPaper />
                </Blog>
              } 
            />

            <Route 
              path="/contact" 
              element={
                <Contact>
                  <WallPaper />
                </Contact>
              } 
            />

            <Route 
              path="/login" 
              element={
                <Login>
                  <WallPaper />
                </Login>
              } 
            />

            <Route 
              path="/*" 
              element={
                <NotFound>
                  <WallPaper />
                </NotFound>
              } 
            />

          </Routes>

          <Footer /> 

          <ToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            draggable
            pauseOnHover
            theme={colorMode === "dark" ? "dark" : "light" } 
          />
        
        </div> 

     </div>

     <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        plugins={[, Zoom]}
        carousel={{ finite: slides.length === 1 }} 
        className={`yarl-lightbox ${slides.length === 1 ? "hide-arrows" : ""}`}
        on={{click: ({ index }) => setLightboxIndex(index)}}
        zoom={{ enabled: slides.length > 0 }}
        />
    </>
  )};

export default App;