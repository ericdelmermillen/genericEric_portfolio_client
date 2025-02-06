import { useAppContext } from "../../contexts/AppContext.jsx";
import { FaGlobe, FaCode, FaCartShopping } from "react-icons/fa6";
import "./Services.scss";

const services = [
  {
    name: "Web Development",
    description: 
      "From concept to launch, I develop websites that are visually appealing and technically robust.",
    icon: FaGlobe,
    iconClass: "services__service-icon" 
  },
  {
    name: "Web Design",
    description: 
      "Designing engaging, user-friendly designs that work seamlessly, and look great on any device.",
    icon: FaCode,
    iconClass: "services__service-icon services__service-icon--small" 
  },
  {
    name: "Advertising & SEO",
    description:
      "Drive traffic and boost your online visibility with targeted ad campaigns and optimized content.",
    icon: FaCartShopping,
    iconClass: "services__service-icon services__service-icon--small"
  }
];

const Services = () => {
  const { 
    colorMode
   } = useAppContext();
  
  return (
    <>  
      <section className="services">
        <div className="services__inner">
        <div className={`services__bg--light${colorMode === "light" ? " show" : ""}`}></div>
        <div className={`services__bg--dark${colorMode === "dark" ? " show" : ""}`}></div>

        <div className="services__overlay"></div>

          <div className="services__content">
            <h2 className="services__heading">
              Services
            </h2>
            <h3 className="services__sub-heading">
              What Can I Do For You?
            </h3>
            <p className="services__lead">
              Here are some of the services that I offer:
            </p>

            <ul className="services__services-list">

              {services.map((service, idx) => (

                <li key={idx} className="services__service">
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