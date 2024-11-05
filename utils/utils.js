import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// use for setting up drag and drop functionality since firefox has issues with on drag (use onTouchStart)
const checkIfIsFirefox = () => {
  return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
};

// scroll to top function for mounting page and scrolling to top
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const scrollToDivTop = (divID, divTopOffset) => {
  const targetDiv = document.getElementById(divID);
  if(targetDiv) {
    const offsetTop = targetDiv.offsetTop; 
    window.scrollTo({
      top: offsetTop + divTopOffset,
      behavior: "smooth"
    });
  };
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password) =>{
  return password.trim().length >= 8;
};

const setTokens = (token, refreshToken) => {
  if(token) {
    localStorage.setItem('token', token);
  }

  if(refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }
  return true;
};

const removeTokens = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  return true; 
};


// returns true or false
const checkTokenIsValid = async (navigate) => {
  const token = localStorage.getItem('token');

  if(token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if(decodedToken.exp > currentTime) {
        return true;
      } else if(decodedToken.exp < currentTime) {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if(refreshToken) {

          const refreshResponse = await fetch(`${BASE_URL}/auth/refreshtoken`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              refreshToken
            })
          });

          console.log("Token expired: attempting refresh");

          if(refreshResponse.ok) {
            const { newToken, newRefreshToken } = await refreshResponse.json();
            setTokens(newToken, newRefreshToken);
            return true;
          } else {
            navigate("/");
            toast.error("Token expired. Logging you out...");
            removeTokens();
            return false;
          }
        } else {
          removeTokens();
          toast.error('Unable to verify token. Logging you out...');
          return true;
        }
      }
    } catch(error) {
      console.log('Error decoding token:', error);
      removeTokens();
      navigate('/');
      toast.error(error.message);
      return false;
    }
  } else {
    removeTokens();
    return false; 
  };
};

const addClassToDiv = (divID, className) => {
  document.getElementById(divID).classList.add(className);
};

const removeClassFromDiv = (divID, className) => {
  document.getElementById(divID).classList.remove(className);
};

function getMonthYear(dateString) {
  const [ day, month, year ] = dateString.split("-");

  const date = new Date(`${year}-${month}-${day}`);

  const monthName = date.toLocaleString('en-US', { month: 'short' });

  return `${monthName} ${year}`;
}


export {
  checkIfIsFirefox,
  scrollToTop,
  scrollToDivTop,
  isValidEmail,
  isValidPassword,
  setTokens,
  removeTokens,
  checkTokenIsValid,
  addClassToDiv,
  removeClassFromDiv,
  getMonthYear
};