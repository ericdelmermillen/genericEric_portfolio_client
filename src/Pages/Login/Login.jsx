import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { scrollToTop } from "../../../utils/utils";
import LoginForm from "../../ui/components/LoginForm/LoginForm";
import "./Login.scss";

const Login = ({ children }) => {
  const { isLoggedIn, loginUser } = useAppContext();

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