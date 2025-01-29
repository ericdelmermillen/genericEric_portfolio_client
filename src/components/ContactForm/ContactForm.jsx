import { useState, useRef, useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { isValidEmail, scrollToTop } from "../../../utils/utils.js";
import toast from "react-hot-toast";
import "./ContactForm.scss";

const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ContactForm = ({ children }) => {
  const { 
    isLoading, 
    setIsLoading, 
    contactSectionRef,
    contactNameRef
  } = useAppContext();

  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ message, setMessage ] = useState("");

  const [ nameIsValid, setNameIsValid ] = useState(true);
  const [ emailIsValid, setEmailIsValid ] = useState(true);
  const [ messageIsValid, setMessageIsValid ] = useState(true);

  const [ initialFormCheck , setInitialFormCheck ] = useState(false);

  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isOnContact = location.pathname === "/contact" || location.pathname === "/contact/";


  const handleNameChange = (e) => {
    const nameValue = e ? e.target.value : contactNameRef.current.value;
    const isValidLength = nameValue.trim().length >= 2;
  
    setName(nameValue);
    setNameIsValid(isValidLength);
  
    return isValidLength;
  };
  

  const handleEmailChange = (e) => {
    const emailValue = e ? e.target.value : emailRef.current.value;
    const emailIsValid = isValidEmail(emailValue);

    setEmail(emailValue);
    setEmailIsValid(emailIsValid);

    return emailIsValid;
  };


  const handleMessageChange = (e) => {
    const messageValue = e ? e.target.value : messageRef.current.value;
    const isValidLength = messageValue.trim().length >= 25;
  
    setMessage(messageValue);
    setMessageIsValid(isValidLength);
  
    return isValidLength;
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

    let errors = 0;

    if(!handleNameChange()) {
      toast.error("Name is too short");
      errors++;
    };

    if(!handleEmailChange()) {
      toast.error("Email is invalid");
      errors++;
    };

    if(!handleMessageChange()) {
      toast.error("Message too short");
      errors++;
    };

    if(errors) {
      setTimeout(() => {
        setIsLoading(false);
      }, MIN_LOADING_INTERVAL);
      return;
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
        const { errors } = await response.json();
        errors?.forEach(error => toast.error(error))
        throw new Error("Failed to send message");
      };

      toast.success("Message sent!");
      
      if(location.pathname === "/contact" || location.pathname === "/contact/") {
        navigate("/home");
      };

      clearForm();
      scrollToTop();
    } catch (error) {
      console.error(`Error sending message: ${error}`);
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    };
  };
  

  // useEffect for initial laoding spinner
  useEffect(() => {
    if(isOnContact) {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      }, MIN_LOADING_INTERVAL);
    }
  }, [])

  return (
    <>
      <section className="contactForm">
        <div id="contact" className="contactForm__inner" ref={contactSectionRef}>

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
            aria-labelledby="contact-heading"
          >

            {children}
            
            <div className="contactForm__field">

              <label htmlFor="name" className="contactForm__label">
                Name
              </label>

              <input
                type="text"
                id="name" 
                className="contactForm__input"
                name="name"
                placeholder="NAME"
                value={name}
                ref={contactNameRef}
                onChange={(e) => handleNameChange(e)}
                aria-invalid={!nameIsValid}
                aria-describedby="name-error" 
              />

              {!nameIsValid && initialFormCheck 

                ? ( 
                    <div id="name-error" className="contactForm__error" role="alert">
                      Name is too short
                    </div>
                  )

                : null
              }

            </div>

            <div className="contactForm__field">
            <label htmlFor="email" className="contactForm__label">
              Email
            </label>

              <input
                type="text"
                id="email"
                className="contactForm__input"
                name="email"
                placeholder="EMAIL"
                value={email}
                ref={emailRef}
                onChange={(e) => handleEmailChange(e)}
                onBlur={handleEmailChange}
                aria-invalid={!emailIsValid}
                aria-describedby="email-error"
              />

              {!emailIsValid && initialFormCheck 

                ? ( 
                    <div id="email-error" className="contactForm__error" role="alert">
                      Invalid Email
                    </div>
                  )

                : null
              }
              
            </div>
            <div className="contactForm__field">
              <label htmlFor="message" className="contactForm__label">Message</label> 

              <textarea
                id="message" 
                className="contactForm__input contactForm__input--message"
                name="message"
                placeholder="MESSAGE"
                value={message}
                ref={messageRef}
                onChange={(e) => handleMessageChange(e)}
                aria-invalid={!messageIsValid}
                aria-describedby="message-error"
              ></textarea>

              {!messageIsValid && initialFormCheck 
              
                ? ( 
                    <div id="message-error" className="contactForm__error" role="alert">
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
                aria-busy={isLoading}
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