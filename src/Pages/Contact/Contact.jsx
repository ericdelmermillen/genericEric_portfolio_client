import { useEffect } from "react";
import { scrollToTop } from "../../../utils/utils";
import TypingText from "../../ui/components/TypingText/TypingText";
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
        <TypingText 
          classNames={"contact__heading"}
          textToType = 'Contact Page'
        />
      </div>
    </div>
    </>
  )};

export default Contact;