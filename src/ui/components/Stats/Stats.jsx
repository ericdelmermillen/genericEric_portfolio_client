import Stat from "../Stat/Stat";
import "./Stats.scss";

const stats = [
  {faClasses: "fas fa-users", howMany: "500+", thingName: "clients"},
  {faClasses: "fas fa-project-diagram", howMany: "700+", thingName: "projects"},
  {faClasses: "fas fa-clock", howMany: "16+", thingName: "years"},
  {faClasses: "fas fa-book", howMany: "25", thingName: "subscribers"},
  {faClasses: "fab fa-youtube", howMany: "2.06M", thingName: "subscribers"},
  {faClasses: "fas fa-graduation-cap", howMany: "1M+", thingName: "students"}
];

const Stats = () => {
  return (
    <>  
      <section className="stats">
        <div className="">
          <div className="">

            {stats.map((stat, idx) => 
              <Stat 
                key={idx}
                faClasses={stat.faClasses}
                howMany={stat.howMany}
                thingName={stat.thingName}
              />
            )}

          </div>
        </div>
      </section>
        
    </>
  )};

export default Stats;