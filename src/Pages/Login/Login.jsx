import { useEffect } from "react";
import { scrollToTop } from "../../../utils/utils";
import LoginForm from "../../ui/components/LoginForm/LoginForm";
import "./Login.scss";

const Login = ({ children }) => {

  // scroll to top on mount
  useEffect(() => {
    scrollToTop();
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