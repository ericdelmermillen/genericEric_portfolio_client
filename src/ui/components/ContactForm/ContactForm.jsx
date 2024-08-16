import { useState } from "react";
import "./ContactForm.scss";

const ContactForm = () => {
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ message, setMessage ] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value)
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit")
  };

  return (
    <>
    <section className="contactForm contact text-bg-dark bg-gradient py-5">
			<div className="contactForm__container container">
				<div className="row">
					<div className="col-md-8 offset-md-2">
						<div className="text-center mb-5">
							<h4 className="contactForm__heading text-uppercase fw-bold text-primary">Contact</h4>
							<hr className="w-25 mx-auto" />
							<h2 className="mb-4">I'd love to hear from you.</h2>
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
									className="contactForm__name form-control bg-transparent border-top-0 border-start-0 border-end-0 rounded-0 border-muted text-white"
									name="name"
									placeholder="Name"
                  value={name}
                  onChange={(e) => handleNameChange(e)}
								/>
							</div>
							<div className="mb-5">
								<input
									type="email"
									className="contactForm__email form-control bg-transparent border-top-0 border-start-0 border-end-0 rounded-0 border-muted text-white"
									name="email"
									placeholder="Email"
                  value={email}
                  onChange={(e) => handleEmailChange(e)}
								/>
							</div>
							<div className="mb-5">
								<textarea
									className="contactForm__message form-control bg-transparent border-top-0 border-start-0 border-end-0 rounded-0 border-muted text-white"
									name="message"
									placeholder="Message"
                  value={message}
                  onChange={(e) => handleMessageChange(e)}
								></textarea>
							</div>
							<div className="mb-5 d-grid">
								<button
									type="submit"
									className="btn btn-primary"
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