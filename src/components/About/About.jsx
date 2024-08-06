import me from '../../assets/images/me.jpeg';
import './About.scss';

const About = () => {
  return (
    <>
      <section id="about" className="about bg-light py-5">
        <div className="about__container container">
          <div className="about__text text-center">
            <h4 className="about__heading text-uppercase fw-bold text-primary">
              About Me
            </h4>
            <hr className="w-25 mx-auto" />
            <h2 className="about__introduction mb-4">Let me introduce myself.</h2>
          </div>
          <div className="about__content d-flex gap-5 align-items-center h-100">
            <img
              src={me}
              alt=""
              className="about__img img-fluid rounded-circle"
            />
            <p className="about__blurb lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam placeat aliquid quis, eos et architecto at minima expedita debitis reiciendis aperiam tempora. 
              Illo eos ipsum non expedita ipsa explicabo aspernatur, velit error, quae omnis iusto, est repellendus blanditiis deserunt officia voluptatem at natus? Incidunt non, at eius quos molestias blanditiis.
            </p>
          </div>
        </div>
      </section>
    </>
  )};

export default About;