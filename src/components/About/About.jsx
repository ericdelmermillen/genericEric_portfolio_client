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
                A results-oriented full-stack developer with a strong foundation in React and Node.js. I thrive on solving complex problems and collaborating with teams to build high-quality web applications. With a focus on clean code and efficient development practices, I strive to deliver exceptional user experiences.
              </p>
            
              {/* <p className="about__blurb">
                As a freelance full-stack developer specializing in React and Node.js, I work closely with clients to deliver high-quality web solutions that meet their specific needs. With experience in both front-end and back-end development, I’m able to manage projects from concept to launch. Whether it’s building a custom website or optimizing an existing application, I focus on delivering results that enhance user experience and drive business growth.
              </p> */}
              {/* <p className="about__blurb">
                As a freelance full-stack developer specializing in React and Node.js, I work closely with clients to deliver high-quality web solutions that meet their specific needs. With experience in both front-end and back-end development, I’m able to manage projects from concept to launch. Whether it’s building a custom website or optimizing an existing application, I focus on delivering results that enhance user experience and drive business growth.
              </p> */}
              {/* <p className="about__blurb">
                Experienced full-stack developer offering versatile solutions for your web development needs. With a proven track record in freelancing, I have successfully delivered projects across various industries. My expertise in React and Node.js allows me to build custom applications tailored to your specific requirements. Let's collaborate to bring your vision to life.
              </p> */}
            </div>
          </div>

        </div> 
      </section>
    </>
  )};

export default About;