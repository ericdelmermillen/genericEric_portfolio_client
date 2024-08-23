import "./Profile.scss";

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
                  Email:
                </h5>
              </div>

              <p className="profile__item-value">
                ericdelmermillen@gmail.com
              </p>
            </li>

            <li className="profile__item">
              <div className="profile__item-header">
                <i className="profile__item-icon">X</i>
                <h5 className="profile__item-label">
                  Email:
                </h5>
              </div>

              <p className="profile__item-value">
                ericdelmermillen@gmail.com
              </p>
            </li>

          </ul>
        </div>

      </div>
      
    </>
  )};

export default Profile;