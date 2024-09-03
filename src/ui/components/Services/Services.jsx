import { useAppContext } from "../../../contexts/AppContext";
import { FaGlobe, FaCode, FaCartShopping } from "react-icons/fa6";
import "./Services.scss";

// make the Service component if it can take the icon as props

const services = [
  {
    name: "Web Development",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quis autem quam, illo quisquam eligendi illum delectus nam amet porro!",
      icon: FaGlobe,
      iconClass: "services__service-icon" 
    },
    {
      name: "Web Design",
      description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quis autem quam, illo quisquam eligendi illum delectus nam amet porro!",
      icon: FaCode,
      iconClass: "services__service-icon services__service-icon--small" 
    },
  {
    name: "Advertising & SEO",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quis autem quam, illo quisquam eligendi illum delectus nam amet porro!",
    icon: FaCartShopping,
    iconClass: "services__service-icon services__service-icon--small"
  },
];

const Services = () => {
  const { 
    colorMode,
    toggleColorMode,
    scrollYPos,
    prevScrollYPos,
    toggleSideNav,
    isLoading,
    isLoggedIn,
    loginUser,
    logoutUser
   } = useAppContext();
  
  return (
    <>  
      <section className="services">
        <div className="services__inner">
        <div className={`services__bg--light ${colorMode === "light" ? "show" : ""}`}></div>
        <div className={`services__bg--dark ${colorMode === "dark" ? "show" : ""}`}></div>
        <div className="services__overlay"></div>

          <div className="services__content">
            <h4 className="services__heading">Services</h4>
            <h2 className="services__sub-heading">What Can I Do For You?</h2>
            <p className="services__lead">
              Here are some of the services that I offer when it comes to web
              development and business.
            </p>

            <ul className="services__services-list">

              {services.map((service, index) => (

                <li key={index} className="services__service">
                  <div className="services__item">
                    <service.icon className={service.iconClass} />
                    <h3 className="services__service-name">{service.name}</h3>
                    <p className="services__service-description">{service.description}</p>
                  </div>
                </li>

              ))}

            </ul>
          </div>
        </div>
      </section>
      
    </>
  )};

export default Services;