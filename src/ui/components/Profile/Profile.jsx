import { FaUser } from "react-icons/fa";
import { FaBuilding, FaHouse } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import "./Profile.scss";

// make profile item its own component if it can accept the icon as props

const Profile = () => {
  return (
    <>
      <div className="profile">

        <div className="profile__info">
          <h3 className="profile__heading">
            Profile
          </h3>
          <p className="profile__lead">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum molestias est itaque explicabo eos quo.
          </p>
        </div>

        <div className="profile__content">
        
          <ul className="profile__items">

            <li className="profile__item">
              <div className="profile__item-header">
                <FaUser className="profile__item-icon"/>
                <label className="profile__item-label">Name:</label>
              </div>

              <p className="profile__item-value">
                Eric Delmer Millen
              </p>
            </li>

            <li className="profile__item">
              <div className="profile__item-header">
                <FaBuilding className="profile__item-icon"/>
                <label className="profile__item-label">Current Position:</label>
              </div>

              <p className="profile__item-value">
                Owner at Zidgy Road Labs Inc
              </p>
            </li>

            <li className="profile__item">
              <div className="profile__item-header">
                <FaHouse className="profile__item-icon"/>
                <label className="profile__item-label">
                  Website:
                </label>
              </div>

              <p className="profile__item-value">
                <a 
                  href="https://www.genericEric.dev"
                  target="_blank"
                >
                  https://www.genericEric.dev
                </a>
              </p>
            </li>

            <li className="profile__item">
              <div className="profile__item-header">
                <MdEmail className="profile__item-icon"/>
                <label className="profile__item-label">Email:</label>
              </div>

              <p className="profile__item-value">
                <a 
                  href="mailto:ericdelmermillen@gmail.com?subject=Contact%20from%20genericEric.dev"
                  className="profile__email-link"
                >
                  ericdelmermillen@gmail.com
                </a>
              </p>
            </li>

          </ul>
        </div>

      </div>
      
    </>
  )};

export default Profile;