import me from "../../../assets/images/me.jpeg"
import './About.scss';

const About = () => {
  return (
    <>
      <section
        id="about" 
        className="about"
      >
        <div className="about__inner">
          <header className="about__header">
            <h4 className="about__heading">
              ABOUT ME
            </h4>
            <h2 
              className="about__introduction"
            >
              Let me introduce myself.
            </h2>
          </header>

          <div className="about__summary">
            <img
              src={me}
              alt=""
              className="about__img"
            />
            <div className="about__content">
            
              <p className="about__blurb">
                I am a full stack web developer from Boston MA. I started writing code about 16 years ago. I started with Java and then moved to web technologies like HTML, CSS, JavaScript and PHP. I have worked for companies as well as ran my own. In 2016 I started creating content full-time. I love helping people learn to code and better their lives.
              </p>
            </div>
          </div>

        </div> 
      </section>
    </>
  )};

export default About;