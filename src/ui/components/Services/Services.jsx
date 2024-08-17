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

const Services = () => {
  return (
    <>  
      <section className="services">
        <div className="">

          <div className="">
            <h4 className="">Services</h4>
            <hr className="" />
            <h2 className="">What Can I Do For You?</h2>
            <p className="">
              Here are some of the services that I offer when it comes to web
              development and business.
            </p>
          </div>

          <div className="">

            {services.map((service, idx) =>
            
              <Service 
                key={idx}
                faClasses={service.faClasses}
                serviceName={service.serviceName}
                serviceDesc={service.serviceDesc}
              />
            )}

          </div>
        </div>
      </section>
      
    </>
  )};

export default Services;