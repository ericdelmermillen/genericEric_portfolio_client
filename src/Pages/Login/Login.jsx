import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { scrollToTop } from "../../../utils/utils";
import "./Login.scss";

const Login = () => {
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
      <h1 className="login__heading">Login</h1>
      <button
        onClick={handleLogin}
      >
        Login
      </button>
      <h2>IsLoggedIn: {isLoggedIn ? "true" : "false"}</h2>
    </div>
    </>
  )};

export default Login;