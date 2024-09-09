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


export {
  checkIfIsFirefox,
  scrollToTop,
  isValidEmail,
  isValidPassword
};