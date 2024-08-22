// import ProgressBar from "../../ui/AppLayout/ProgressBar/ProgressBar";
import "./Profile.scss";

const skills = [
  { skill: "HTML 5", skillLevel: "95%"},
  { skill: "CSS", skillLevel: "90%"},
  { skill: "Javascript", skillLevel: "90%"},
  { skill: "React", skillLevel: "90%"},
  { skill: "Bootstrap", skillLevel: "85%"},
  { skill: "Node", skillLevel: "95%"},
  { skill: "MySQL", skillLevel: "85%"},
];

const Profile = () => {

  return (
    <>
      <section className="profile">
        <div className="profile__inner">
          <main className="profile__main">
            
            <div className="profile__info">
              
              <h3 className="profile__heading">
                Profile
              </h3>

              <p className="profile__lead">
                Here is some more info about myself to help you get to know me better.
              </p>

              <ul className="profile__items">

                <li className="profile__item">

                  <div className="profile__item-header">
                    <i className="profile__item-icon">X</i>
                    <h5 className="profile__item-label">
                      Name:
                    </h5>
                  </div>

                  <p className="profile__item-value">
                    Eric Delmer Millen
                  </p>
                </li>

                <li className="profile__item">

                  <div className="profile__item-header">
                    <i className="profile__item-icon">X</i>
                    <h5 className="profile__item-label">
                      Current Position:
                    </h5>
                  </div>

                  <p className="profile__item-value">
                    Owner at Zidgy Road Labs Inc
                  </p>
                </li>

                <li className="profile__item">

                  <div className="profile__item-header">
                    <i className="profile__item-icon">X</i>
                    <h5 className="profile__item-label">
                      Website:
                    </h5>
                  </div>

                  <p className="profile__item-value">
                    zidgyroadlabs.com
                  </p>
                </li>

                <li className="profile__item">

                  <div className="profile__item-header">
                    <i className="profile__item-icon">X</i>
                    <h5 className="profile__item-label">
                      Email
                    </h5>
                  </div>

                  <p className="profile__item-value">
                    ericdelmermillen@gmail.com
                  </p>
                </li>

              </ul>
            </div>
            
            <div className="profile__skills">
              <h3 className="">
                Skills:
              </h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum molestias est itaque explicabo eos quo.
              </p>

            </div>

          </main>

          <div className="profile__cta">
            <div className="profile__buttons">
              <a 
                className="profile__button"
              >
                Hire Me Now
                {/* open contact form? */}
              </a>
              <a 
                className="profile__button"
              >
                Download CV
                {/* make download CV in pdf format */}
              </a>
            </div>
          </div>
  
        </div>

      </section>
    </>
  )};

export default Profile;