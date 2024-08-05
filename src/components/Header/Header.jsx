import './Header.scss';
import TypingText from '../TypingText/TypingText';

const Header = () => {

  return (
    <>
      <header className="header vh-100 text-center position-relative">
        <div 
          className="header__text-container text-container position-relative d-flex flex-column justify-content-center align-items-center h-100 text-white"
        >
          <h5 className="header__headline text-primary fs-3 fw-bold text-uppercase">
            Hello World
          </h5>
      
          <TypingText 
            textToType={'I\'m Eric Millen'}
            typingDelayInterval={200}
            classNames={"header__introduction display-1 fw-bold"}
            elementType={'h1'} 
          />

          <p className="header__roles roles text-uppercase fs-4">
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
              <a href="#"><i className="fab fa-instagram "></i></a>
              <a href="#"><i className="fab fa-linkedin "></i></a>
              <a href="#"><i className="fab fa-facebook "></i></a>
              <a href="#"><i className="fab fa-youtube "></i></a>
              <a href="#"><i className="fab fa-github "></i></a>
          </div>
        </div>
      </header>
    </>
  )};

export default Header;