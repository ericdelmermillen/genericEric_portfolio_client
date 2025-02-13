import { useEffect } from "react";
import { scrollToTop } from "../../../utils/utils.js";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import "./Login.scss";

const Login = ({ children }) => {

  // scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, []);

    // update title of page
    useEffect(() => {
      document.title = "Generic Eric's Admin Login Page";
  }, []);
  
  return (
    <>
    <div className="login">
      <div className="login__inner">
        { children }
        <div className="login__content">
          <LoginForm />
        </div>
      </div>
    </div>
    </>
  )};

export default Login;