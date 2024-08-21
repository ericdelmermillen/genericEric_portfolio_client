import Facebook from "../../../assets/svgs/Facebook";
import Github from "../../../assets/svgs/Github";
import Instagram from "../../../assets/svgs/Instagram";
import LinkedIn from "../../../assets/svgs/LInkedIn";
import Twitter from "../../../assets/svgs/Twitter";
import Youtube from "../../../assets/svgs/Youtube";
import SocialLink from "../../components/SocialLink/SocialLink";
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

            <a 
              href="https://x.com/EricDelmer"
              target="_blank"
            >
              <Twitter className="footer__social"/>
            </a>

            <a 
              href="https://www.facebook.com/ericdelmermillen"
              target="_blank"
            >
              <Facebook className="header__social"/>
            </a>

            <a 
              href="https://www.instagram.com/ericdelmermillen/"
              target="_blank"
            >
              <Instagram className="header__social"/>
            </a>

            <a 
              href="https://github.com/ericdelmermillen"
              target="_blank"
            >
              <Github className="header__social"/>
            </a>

            <a 
              href="https://www.linkedin.com/in/eric-delmer-millen/"
              target="_blank"
            >
              <LinkedIn className="header__social"/>
            </a>

            <a 
              href="https://www.youtube.com/@EricMillen"
              target="_blank"
            >
              <Youtube className="header__social"/>
            </a>

          </div>
				</div>
      </footer>
    </>
  )};

export default Footer;