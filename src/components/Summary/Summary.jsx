import { useAppContext } from "../../contexts/AppContext";
import Profile from "../Profile/Profile";
import Skills from "../Skills/Skills";
import "./Summary.scss";

const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;

const Summary = () => {
  const { focusContactNameInput, hideNav } = useAppContext();

  const handleFocusContactNameInput = () => {
    setTimeout(() => {
      focusContactNameInput();
    }, MIN_LOADING_INTERVAL * 5);
    
    setTimeout(() => {
      hideNav()
    }, MIN_LOADING_INTERVAL * 3);

  };

  return (
    <>
      <section className="summary">
        <div className="summary__inner">
          <article className="summary__article">

            <Profile />

            <Skills />

          </article>

          <div className="summary__cta">
            <div className="summary__buttons">
              <a 
                className="summary__button"
                onClick={handleFocusContactNameInput}
                href="#contact"
              >
                Hire Me Now
              </a>
              <a 
                className="summary__button"
                href="/Ericsume.pdf"
                download="Eric_Millen_Resume.pdf" 
              >
                Download CV
              </a>
            </div>
          </div> 
  
        </div>

      </section>
    </>
  )};

export default Summary;