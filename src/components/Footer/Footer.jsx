import SocialLink from "../SocialLink/SocialLink";

const socials = [
  {socialLink: "https://www.facebook.com/ericdelmermillen/", faClasses: "fab fa-facebook"},
  {socialLink: "https://twitter.com/EricDelmer", faClasses: "fab fa-twitter"},
  {socialLink: "https://www.instagram.com/ericdelmermillen/", faClasses: "fab fa-instagram"},
  {socialLink: "https://www.linkedin.com/in/eric-delmer-millen/", faClasses: "fab fa-linkedin"},
  {socialLink: "https://www.youtube.com/@EricMillen", faClasses: "fab fa-youtube"},
  {socialLink: "https://github.com/ericdelmermillen", faClasses: "fab fa-github"},
];


const Footer = () => {
  return (
    <>
      <footer className="d-flex mt-5">
        <p className="flex-grow-1">
          Copyright &copy; {new Date().getFullYear()} | Design By StyleShout
        </p>
        <div className="hstack gap-3">

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