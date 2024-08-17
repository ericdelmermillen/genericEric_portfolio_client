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
        <div className="profile__container">
          <div className="">
            <div className="">
              <h3 className="">
                Profile
              </h3>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur eaque repudiandae natus atque consequatur vitae iusto, obcaecati, asperiores optio, quam esse sed rerum voluptas molestiae?
              </p>
              <ul className="profile__items">
                <li className="profile__item">
                  <h5 className="profile__item">
                    <i className="profile__icon"></i>Name:
                  </h5>
                  <p>
                    Eric Delmer Millen
                  </p>
                </li>
                <li className="profile__item">
                  <h5 className="">
                    <i className="profile__icon fas fa-calendar"></i>Birthdate:
                  </h5>
                  <p>None of your business</p>
                </li>
                <li className="profile__item">
                  <h5 className="">
                    <i className="profile__icon fas fa-building"></i>Current Position:
                  </h5>
                  <p>Owner at Zidgy Road Labs Inc</p>
                </li>
                <li className="profile__item">
                  <h5 className="">
                    <i className="profile__icon"></i>Website:
                  </h5>
                  <p>zidgyroadlabs.com</p>
                </li>
                <li className="profile__item">
                  <h5 className="">
                    <i className="profile__icon fas fa-envelope"></i>Email:
                  </h5>
                  <p>ericdelmermillen@gmail.com</p>
                </li>
              </ul>
            </div>

            <div className="">
              <h3 className="">
                Skills:
              </h3>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum molestias est itaque explicabo eos quo.
              </p>

              {/* {skills.length 
                ? skills.map((skill, idx) =>
                    <ProgressBar 
                      barLabel={skill.skill}
                      classNames={"profile__skill--progress progress mb-4"}
                      currentValue={skill.skillLevel}
                      key={idx}
                    />
                  )
                : null} */}

            </div>

          </div>

          <div className="">
            <div className="">
              <a 
                className=""
              >
                Hire Me Now
                {/* open contact form? */}
              </a>
              <a 
                className=""
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