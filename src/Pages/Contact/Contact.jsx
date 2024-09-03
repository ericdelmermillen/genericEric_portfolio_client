import { useEffect } from "react";
import { scrollToTop } from "../../../utils/utils";
import "./Contact.scss";

const Contact = () => {

  // scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, []);
  
  return (
    <>
    <div className="contact">
      <h1 className="contact__heading">
        From Contact
      </h1>
    </div>
    </>
  )};

export default Contact;