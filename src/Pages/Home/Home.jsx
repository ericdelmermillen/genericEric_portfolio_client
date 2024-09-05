import { useEffect } from "react";
import { scrollToTop } from "../../../utils/utils.js";
import About from "../../ui/components/About/About.jsx";
import ContactForm from "../../ui/components/ContactForm/ContactForm.jsx";
import Header from "../../ui/components/Header/Header.jsx";
import Portfolio from "../../ui/components/Portfolio/Portfolio.jsx";
import Services from "../../ui/components/Services/Services.jsx";
import Summary from "../../ui/components/Summary/Summary.jsx";
import "./Home.scss";
import { Link } from "react-router-dom";

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

            {/* will need the componet to call the youtube api for the video url for the iframe and the title and description */}
            <div className="latestBlogPost">
              <div className="latestBlogPost__inner">

                <div className="latestBlogPost__header">
                  <h4 className="latestBlogPost__heading">
                    MY BLOG
                  </h4>

                  <h2 className="latestBlogPost__sub-heading">
                    Check out my most recent post
                  </h2>
                </div>

                <div className="latestBlogPost__content">

                  <div className="latestBlogPost__video">

                    <div className="latestBlogPost__video-text">
                      <p className="latestBlogPost__video-title">
                        Video Title
                      </p>
                    </div>

                  </div>

                </div>

                  <Link
                    to="/blog"
                    className="latestBlogPost__button"
                  >
                    See More Posts
                  </Link>

              </div>
            </div>

            <Services />
            <ContactForm />

          </main>

        </div>
      </div>
    </>
  )};

export default Home;