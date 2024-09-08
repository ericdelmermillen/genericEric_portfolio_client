import { useState } from "react";
import "./LoginForm.scss";
import Hide from "../../../assets/svgs/Hide.jsx"
import Show from "../../../assets/svgs/Show.jsx"

const LoginForm = ({ children }) => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ showPassword, setShowPassword ] = useState(false);

  const handleTogglePasswordVisibility = () => {
    console.log("first")
    setShowPassword(c => !c)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <>
      <section className="loginForm">
        <div className="loginForm__inner">

          <div className={`loginForm__header`}>
            <h4 className="loginForm__heading">
              Login
            </h4>
          </div>

          <form 
            name="loginForm"
            className="loginForm__form"
            onSubmit={(e) => handleSubmit(e)}
          >

            {children}
            
            <div className="loginForm__field">
              <input
                type="email"
                className="loginForm__input"
                name="email"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => handleEmailChange(e)}
              />
            </div>

            <div className="loginForm__field loginForm__field--email">
              <input
                type={`${showPassword ? "text" : "password"}`}
                className="contactForm__input"
                name="password"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => handlePasswordChange(e)}
              />

                <div 
                  className="passwordInput__icon"
                  onClick={handleTogglePasswordVisibility}
                >

                  {showPassword 
                    ? <Hide className={'passwordInput__icon--hide'}/>
                    : <Show className={'passwordInput__icon--show'}/>
                  }
                </div>
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

export default LoginForm;