import { useAppContext } from "../../../contexts/AppContext";
import Service from "../Service/Service";
import "./Services.scss";

const services = [
  { faClasses: "fas fa-globe",
    serviceName: "Web Design",
    serviceDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quis autem quam, illo quisquam eligendi illum delectus nam amet porro!"
  },
  { faClasses: "fas fa-code",
    serviceName: "Web Development",
    serviceDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quis autem quam, illo quisquam eligendi illum delectus nam amet porro!"
  },
  { faClasses: "fas fa-shopping-cart",
    serviceName: "Advetising & SEO",
    serviceDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quis autem quam, illo quisquam eligendi illum delectus nam amet porro!"
  },
];

// services-bg-day
// services-bg-night

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
            <h4 className="services__heading">
              Services
            </h4>
            <h2 className="services__sub-heading">
              What Can I Do For You?
            </h2>
            <p className="services__lead">
              Here are some of the services that I offer when it comes to web
              development and business.
            </p>

            <div className="services__services-list">

              {services.map((service, idx) =>

                <div 
                  key={idx}
                  className="services__service"
                >
                  <Service 
                    key={idx}
                    faClasses={service.faClasses}
                    serviceName={service.serviceName}
                    serviceDesc={service.serviceDesc}
                  />
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
      
    </>
  )};

export default Services;