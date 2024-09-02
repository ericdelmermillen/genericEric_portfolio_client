import { SiJavascript, SiTypescript, SiExpress, SiAdobe, SiMysql, SiRedux, SiPostman, SiNextdotjs } from "react-icons/si";
import { FaHtml5, FaReact, FaAws } from "react-icons/fa";
import { FaGithub, FaSass } from "react-icons/fa6";
import { IoLogoCss3 } from "react-icons/io5";
import { DiNodejs } from "react-icons/di";
import { PiFigmaLogoFill } from "react-icons/pi";
import "./Skills.scss";

const Skills = () => {
  return (
    <>
      <div className="skills">
        <div className="skills__info">
          <h3 className="skills__heading">
            Skills
          </h3>
          <p className="skills__lead">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum molestias est itaque explicabo eos quo.
          </p>
        </div>
        <div className="skills__content">
          
          <ul className="skills__items">

            <li className='skills__item'>
              <span className='skills__skill-name'>HTML 5</span>
              <FaHtml5 className='skills__icon'/>
            </li>
            
            <li className='skills__item'>
            <span className='skills__skill-name'>CSS 3</span>
              <IoLogoCss3 className='skills__icon'/>
            </li>
                        
            <li className='skills__item'>
              <span className='skills__skill-name'>Javascript</span>
              <SiJavascript className='skills__icon'/>
            </li>

            <li className='skills__item'>
              <span className='skills__skill-name'>Typescript</span>
              <SiTypescript className='skills__icon'/>
            </li>

            <li className='skills__item skills__item--small'>
              <span className='skills__skill-name'>React JS</span>
              <FaReact className='skills__icon skills__icon'/>
            </li>

            <li className='skills__item skills__item--small'>
              <span className='skills__skill-name'>Redux</span>
              <SiRedux className='skills__icon skills__icon'/>
            </li>

            <li className='skills__item'>
              <span className='skills__skill-name'>Next JS</span>
              <SiNextdotjs className='skills__icon'/>
            </li>

            <li className='skills__item'>
              <span className='skills__skill-name'>Git/Github</span>
              <FaGithub className='skills__icon'/>
            </li>

            <li className='skills__item skills__item--small'>
              <span className='skills__skill-name'>Node JS</span>
              <DiNodejs className='skills__icon skills__icon--small'/>
            </li>

            <li className='skills__item'>
              <span className='skills__skill-name'>Express JS</span>
              <SiExpress className='skills__icon'/>
            </li>

            <li className='skills__item skills__item--small'>
              <span className='skills__skill-name'>MySQL</span>
              <SiMysql className='skills__icon skills__icon'/>
            </li>

            <li className='skills__item'>
              <span className='skills__skill-name'>AWS</span>
              <FaAws className='skills__icon'/>
            </li>

            <li className='skills__item skills__item--small'>
              <span className='skills__skill-name'>Postman</span>
              <SiPostman className='skills__icon skills__icon'/>
            </li>
                        
            <li className='skills__item'>
              <span className='skills__skill-name'>Sass</span>
              <FaSass className='skills__icon'/>
            </li>

            <li className='skills__item'>
              <span className='skills__skill-name'>Adobe</span>
              <SiAdobe className='skills__icon'/>
            </li>

            <li className='skills__item'>
              <span className='skills__skill-name'>Figma</span>
              <PiFigmaLogoFill className='skills__icon'/>
            </li>

          </ul>

        </div>
      </div>
        
    </>
  )};

export default Skills;