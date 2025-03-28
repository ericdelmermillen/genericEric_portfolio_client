import { useAppContext } from '../../contexts/AppContext.jsx';
import me from "../../assets/images/me.jpeg"
import './About.scss';
import { useEffect } from 'react';

const About = () => {
  const {
    showNav,
    hideNav,
    lightboxOpen,
    handleSetLightBoxState
  } = useAppContext();

  const handleImageClick = () => {
    const image= [{ src: me, alt: "Image of Eric Millen" }];

    hideNav();
    handleSetLightBoxState(image);
  };

  useEffect(() => {
    if(!lightboxOpen) {
      showNav();
    };
  }, [lightboxOpen]);

  return (
    <>
      <section className="about">
        <div id="about" className="about__inner">
          <header className="about__header">
            <h2 className="about__heading">
              ABOUT ME
            </h2>
            <h3 className="about__sub-heading">
              Let me introduce myself
            </h3>
          </header>

          <div className="about__summary">
            <img
              src={me}
              alt="Avatar image of me, Eric Millen"
              className="about__img"
              onClick={handleImageClick}
            />
            <div className="about__name">
              Eric Millen
            </div>
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