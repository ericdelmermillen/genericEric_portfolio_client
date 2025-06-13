import Facebook from "../../assets/svgs/Facebook.jsx";
import Github from "../../assets/svgs/Github.jsx";
import Instagram from "../../assets/svgs/Instagram.jsx";
import LinkedIn from "../../assets/svgs/LinkedIn.jsx";
import Twitter from "../../assets/svgs/Twitter.jsx";
import Youtube from "../../assets/svgs/Youtube.jsx";
import "./Footer.scss";

const footerSocials = [
  { name: "Twitter", socialLink: "https://x.com/EricDelmer", socialIcon: Twitter },
  { name: "Facebook", socialLink: "https://www.facebook.com/ericdelmermillen", socialIcon: Facebook },
  { name: "Instagram", socialLink: "https://www.instagram.com/ericdelmermillen/", socialIcon: Instagram },
  { name: "Github", socialLink: "https://github.com/ericdelmermillen", socialIcon: Github },
  { name: "LinkedIn", socialLink: "https://www.linkedin.com/in/eric-delmer-millen/", socialIcon: LinkedIn },
  { name: "YouTube", socialLink: "https://www.youtube.com/@EricMillen", socialIcon: Youtube }
];

const Footer = () => {

  return (
    <>
      <footer className="footer">
        <div className="footer__content">

          <p className="footer__copyright">
            Eric Delmer Millen &copy; {new Date().getFullYear()}
          </p>
          <ul className="footer__socials">

            {footerSocials.map((social, idx) => (

              <li key={social.name} className="footer__social">
                <a 
                  href={social.socialLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title={social.name}
                  aria-label={social.name}
                >
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