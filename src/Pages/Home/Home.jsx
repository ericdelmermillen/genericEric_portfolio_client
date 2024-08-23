import { useEffect } from "react";
import { scrollToTop } from "../../../utils/utils.js";
import About from "../../ui/components/About/About.jsx";
import Header from "../../ui/components/Header/Header.jsx";

import ContactForm from "../../ui/components/ContactForm/ContactForm.jsx";
import Portfolio from "../../ui/components/Portfolio/Portfolio.jsx";
import SumProfile from "../../ui/components/Summary/Summary.jsx"
import Services from "../../ui/components/Services/Services.jsx";
import Stats from "../../ui/components/Stats/Stats.jsx";
import "./Home.scss";
import Summary from "../../ui/components/Summary/Summary.jsx";

const Home = () => {

  // scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <div className="home">
        <div className="home__inner">
          <Header />
          
          <main 
            className="home__main"
          >
            <About />
            <Summary />
          </main>

          {/* 
          <Portfolio />
          <Services />
          <ContactForm />
          <Stats /> */}

        </div>
      </div>
    </>
  )};

export default Home;