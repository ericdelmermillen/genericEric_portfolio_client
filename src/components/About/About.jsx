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
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil amet repellendus dolore cumque error porro reprehenderit, accusamus esse aspernatur. Iste cum quod nam atque tempora magnam, consequuntur at dolorum quis consectetur, unde aut, laboriosam dolor ab nihil iure? Accusantium, in!
              </p>
            </div>
          </div>

        </div> 
      </section>
    </>
  )};

export default About;