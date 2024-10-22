import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext.jsx";
import { isValidEmail, scrollToTop } from "../../../utils/utils.js";
import toast from "react-hot-toast";
import "./ContactForm.scss";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ContactForm = ({ children }) => {
  const { 
    isLoading, 
    setIsLoading, 
  } = useAppContext();

  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ message, setMessage ] = useState("");

  const [ nameIsValid, setNameIsValid ] = useState(true);
  const [ emailIsValid, setEmailIsValid ] = useState(true);
  const [ messageIsValid, setMessageIsValid ] = useState(true);

  const [ initialFormCheck , setInitialFormCheck ] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isOnContact = location.pathname === "/contact" || location.pathname === "/contact/";

  const handleNameChange = (e) => {
    setName(e.target.value);
    checkNameIsValid();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    checkEmailIsValid();
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    checkMessageIsValid();
  };

  const checkNameIsValid = () => {
    setNameIsValid(name.length >= 2);
  };
  
  const checkEmailIsValid = () => {
    setEmailIsValid(isValidEmail(email));
  };

  const checkMessageIsValid = () => {
    setMessageIsValid(message.length >= 25);
  };

  const clearForm = () => {
    setName("");
    setInitialFormCheck(false);
    setEmail("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInitialFormCheck(true);
    setIsLoading(true);

    checkNameIsValid();
    checkEmailIsValid();
    checkMessageIsValid();
    
    if(name.length === 0) {
      setIsLoading(false);
      return toast.error("Name is required");
    };

    if(email.length === 0) {
      setIsLoading(false);
      return toast.error("Email address is required");
    };

    if(message.length < 25) {
      setIsLoading(false);
      return toast.error("Min message 25 characters");
    };

    try {
      const response = await fetch(`${BASE_URL}/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if(!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Message sent!");
      
      if(location.pathname === "/contact" || location.pathname === "/contact/") {
        navigate("/home");
      }

      clearForm();
      scrollToTop();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
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

              {!nameIsValid && initialFormCheck 
                ? ( 
                    <div className="contactForm__error">
                      Name is too short
                    </div>
                  )

                : null
              }

            </div>

            <div className="contactForm__field">
              <input
                type="email"
                className="contactForm__input"
                name="email"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => handleEmailChange(e)}
                onBlur={handleEmailChange}
              />

              {!emailIsValid && initialFormCheck 
                ? ( 
                    <div className="contactForm__error">
                      Invalid Email
                    </div>
                  )

                : null
              }
              
            </div>
            <div className="contactForm__field">
              <textarea
                className="contactForm__input contactForm__input--message"
                name="message"
                placeholder="MESSAGE"
                value={message}
                onChange={(e) => handleMessageChange(e)}
              ></textarea>

              {!messageIsValid && initialFormCheck 
                ? ( 
                    <div className="contactForm__error">
                      Message is too short
                    </div>
                  )

                : null
              }
              
            </div>
            <div className="contactForm__submit">
              <button
                type="submit"
                className="contactForm__button"
                disabled={isLoading}
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