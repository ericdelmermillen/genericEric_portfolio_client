import { jwtDecode } from "jwt-decode";

// use for setting up drag and drop functionality since firefox has issues with on drag (use onTouchStart)
const checkIfIsFirefox = () => {
  return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password) =>{
  return password.trim().length >= 8;
};


// should only return true or false
// use react query here
const checkTokenExpiration = async () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
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
            localStorage.setItem('token', newToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            return true;
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            return false;
          }
        } else {
          localStorage.removeItem('token');
          toast.error('Token expired. Logging you out...');
          return true;
        }
      } else {
        return false;
      }
    } catch(error) {
      console.log('Error decoding token:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      navigate('/');
      toast.error('Token expired. Logging you out...');
      return true;
    }
  } else {
    localStorage.removeItem('refreshToken');
    return false; 
  }
};


export {
  checkIfIsFirefox,
  scrollToTop,
  isValidEmail,
  isValidPassword,
  checkTokenExpiration
};