import { useState, useRef, useEffect } from "react";
import { useAppContext } from "../../contexts/AppContext.jsx";
import { isValidEmail, isValidPassword } from "../../../utils/utils.js";
import { toast } from 'react-hot-toast'; 
import Hide from "../../assets/svgs/Hide.jsx";
import Show from "../../assets/svgs/Show.jsx";
import "./LoginForm.scss";

const isSafari = navigator.userAgent.toLowerCase().includes("safari") &&
  (!navigator.userAgent.toLowerCase().includes("chrome") || !navigator.userAgent.toLowerCase().includes("mozilla"));

const LoginForm = ({ children }) => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ showPassword, setShowPassword ] = useState(false);
  const [ initialFormCheck, setInitialFormCheck ] = useState(false);
  const [ emailIsValid, setEmailIsValid ] = useState(true);
  const [ passwordIsValid, setPasswordIsValid ] = useState(true);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { isLoading, loginUser } = useAppContext();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(c => !c);
  };

  const handleEmailChange = (e) => {
    const emailValue = e ? e.target.value : emailRef.current.value;
    const emailIsValid = isValidEmail(emailValue);

    setEmail(emailValue);
    setEmailIsValid(emailIsValid);

    return emailIsValid;
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e ? e.target.value : passwordRef.current.value;
    const passwordIsValid = isValidPassword(passwordValue);
    
    setPassword(passwordValue);
    setPasswordIsValid(passwordIsValid);

    return passwordIsValid;
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setInitialFormCheck(true);

    if(!handleEmailChange()) {
      toast.error("Invalid email");
      return;
    };

    if(!handlePasswordChange()) {
      toast.error("Invalid password");
      return;
    };

    return loginUser(email, password);
  };

  // useEffect to auto focus the email input
  useEffect(() => {
    if(emailRef.current) {
      emailRef.current.focus();
    };
  }, []);

  return (
    <>
      <section className="loginForm">
        <div className="loginForm__inner">

          <div className="loginForm__header">
            <h4 className="loginForm__heading">
              Login
            </h4>
          </div>

          <form
            name="loginForm"
            className="loginForm__form"
            onSubmit={handleSubmit}
          >

            {children}

            <div className="loginForm__field">

              <label htmlFor="email" className="loginForm__label">
                Email Address
              </label>

              <input
                type="text"
                id="email"
                className="loginForm__input"
                name="email"
                placeholder="EMAIL"
                value={email}
                ref={emailRef}
                onChange={handleEmailChange}
                aria-describedby="emailError"
                onBlur={handleEmailChange}
                aria-invalid={!emailIsValid && initialFormCheck ? "true" : "false"}
              />

              {!emailIsValid && initialFormCheck 

                ? (
                    <div 
                      id="emailError"
                      className="loginForm__error"
                      role="alert"
                    >
                      Invalid Email
                    </div>
                  )

                : null}

            </div>

            <div className="loginForm__field loginForm__field--password">

              <label htmlFor="password" className="loginForm__label">
                Password
              </label>
              
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="loginForm__input"
                name="password"
                placeholder="PASSWORD"
                value={password}
                ref={passwordRef}
                onChange={handlePasswordChange}
                onBlur={handlePasswordChange}
                aria-describedby="passwordError"
                aria-invalid={!passwordIsValid && initialFormCheck ? "true" : "false"}
              />

              <button
                type="button"
                className={`passwordInput__icon ${isSafari ? "hide" : ""}`}
                onClick={handleTogglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword
                  ? <Hide className="passwordInput__icon--hide" />
                  : <Show className="passwordInput__icon--show" />
                }
              </button>
              
              {!passwordIsValid && initialFormCheck 

                ? ( 
                    <div 
                      id="passwordError"
                      className="loginForm__error"
                      role="alert"
                    >
                      Invalid Password
                    </div>
                  )

                : null
              }
              
            </div>

            <div className="loginForm__submit">
              <button 
                type="submit" 
                className="loginForm__button"
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

export default LoginForm;