import { useState } from "react";
import { useAppContext } from "../../contexts/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import { isValidEmail, isValidPassword } from "../../../utils/utils.js";
import { toast } from 'react-hot-toast'; 
import Hide from "../../assets/svgs/Hide.jsx";
import Show from "../../assets/svgs/Show.jsx";
import "./LoginForm.scss";

const isSafari = navigator.userAgent.toLowerCase().includes("safari") &&
  (!navigator.userAgent.toLowerCase().includes("chrome") || !navigator.userAgent.toLowerCase().includes("mozilla"));

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const LoginForm = ({ children }) => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ showPassword, setShowPassword ] = useState(false);
  const [ initialFormCheck, setInitialFormCheck ] = useState(false);
  const [ emailIsValid, setEmailIsValid ] = useState(true);
  const [ passwordIsValid, setPasswordIsValid ] = useState(true);

  const { 
    isLoading, 
    setIsLoading, 
    loginUser 
  } = useAppContext();

  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(c => !c);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    checkEmailIsValid();
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    checkPasswordIsValid();
  };
  
  const checkEmailIsValid = () => {
    setEmailIsValid(isValidEmail(email));
  };

  const checkPasswordIsValid = () => {
    setPasswordIsValid(isValidPassword(password));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setInitialFormCheck(true);
    checkEmailIsValid();
    checkPasswordIsValid();

    if(email.length === 0) {
      setIsLoading(false);
      return toast.error("Email address is required");
    };
    
    if(password.length === 0) {
      setIsLoading(false);
      return toast.error("Password is required");
    };

    if(!isValidEmail(email) || !isValidPassword(password)) {
      setIsLoading(false);
      return toast.error("Email and/or Password is invalid");
    };

    try {
      const response = await fetch(`${BASE_URL}/auth/loginuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if(!response.ok) {

        if(response.status === 401) {
          return toast.error("Incorrect email or password");
        } else {
          throw new Error("Error logging you in");
        }
      }

      const { message, token, refreshToken} = await response.json();

      loginUser({ token, refreshToken });
      navigate("/");

      return toast.success(message);
          
      } catch(error) {
        console.log(error)
        return toast.error(error.message)
      } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="loginForm">
        <div className="loginForm__inner">

          <div className="loginForm__header">
            <h4 className="loginForm__heading">Login</h4>
          </div>

          <form
            name="loginForm"
            className="loginForm__form"
            onSubmit={handleSubmit}
          >

            {children}

            <div className="loginForm__field">
              <input
                type="email"
                className="loginForm__input"
                name="email"
                placeholder="EMAIL"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailChange}
              />

              {!emailIsValid && initialFormCheck 
                ? (
                    <div className="loginForm__error">
                      Invalid Email
                    </div>
                  )

                : null}

            </div>

            <div className="loginForm__field loginForm__field--password">
              <input
                type={showPassword ? "text" : "password"}
                className="loginForm__input"
                name="password"
                placeholder="PASSWORD"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordChange}
              />

              <div
                className={`passwordInput__icon ${isSafari ? "hide" : ""}`}
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword
                  ? <Hide className="passwordInput__icon--hide" />
                  : <Show className="passwordInput__icon--show" />
                }
              </div>
              
              {!passwordIsValid && initialFormCheck 
                ? ( 
                    <div className="loginForm__error">
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
