import { useEffect } from "react";
import { scrollToTop } from "../../../utils/utils.js";
import About from "../../ui/components/About/About.jsx";
import ContactForm from "../../ui/components/ContactForm/ContactForm.jsx";
import Header from "../../ui/components/Header/Header.jsx";
import Portfolio from "../../ui/components/Portfolio/Portfolio.jsx";
import Services from "../../ui/components/Services/Services.jsx";
import Summary from "../../ui/components/Summary/Summary.jsx";
import "./Home.scss";

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
          
          <main className="home__main">
            <About />
            <Summary />
            <Portfolio />
            <Services />
            <ContactForm />
          </main>

        </div>
      </div>
    </>
  )};

export default Home;