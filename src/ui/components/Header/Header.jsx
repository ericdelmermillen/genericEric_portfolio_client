import { useAppContext } from "../../../contexts/AppContext.jsx";
import { useEffect, useState } from "react";
import DownIcon from "../../../assets/svgs/DownIcon.jsx";
import Facebook from "../../../assets/svgs/Facebook.jsx";
import Github from "../../../assets/svgs/Github.jsx";
import Instagram from "../../../assets/svgs/Instagram.jsx";
import LinkedIn from "../../../assets/svgs/LInkedIn.jsx";
import Twitter from "../../../assets/svgs/Twitter.jsx";
import Youtube from "../../../assets/svgs/Youtube.jsx";
import TypingText from "../TypingText/TypingText.jsx";
import "./Header.scss";

const headerSocials = [
  { socialLink: "https://x.com/EricDelmer", socialIcon: Twitter },
  { socialLink: "https://www.facebook.com/ericdelmermillen", socialIcon: Facebook },
  { socialLink: "https://www.instagram.com/ericdelmermillen/", socialIcon: Instagram },
  { socialLink: "https://github.com/ericdelmermillen", socialIcon: Github },
  { socialLink: "https://www.linkedin.com/in/eric-delmer-millen/", socialIcon: LinkedIn },
  { socialLink: "https://www.youtube.com/@EricMillen", socialIcon: Youtube }
];

const Header = () => {
  const { colorMode, scrollYPos } = useAppContext();
  const [ documentHeight, setDocumentHeight ] = useState(Infinity);

  useEffect(() => {
    setDocumentHeight(document.documentElement.scrollHeight)
  }, [documentHeight]);

  return (
    <>
      <header className="header">
        <div className="header__hero">

          <div className="header__overlay"></div>
          
          {scrollYPos > (documentHeight * 0.8)
            ? <div className="header__bg-layer"></div>
            : null
          }

          {/* need accessibility for conditionally shown background images */}
          
          <div 
            className={`header__dayImg ${colorMode === 'light' 
              ? "top" 
              : ""}`}
            aria-label="Daytime background showing a the sun in the sky above the ocean."
          ></div>
          <div 
            className={`header__nightImg ${colorMode === 'dark' 
              ? "top" 
              : ""}`}
            aria-label="Nighttime background showing a the sun in the sky above the ocean."
          ></div>
                  
          <div className="header__content">
            <h5 className="header__headline">
              HELLO, WORLD.
            </h5>

            <TypingText 
              classNames={"header__introduction"}
              textToType={'I\'m Eric Millen'}
              typingDelayInterval={200}
              elementType={'h1'} 
            />
            <h4 className="header__description">
              Full Stack Developer
            </h4>

            <div className="header__button">
              <a 
                className="header__button-link"
                href="#about"
                >
                <DownIcon className={"header__button-down"}/>
                <span className="header__button-text">
                  More About Me
                </span>
              </a>
            </div>

          </div>

          {scrollYPos < (documentHeight * 0.8)

            ? <ul className="header__socials">

                {headerSocials.map((social, idx) => (

                    <li key={idx} className="header__social">
                      <a href={social.socialLink} target="_blank">
                        <social.socialIcon className="header__social-icon" />
                      </a>
                    </li>
                ))}

              </ul>

            : null
          }

        </div>
      </header>
    </>
  )};

export default Header;