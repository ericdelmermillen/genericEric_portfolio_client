import { useAppContext } from "../../contexts/AppContext.jsx";
import moon from "../../assets/svgs/crescent_moon.svg";
import sun from "../../assets/svgs/sun.svg";
import './ColorModeToggle.scss';

const ColorModeToggle = ({ inputId }) => {
  const { colorMode, toggleColorMode } = useAppContext();
  const isDarkMode = colorMode === "dark";


  return (
    <>
      <div className='colorModeToggle'>
        <input 
          className="colorModeToggle__checkbox" 
          type="checkbox" 
          id={inputId} 
          onChange={toggleColorMode}
          checked={isDarkMode}
        />
        <label 
          className="colorModeToggle__checkbox-label"
          htmlFor={inputId} 
        >
          <img 
            className='colorModeToggle__sun-icon'
            src={sun} 
            alt="Color Mode Light sun icon" />
          <img 
            className='colorModeToggle__moon-icon'
            src={moon} 
            alt="Color Mode Dark sun icon" />
          <span className="colorModeToggle__ball"></span>
        </label>
      </div>
    </>
  )};

export default ColorModeToggle;