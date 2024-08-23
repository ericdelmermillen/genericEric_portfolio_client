import { useState } from "react";
import "./ContactForm.scss";

const ContactForm = () => {
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ message, setMessage ] = useState("");

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
      <section 
        className="contactForm"
      >
        <div className="contactForm__container">
          <div className="">
            <div className="">
              <div className="">
                <h4 className="contactForm__heading">
                  Contact
                </h4>
                <hr className="" />
                <h2 className="">
                  I'd love to hear from you.
                </h2>
                <p className="contactForm__lead lead">
                  If you have any questions or would like to work together, please
                  contact me with the form below.
                </p>
              </div>

              <form 
                name="contactForm"
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className="mb-5">
                  <input
                    type="text"
                    className="contactForm__name"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => handleNameChange(e)}
                  />
                </div>
                <div className="mb-5">
                  <input
                    type="email"
                    className="contactForm__email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => handleEmailChange(e)}
                  />
                </div>
                <div className="mb-5">
                  <textarea
                    className="contactForm__message"
                    name="message"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => handleMessageChange(e)}
                  ></textarea>
                </div>
                <div className="">
                  <button
                    type="submit"
                    className=""
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </section>
      
    </>
  )};

export default ContactForm;