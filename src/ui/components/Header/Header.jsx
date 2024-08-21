import { useAppContext } from "../../../contexts/AppContext.jsx";
import DownIcon from "../../../assets/svgs/DownIcon.jsx";
import Facebook from "../../../assets/svgs/Facebook.jsx";
import Github from "../../../assets/svgs/Github.jsx";
import Instagram from "../../../assets/svgs/Instagram.jsx";
import LinkedIn from "../../../assets/svgs/LInkedIn.jsx";
import Twitter from "../../../assets/svgs/Twitter.jsx";
import Youtube from "../../../assets/svgs/Youtube.jsx";
import TypingText from "../TypingText/TypingText.jsx";
import "./Header.scss";

const viewportHeight = window.innerHeight;

const Header = () => {
  const { colorMode, scrollYPos } = useAppContext();

  return (
    <>
      <header className="header">
        <div className="header__hero">

          {scrollYPos < viewportHeight 

            ? ( 
                <>
                  <div className={`header__dayImg ${colorMode === 'light' ? "top" : ""}`}></div>
                  <div className={`header__nightImg ${colorMode === 'dark' ? "top" : ""}`}>
                  </div>
                  <div className="header__overlay"></div>
                

                  <div className={`header__dayImg ${colorMode === 'light' ? "top" : ""}`}></div>
                  <div className={`header__nightImg ${colorMode === 'dark' ? "top" : ""}`}>
                  </div>
                  <div className="header__overlay"></div>

                  <div className="header__content">
                    <h5 className="header__headline">
                      Hello, World.
                    </h5>

                    <TypingText 
                      textToType={'I\'m Eric Millen'}
                      typingDelayInterval={200}
                      classNames={"header__introduction"}
                      elementType={'h1'} 
                    />
                    <h4 className="header__description">
                      Full Stack Developer
                    </h4>

                    {/* Make Link Button */}
                    <div className="header__button">
                      <a 
                        className="header__button-link"
                        href="#about"
                        >
                        <DownIcon className={"header__button-down"}/>
                        <span
                          className="header__button-text"
                        >
                          More About Me
                        </span>
                      </a>
                    </div>

                  </div>

                  <div className="header__socials">

                    <a 
                      href="https://x.com/EricDelmer"
                      target="_blank"
                    >
                      <Twitter className="header__social"/>
                    </a>

                    <a 
                      href="https://www.facebook.com/ericdelmermillen"
                      target="_blank"
                    >
                      <Facebook className="header__social"/>
                    </a>

                    <a 
                      href="https://www.instagram.com/ericdelmermillen/"
                      target="_blank"
                    >
                      <Instagram className="header__social"/>
                    </a>

                    <a 
                      href="https://github.com/ericdelmermillen"
                      target="_blank"
                    >
                      <Github className="header__social"/>
                    </a>

                    <a 
                      href="https://www.linkedin.com/in/eric-delmer-millen/"
                      target="_blank"
                    >
                      <LinkedIn className="header__social"/>
                    </a>

                    <a 
                      href="https://www.youtube.com/@EricMillen"
                      target="_blank"
                    >
                      <Youtube className="header__social"/>
                    </a>
                  </div>

                </>
              )

            : null
          }

        </div>

      </header>
    </>
  )};

export default Header;