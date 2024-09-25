import Profile from "../Profile/Profile";
import Skills from "../Skills/Skills";
import "./Summary.scss";

const Summary = () => {

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
              <button 
                className="summary__button"
                onClick={() => console.log("Hire me now")}
              >
                Hire Me Now
              </button>
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