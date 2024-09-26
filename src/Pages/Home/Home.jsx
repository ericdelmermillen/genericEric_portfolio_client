import { useEffect } from "react";
import { scrollToTop } from "../../../utils/utils.js";
import About from "../../components/About/About.jsx";
import BlogFeed from "../../components/BlogFeed/BlogFeed.jsx";
import ContactForm from "../../components/ContactForm/ContactForm.jsx";
import Header from "../../components/Header/Header.jsx";
import Portfolio from "../../components/Portfolio/Portfolio.jsx";
import Services from "../../components/Services/Services.jsx";
import Summary from "../../components/Summary/Summary.jsx";
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
            <BlogFeed />
            <Services />
            <ContactForm />
          </main>

        </div>
      </div>
    </>
  )};

export default Home;