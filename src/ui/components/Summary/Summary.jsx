import Profile from "../Profile/Profile";
import Skills from "../Skills/Skills";
import "./Summary.scss";

const Summary = () => {

  return (
    <>
      <section className="summary">
        <div className="summary__inner">
          <h1>From Summary</h1>
          <article className="summary__main">

            <Profile />

            <Skills />

          </article>

          <div className="summary__cta">
            <div className="summary__buttons">
              <a 
                className="summary__button"
                >
                Hire Me Now
              </a>
              <a 
                className="summary__button"
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