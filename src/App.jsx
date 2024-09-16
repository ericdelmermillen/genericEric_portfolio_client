import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import AppLayout from "./ui/AppLayout/AppLayout.jsx";
import Blog from "./Pages/Blog/Blog.jsx";

// import { queryClient } from "./queryClient/queryClient.js";
import queryClient from "./queryClient/queryClient.js";
import BlogPost from "./pages/BlogPost/BlogPost.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Home from "./pages/Home/Home.jsx";
import Projects from "./pages/Projects/Projects.jsx";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails.jsx";
import Login from "./pages/Login/Login.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import WallPaper from "./ui/WallPaper/WallPaper.jsx";
import './App.scss';

// const queryClient = new QueryClient();

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
        element: (
          <Projects>
            <WallPaper />
          </Projects>
        )
      },
      { 
        path: '/projects/project/:projectID', 
        element: (
          <ProjectDetails>
            <WallPaper />
          </ProjectDetails>
        )
      },
      { 
        path: '/blog', 
        element: (
          <Blog>
            <WallPaper />
          </Blog>
        )
      },
      { 
        path: '/blog/post/:postID', 
        element: (
          <BlogPost>
            <WallPaper />
          </BlogPost >
        )
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
        element: (
          <Login>
            <WallPaper />
          </Login>
          )
      },
      { 
        path: '/*', 
        element: (
          <NotFound>
            <WallPaper />
          </NotFound>
        )
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
     <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />

         <Toaster
          position="bottom-center"  
          reverseOrder={false} // Newest toast at the bottom
          gutter={8} // Space between toasts
          containerStyle={{
            top: 20,
            right: 20,
          }}
          toastOptions={{
            duration: 4000, // Default duration
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
              duration: 5000,
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
              duration: 7000,
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

     </QueryClientProvider>
    </>
  )};

export default App;

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