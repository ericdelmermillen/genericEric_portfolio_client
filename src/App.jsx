import { useAppContext } from './contexts/AppContext.jsx';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Blog from './pages/Blog/Blog.jsx';
import ColorModeToggle from './components/ColorModeToggle/ColorModeToggle.jsx';
import Contact from "./pages/Contact/Contact.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Nav from './components/Nav/Nav.jsx';
import NotFound from "./pages/NotFound/NotFound.jsx";
import Projects from "./pages/Projects/Projects.jsx";
import SideNav from './components/SideNav/SideNav.jsx';
import WallPaper from './components/WallPaper/WallPaper.jsx';
import "./App.scss";
import { LightBoxContextProvider } from './contexts/LightBoxContext.jsx';
import AddEditProject from './pages/AddEditProject/AddEditProject.jsx';

const App = () => {
  const { 
    colorMode,
    toggleSideNav,
    isLoading,
    isLoggedIn,
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
      <div className="app" data-color-mode={colorMode}>

        {/* main loading spinner */}
        <div className={`loading ${isLoading ? "isLoading" : ""}`}></div>
        
        <div className="app__inner">

          <Nav>
            {isLoggedIn
              ? 
                (
                  <button
                    className="app__logout--nav"
                    onClick={handleLogoutNav}
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
                      onClick={handleLogoutSideNav}
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

              {/* <Route path="/" element={<Home />} /> */}

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
            
            <Route 
              path="/projects/add" 
              element={
                <AddEditProject>
                  <WallPaper />
                </AddEditProject>
              } 
            />

            <Route 
              path="/projects/edit/:projectID" 
              element={
                <AddEditProject>
                  <WallPaper />
                </AddEditProject>
              } 
            />

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
                duration: 5000,
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

// --NavLogo with initials
// 3) AppContext
// --user
// 4) Posts/What I'm Learning section/Blog
// --paginated list of posts
// captcha to prevent spam


// contact me floating button?: captcha to prevent spam
// lightbox alt for images