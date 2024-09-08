import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { scrollToTop } from "../../../utils/utils";
import "./Login.scss";
import LoginForm from "../../ui/components/LoginForm/LoginForm";

const Login = ({ children }) => {
  const { isLoggedIn, loginUser } = useAppContext();

  const navigate = useNavigate();

  const handleLogin = () => {
    const email = "ericdelmermillen@gmail.com";
    const password = "12345678";
    loginUser(email, password);
    navigate("/");
  };

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
          {/* </LoginForm> */}
        </div>
      </div>
    </div>
    </>
  )};

export default Login;