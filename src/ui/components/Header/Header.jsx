import "./Header.scss";
import TypingText from "../TypingText/TypingText.jsx";

const Header = () => {

  return (
    <>
      <header className="header">
        <div 
          className="header__text-container"
        >
          <h5 className="header__headline">
            Hello World
          </h5>
      
          <TypingText 
            textToType={'I\'m Eric Millen'}
            typingDelayInterval={200}
            classNames={"header__introduction"}
            elementType={'h1'} 
          />

          <p className="header__roles">
            <span>Full Stack Web Developer</span>
          </p>
          <a href="#about" className="btn btn-outline-light btn-lg mt-3">
            <div className="d-flex">
              <div className="me-3">
                <div className="fas fa-chevron-down"></div>
              </div>
              <div className="text-start">
                <span>More About Me</span>
              </div>
            </div>
          </a>

            <div className="header__socials social d-flex gap-3 position-absolute">
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
              <a href="#"><i className="fab fa-github"></i></a>
          </div>
        </div>
      </header>
    </>
  )};

export default Header;