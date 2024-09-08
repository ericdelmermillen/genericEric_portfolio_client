import { useState } from "react";
import "./ContactForm.scss";
import { useLocation } from "react-router-dom";

const ContactForm = ({ children }) => {
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ message, setMessage ] = useState("");

  const location = useLocation();
  const isOnContact = location.pathname === "/contact";


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <>
      <section className="contactForm">
        <div className="contactForm__inner">

          <div className={`contactForm__header ${isOnContact ? "hide" : ""}`}>
            <h4 className="contactForm__heading">
              CONTACT
            </h4>
            <h2 className="contactForm__sub-heading">
              I'd love to hear from you.
            </h2>
            <p className="contactForm__lead">
              If you have any questions or would like to work together, please contact me with the form below.
            </p>
          </div>

          <form 
            name="contactForm"
            className="contactForm__form"
            onSubmit={(e) => handleSubmit(e)}
          >

            {children}
            
            <div className="contactForm__field">
              <input
                type="text"
                className="contactForm__input"
                name="name"
                placeholder="NAME"
                value={name}
                onChange={(e) => handleNameChange(e)}
              />
            </div>

            <div className="contactForm__field">
              <input
                type="email"
                className="contactForm__input"
                name="email"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => handleEmailChange(e)}
              />
            </div>
            <div className="contactForm__field">
              <textarea
                className="contactForm__input contactForm__input--message"
                name="message"
                placeholder="MESSAGE"
                value={message}
                onChange={(e) => handleMessageChange(e)}
              ></textarea>
            </div>
            <div className="contactForm__submit">
              <button
                type="submit"
                className="contactForm__button"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </section>
      
    </>
  )};

export default ContactForm;