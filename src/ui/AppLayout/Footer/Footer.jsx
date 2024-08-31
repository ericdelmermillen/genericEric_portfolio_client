import Facebook from "../../../assets/svgs/Facebook";
import Github from "../../../assets/svgs/Github";
import Instagram from "../../../assets/svgs/Instagram";
import LinkedIn from "../../../assets/svgs/LInkedIn";
import Twitter from "../../../assets/svgs/Twitter";
import Youtube from "../../../assets/svgs/Youtube";
import "./Footer.scss"

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer__content">

          <p className="footer__copyright">
            Copyright Eric Delmer Millen &copy; {new Date().getFullYear()} 
          </p>
          <div className="footer__socials">

            <div className="footer__social">
              <a
                href="https://x.com/EricDelmer"
                target="_blank"
              >
                <Twitter className="footer__social-icon"/>
              </a>
            </div>

            <div className="footer__social">
              <a
                href="https://www.facebook.com/ericdelmermillen"
                target="_blank"
              >
                <Facebook className="footer__social-icon"/>
              </a>
            </div>

            <div className="footer__social">
              <a
                href="https://www.instagram.com/ericdelmermillen/"
                target="_blank"
              >
                <Instagram className="footer__social-icon"/>
              </a>
            </div>

            <div className="footer__social">
              <a
                href="https://github.com/ericdelmermillen"
                target="_blank"
              >
                <Github className="footer__social-icon"/>
              </a>
            </div>

            <div className="footer__social">
              <a
                href="https://www.linkedin.com/in/eric-delmer-millen/"
                target="_blank"
              >
                <LinkedIn className="footer__social-icon"/>
              </a>
            </div>

            <div className="footer__social">
              <a
                href="https://www.youtube.com/@EricMillen"
                target="_blank"
              >
                <Youtube className="footer__social-icon"/>
              </a>
            </div>

          </div>
				</div>
      </footer>
    </>
  )};

export default Footer;