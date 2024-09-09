import { useState } from "react";
import { useAppContext } from "../../../contexts/AppContext.jsx";
import { useMutation } from "@tanstack/react-query";
import { isValidEmail, isValidPassword } from "../../../../utils/utils.js";
import Hide from "../../../assets/svgs/Hide.jsx";
import Show from "../../../assets/svgs/Show.jsx";
import "./LoginForm.scss";

const isSafari = navigator.userAgent.toLowerCase().includes("safari") &&
  (!navigator.userAgent.toLowerCase().includes("chrome") || !navigator.userAgent.toLowerCase().includes("mozilla"));

const BASE_URL = import.meta.env.VITE_BASE_URL;

const LoginForm = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loginUser } = useAppContext();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(c => !c);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Setup useMutation hook
  const mutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await fetch(`${BASE_URL}/auth/loginuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      return data; // Return data if successful
    },
    retry: 3, // Number of retry attempts on failure
    retryDelay: 1000, // Delay between retries (in milliseconds)
    onSuccess: (data) => {
      // give loginUser the token and regresh token
      loginUser()
      console.log("Login successful:", data);
      // Handle login success (e.g., redirect or store token)
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
      // Optionally display an error message to the user
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call mutate function with email and password

    // handle validation before the mutate call

    mutation.mutate({ email, password });
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
              />
            </div>

            <div className="loginForm__field loginForm__field--email">
              <input
                type={showPassword ? "text" : "password"}
                className="contactForm__input"
                name="password"
                placeholder="PASSWORD"
                value={password}
                onChange={handlePasswordChange}
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
            </div>

            <div className="contactForm__submit">
              <button type="submit" className="contactForm__button">
                {mutation.isLoading ? "Loading..." : "SUBMIT"}
              </button>
            </div>

          </form>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
