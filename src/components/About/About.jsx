import me from "../../assets/images/me.jpeg"
import './About.scss';

const About = () => {
  return (
    <>
      <section id="about" className="about">
        <div className="about__inner">
          <header className="about__header">
            <h4 className="about__heading">
              ABOUT ME
            </h4>
            <h2 className="about__introduction">
              Let me introduce myself
            </h2>
          </header>

          <div className="about__summary">
            <img
              src={me}
              alt="Avatar image of me, Eric Millen"
              className="about__img"
            />
            <div className="about__content">

            <p className="about__blurb">
                
A results-oriented full-stack developer with a strong foundation in React and Node.js. I thrive on solving complex problems and collaborating with teams to build high-quality web applications. With a focus on clean code and efficient practices, I strive to deliver exceptional user experiences.
              </p>
         
            </div>
          </div>

        </div> 
      </section>
    </>
  )};

export default About;