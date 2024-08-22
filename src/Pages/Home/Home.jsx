import About from "../../ui/components/About/About.jsx";
import ContactForm from "../../ui/components/ContactForm/ContactForm.jsx";
import Header from "../../ui/components/Header/Header.jsx";
import Portfolio from "../../ui/components/Portfolio/Portfolio.jsx";
import Profile from "../../ui/components/Profile/Profile.jsx";
import Services from "../../ui/components/Services/Services.jsx";
import Stats from "../../ui/components/Stats/Stats.jsx";
import "./Home.scss";

const Home = () => {

  return (
    <>
      <div className="home">
        <div className="home__inner">


          
          <Header />
          <main 
            className="home__main"
          >
            <About />
            <Profile />
          </main>

          {/* 
          <Portfolio />
          <Services />
          <ContactForm />
          <Stats /> */}
          {/* <div className="home__testDiv"></div> */}
        </div>
      </div>
    </>
  )};

export default Home;