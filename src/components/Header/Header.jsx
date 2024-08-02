import './Header.scss'

const Header = () => {
  return (
    <>
      <header className="header vh-100 text-center position-relative">
        <div 
          className="text-container position-relative d-flex flex-column justify-content-center align-items-center h-100"
        >
          <h5 className="text-primary fs-3 fw-bold text-uppercase">
            Hello World
          </h5>
          <h1 id="typing-text" className="display-1 fw-bold">
            I am Eric Millen
          </h1>
          <p className="roles text-uppercase fs-4">
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

            <div className="social d-flex gap-3 position-absolute">
              <a href="#">
                <i className="fab fa-twitter fa-3x "></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram fa-3x "></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin fa-3x "></i>
              </a>
              <a href="#">
                <i className="fab fa-facebook fa-3x "></i>
              </a>
              <a href="#">
                <i className="fab fa-youtube fa-3x "></i>
              </a>
              <a href="#">
                <i className="fab fa-github fa-3x "></i>
              </a>
          </div>
        </div>
      </header>
    </>
  )};

export default Header;