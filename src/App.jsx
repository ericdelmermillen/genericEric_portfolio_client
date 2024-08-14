import { useState } from 'react';
import About from './components/About/About';
import Header from './components/Header/Header';
import './App.scss';
import Profile from './components/Profile/Profile';
import Portfolio from './components/Portfolio/Portfolio';
import Services from './components/Services/Services';
import Stats from './components/Stats/Stats';
import Footer from './components/Footer/Footer';
import StyleShout from './components/StyleShout/StyleShout';
import ContactForm from './components/ContactForm/ContactForm';
import './bootstrap.scss';
import './font-awesome.scss'

const App = () => {
  const [ colorMode, setColorMode ] = useState(localStorage.getItem('colorMode') || "light");
  // console.log(colorMode)

  const handleToggleColorMode = () => {
    const currentMode = colorMode === 'light' 
      ? 'dark' 
      : 'light';
    setColorMode(currentMode);
  };

  return (
    <>
      <div className="app" data-color-mode={colorMode}>
        <button
          onClick={handleToggleColorMode}
        >
          Toggle Color Mode
        </button>

        <Header />
        <About />
        <Profile />
        <Portfolio />
        <StyleShout />
        <Services />
        <ContactForm />
        <Stats />
        <Footer/>
      </div>
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

// --social icons in footer? Fixed position at bottom?
// --copyright where?
// contact me floating button?: captcha to prevent spam
// lightbox alt for images
// fonts via google fonts in scss