import { useAppContext } from "../../contexts/AppContext.jsx";
import { FaGlobe, FaCode, FaCartShopping } from "react-icons/fa6";
import "./Services.scss";

const services = [
  {
    name: "Web Development",
    // description:
    //   "I build responsive, high-performance websites tailored to your business needs, ensuring seamless user experiences across all devices.",
    //   icon: FaGlobe,
    //   iconClass: "services__service-icon", 
    description:
      "From concept to launch, I develop websites that are both visually appealing and technically robust, helping your brand stand out online.",
    // description:
    //   "Custom web development that focuses on speed, scalability, and functionality, providing you with a digital presence that drives results.",
      icon: FaGlobe,
      iconClass: "services__service-icon" 
    },
    {
      name: "Web Design",
      // description:
      // "Beautiful and user-centered designs that captivate your audience while ensuring optimal usability across devices.",
      // description:
      // "I craft engaging and intuitive website designs that reflect your brand and meet the needs of your target users.",
      description:
      "Stand out with clean, modern web designs that not only look stunning but also improve navigation and user interaction.",
      icon: FaCode,
      iconClass: "services__service-icon services__service-icon--small" 
    },
  {
    name: "Advertising & SEO",
    // description:
    //   "Drive traffic and boost your online visibility with targeted ad campaigns and optimized content designed to rank higher in search results.",
    // description:
    //   "I offer tailored advertising strategies combined with SEO best practices to increase your site’s traffic and conversion rates.",
    description:
      "Enhance your online presence through effective advertising and SEO tactics that position your brand at the top of search engines.",
    icon: FaCartShopping,
    iconClass: "services__service-icon services__service-icon--small"
  },
];

const Services = () => {
  const { 
    colorMode
   } = useAppContext();
  
  return (
    <>  
      <section className="services">
        <div className="services__inner">
        <div className={`services__bg--light ${colorMode === "light" ? "show" : ""}`}></div>
        <div className={`services__bg--dark ${colorMode === "dark" ? "show" : ""}`}></div>
        <div className="services__overlay"></div>

          <div className="services__content">
            <h4 className="services__heading">
              Services
            </h4>
            <h2 className="services__sub-heading">
              What Can I Do For You?
            </h2>
            <p className="services__lead">
              Here are some of the services that I offer.
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