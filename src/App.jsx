import { useAppContext } from './contexts/AppContext.jsx';
import { LightBoxContextProvider } from './contexts/LightBoxContext.jsx';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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

            <Route 
              path="/" 
              element={
                <LightBoxContextProvider>
                  <Home />
                </LightBoxContextProvider>
              } 
              />

            <Route 
              path="/home" 
              element={
                <LightBoxContextProvider>
                  <Home />
                </LightBoxContextProvider>
              } 
            />
          
            <Route 
              path="/projects" 
              element={
                <LightBoxContextProvider>
                  <Projects>
                    <WallPaper />
                  </Projects>
                </LightBoxContextProvider>
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

        <Toaster
          position="bottom-center"  
          reverseOrder={false} // Newest toast at the bottom
          gutter={8} // Space between toasts
          containerStyle={{ top: 20, right: 20 }}
          toastOptions={{
            duration: 3000, // Default duration
            ariaProps: {
              role: 'status',
              'aria-live': 'polite',
            },
            style: {
              background: '#333',
              color: '#fff',
              padding: '16px',
            },
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
              iconTheme: {
                primary: 'white',
                secondary: 'green',
              },
              style: {
                background: 'green',
                color: '#fff',
              },
            },
            error: {
              duration: 3000,
              icon: '🔥',
              style: {
                background: 'red',
                color: '#fff',
              },
            },
            loading: {
              duration: Infinity,
              icon: '⏳',
              style: {
                background: '#007bff',
                color: '#fff',
              },
            },
          }}
        />
        
        </div> 
     </div>
    </>
  )};

export default App;