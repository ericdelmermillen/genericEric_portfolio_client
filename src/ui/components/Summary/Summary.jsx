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

          {/* <div className="profile__cta">
            <div className="profile__buttons">
              <a 
                className="profile__button"
              >
                Hire Me Now
              </a>
              <a 
                className="profile__button"
              >
                Download CV
              </a>
            </div>
          </div> */}
  
        </div>

      </section>
    </>
  )};

export default Summary;