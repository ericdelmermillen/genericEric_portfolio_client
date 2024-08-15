import About from "../../components/About/About";
import ContactForm from "../../components/ContactForm/ContactForm";
import Header from "../../components/Header/Header";
import Portfolio from "../../components/Portfolio/Portfolio";
import Profile from "../../components/Profile/Profile";
import Services from "../../components/Services/Services";
import Stats from "../../components/Stats/Stats";
import StyleShout from "../../components/StyleShout/StyleShout";
import "./Home.scss";

const Home = () => {

  return (
    <>
      <h1 className="home">From Home</h1>
      <Header />
      <About />
      <Profile />
      <Portfolio />
      <StyleShout />
      <Services />
      <ContactForm />
      <Stats />
    </>
  )};

export default Home;