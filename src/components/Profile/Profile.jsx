import { FaUser } from "react-icons/fa";
import { FaBuilding, FaHouse } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import "./Profile.scss";

const profileItems = [
  { itemIcon: FaUser, itemLabel: "Name:", itemValue: "Eric Delmer Millen" },
  { itemIcon: FaBuilding, itemLabel: "Current Position:", itemValue: "Owner at Zidgy Road Labs Inc" },
  { itemIcon: FaHouse, itemLabel: "Website:", itemValue: "https://www.genericeric.dev" },
  { itemIcon: MdEmail, itemLabel: "Email:", itemValue: "ericdelmermillen@gmail.com" , itemHref: "mailto:ericdelmermillen@gmail.com?subject=Contact%20from%20genericeric.dev"}
];

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

            {profileItems.map((item, idx) => (

              <li key={idx} className="profile__item">

                <div className="profile__item-header">
                  <item.itemIcon className="profile__item-icon"/>
                  <label className="profile__item-label">{item.itemLabel}</label>
                </div>

                {item.itemHref

                  ? (
                      <a href={item.itemHref} className="profile__email-link">
                        <p className="profile__item-value">{item.itemValue}</p>
                      </a>
                    )
                  
                  : <p className="profile__item-value">{item.itemValue}</p>
                
                }
              </li>

            ))}

          </ul>
        </div>

      </div>
      
    </>
  )};

export default Profile;