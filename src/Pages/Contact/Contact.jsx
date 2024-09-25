import { useEffect } from "react";
import { scrollToTop } from "../../../utils/utils";
// import TypingText from "../../ui/components/TypingText/TypingText";
import ContactForm from "../../components/ContactForm/ContactForm.jsx";
import "./Contact.scss";

const Contact = ({ children }) => {

  // scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, []);
  
  return (
    <>
    <div className="contact">
      <div className="contact__inner">
        {children}
        <div className="contact__content">
          <ContactForm>
            <div className="contact__children">
              <h4 className="contact__heading">
                How can I help?
              </h4>
            </div>
          </ContactForm>
        </div>
      </div>
    </div>
    </>
  )};

export default Contact;