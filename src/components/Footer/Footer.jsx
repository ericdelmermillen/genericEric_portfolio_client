import Facebook from "../../assets/svgs/Facebook.jsx";
import Github from "../../assets/svgs/Github.jsx";
import Instagram from "../../assets/svgs/Instagram.jsx";
import LinkedIn from "../../assets/svgs/LInkedIn.jsx";
import Twitter from "../../assets/svgs/Twitter.jsx";
import Youtube from "../../assets/svgs/Youtube.jsx";
import "./Footer.scss";

const footerSocials = [
  { socialLink: "https://x.com/EricDelmer", socialIcon: Twitter },
  { socialLink: "https://www.facebook.com/ericdelmermillen", socialIcon: Facebook },
  { socialLink: "https://www.instagram.com/ericdelmermillen/", socialIcon: Instagram },
  { socialLink: "https://github.com/ericdelmermillen", socialIcon: Github },
  { socialLink: "https://www.linkedin.com/in/eric-delmer-millen/", socialIcon: LinkedIn },
  { socialLink: "https://www.youtube.com/@EricMillen", socialIcon: Youtube }
];

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer__content">

          <p className="footer__copyright">
            Copyright Eric Delmer Millen &copy; {new Date().getFullYear()}
          </p>
          <ul className="footer__socials">

            {footerSocials.map((social, idx) => (

              <li key={idx} className="footer__social">
                <a href={social.socialLink} target="_blank">
                <social.socialIcon className="footer__social-icon"/>
                </a>
              </li>

            ))}

          </ul>
				</div>
      </footer>
    </>
  )};

export default Footer;