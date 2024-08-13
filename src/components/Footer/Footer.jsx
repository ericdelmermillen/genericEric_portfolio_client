import SocialLink from "../SocialLink/SocialLink";
import "./Footer.scss"

const socials = [
  {socialLink: "https://www.facebook.com/ericdelmermillen/", faClasses: "fab fa-facebook"},
  {socialLink: "https://twitter.com/EricDelmer", faClasses: "fab fa-twitter"},
  {socialLink: "https://www.instagram.com/ericdelmermillen/", faClasses: "fab fa-instagram"},
  {socialLink: "https://www.linkedin.com/in/eric-delmer-millen/", faClasses: "fab fa-linkedin"},
  {socialLink: "https://www.youtube.com/@EricMillen", faClasses: "fab fa-youtube"},
  {socialLink: "https://github.com/ericdelmermillen", faClasses: "fab fa-github"}
];


const Footer = () => {
  return (
    <>
      <footer className="footer bg-dark">
        <p className="footer__copyright text-light">
          Copyright &copy; {new Date().getFullYear()} | Design By StyleShout
        </p>
        <div className="footer__socials hstack gap-3 d-flex">

          {socials.map((social, idx) => 
            <SocialLink 
              key={idx}
              socialLink={social.socialLink}
              faClasses={social.faClasses}
            />
          )}

				</div>
      </footer>
      
    </>
  )};

export default Footer;