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
      <section className="profile my-6">
        <div className="profile__container container">
          <div className="row">
            <div className="col-12 col-md-6">
              <h3 className="profile__header text-uppercase fw-bold">
                Profile
              </h3>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur eaque repudiandae natus atque consequatur vitae iusto, obcaecati, asperiores optio, quam esse sed rerum voluptas molestiae?
              </p>
              <ul className="profile__items list-group list-group-flush">
                <li className="profile__item list-group-item mb-3">
                  <h5 className="profile__item text-transform-">
                    <i className="profile__icon fas fa-user text-primary me-2"></i>Name:
                  </h5>
                  <p>
                    Eric Delmer Millen
                  </p>
                </li>
                <li className="profile__item list-group-item mb-3">
                  <h5 className="text-transform-">
                    <i className="profile__icon fas fa-calendar text-primary me-2"></i>Birthdate:
                  </h5>
                  <p>None of your business</p>
                </li>
                <li className="profile__item list-group-item mb-3">
                  <h5 className="text-transform-">
                    <i className="profile__icon fas fa-building text-primary me-2"></i>Current Position:
                  </h5>
                  <p>Owner at Zidgy Road Labs Inc</p>
                </li>
                <li className="profile__item list-group-item mb-3">
                  <h5 className="text-transform-">
                    <i className="profile__icon fas fa-home text-primary me-2"></i>Website:
                  </h5>
                  <p>zidgyroadlabs.com</p>
                </li>
                <li className="profile__item list-group-item mb-3">
                  <h5 className="text-transform-">
                    <i className="profile__icon fas fa-envelope text-primary me-2"></i>Email:
                  </h5>
                  <p>ericdelmermillen@gmail.com</p>
                </li>
              </ul>
            </div>

            <div className="col-12 col-md-6">
              <h3 className="text-uppercase fw-bold">
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

          <div className="row mt-5 text-ceter">
            <div className="col-12">
              <a 
                className="btn btn-outline-dark btn-lg text-uppercase px-5 mx-3 my-2"
              >
                Hire Me Now
                {/* open contact form? */}
              </a>
              <a 
                className="btn btn-dark btn-lg text-uppercase px-5 mx-3 my-2"
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