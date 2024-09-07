import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout/AppLayout.jsx";
import Blog from "./Pages/Blog/Blog.jsx";

import BlogPost from "./pages/BlogPost/BlogPost.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Home from "./pages/Home/Home.jsx";
import Projects from "./pages/Projects/Projects.jsx";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails.jsx";
import Login from "./pages/Login/Login.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import './App.scss';
import WallPaper from "./ui/WallPaper/WallPaper.jsx";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    // errorElement: <Error />,
    children: [
      { 
        path: '/', 
        element: <Home />
      },
      { 
        path: '/home', 
        element: <Home />
      },
      { 
        path: '/projects', 
        // element: <Projects />
        element: (
          <Projects>
            <WallPaper />
            </Projects>
          )
      },
      { 
        path: '/projects/project/:projectID', 
        element: <ProjectDetails />
      },
      { 
        path: '/blog', 
        element: 
          (
            <Blog>
              <WallPaper />
            </Blog>
          )
      },
      { 
        path: '/blog/post/:postID', 
        element: <BlogPost />
      },
      { 
        path: '/contact', 
        element: (
            <Contact>
              <WallPaper />
            </Contact>
          )
      },
      { 
        path: '/login', 
        element: <Login />
      },
      { 
        path: '/*', 
        element: <NotFound />
      },
      // { 
      //   path: '/menu', 
      //   element: <Menu />,
      //   // loader function to be fetched on navigation
      //   loader: menuLoader,
      //   // errorElement placed here since this is the only route that fetches data
      //   errorElement: <Error />,
      // },
      // { 
      //   path: '/cart', 
      //   element: <Cart /> 
      // },
      // { 
      //   path: '/order', 
      //   element: <Order /> 
      // },
      // { 
      //   path: '/order/new', 
      //   element: <CreateOrder />,
      //   // action is the request to be made when the route fires
      //   action: createOrderAction,
      //   errorElement: <Error />,
      // },
      // { 
      //   path: '/order/:orderID', 
      //   loader: orderLoader,
      //   // loader function in Order has access to params via BrowserRouter without passing them in
      //   element: <Order />,
      //   errorElement: <Error />,
      // }
    ]
  },
]);


const App = () => {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )};

export default App;

// 1) make AppLayout
// 2) Navbar & SideNav
// --NavBar shows when scrolling up or at top only
// --can I use a checkbox for the state to show the SideNav
// --NavLogo with initials
// 3) AppContext
// --user
// --currentPost for blog session
// 4) Posts/What I'm Learning section/Blog
// --Typing Text for Hero section of Page
// --paginated list of posts
// --keyword filtering of posts(?)
// --ability to make comments
// captcha to prevent spam


// contact me floating button?: captcha to prevent spam
// lightbox alt for images