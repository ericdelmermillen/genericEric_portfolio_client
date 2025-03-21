import { useState, useEffect } from "react";
import { 
  SiJavascript, 
  SiTypescript, 
  SiExpress, 
  SiAdobe, 
  SiMysql, 
  SiRedux, 
  // SiPostman, 
  SiNextdotjs 
} from "react-icons/si";
import { FaHtml5, FaReact, FaAws } from "react-icons/fa";
import { FaGithub, FaSass } from "react-icons/fa6";
import { IoLogoCss3 } from "react-icons/io5";
import { DiNodejs, DiPostgresql } from "react-icons/di";
import { PiFigmaLogoFill } from "react-icons/pi";
import Skill from "../Skill/Skill.jsx";
import "./Skills.scss";

const skills = [
  { skillName: "HTML 5", skillIcon: FaHtml5 },
  { skillName: "CSS 3", skillIcon: IoLogoCss3 },
  { skillName: "Javascript", skillIcon: SiJavascript },
  { skillName: "Typescript", skillIcon: SiTypescript },
  { skillName: "React", skillIcon: FaReact},
  { skillName: "Redux", skillIcon: SiRedux },
  { skillName: "Next JS", skillIcon: SiNextdotjs },
  { skillName: "Git/Github", skillIcon: FaGithub },
  { skillName: "Node JS", skillIcon: DiNodejs },
  { skillName: "Express", skillIcon: SiExpress },
  { skillName: "MySQL", skillIcon: SiMysql },
  { skillName: "Postgres", skillIcon: DiPostgresql },
  { skillName: "AWS", skillIcon: FaAws },
  // { skillName: "Postman", skillIcon: SiPostman },
  { skillName: "Sass", skillIcon: FaSass },
  { skillName: "Adobe", skillIcon: SiAdobe },
  { skillName: "Figma", skillIcon: PiFigmaLogoFill },
];

const Skills = () => {
  const [ isNarrowWindow, setIsNarrowWindow ] = useState(false);

  const skillsRemainder = isNarrowWindow
  ? skills.length %  3
  : skills.length %  4;

  // useEffect to handle resizing windowWidth
  useEffect(() => {
    const handleWidthResize = () => {
      const isNarrow = window.innerWidth <= 480;
      setIsNarrowWindow(isNarrow);
    };

    handleWidthResize();

    window.addEventListener('resize', handleWidthResize)
    
    return () => {
      window.removeEventListener('resize', handleWidthResize);
    };
  }, []);

  return (
    <>
      <div className="skills">
        <div className="skills__info">
          <h3 className="skills__heading">
            Skills
          </h3>

          <p className="skills__lead">
            These are the tools I leverage to turn ideas into scalable, efficient solutions.
          </p>
  
        </div>
        <div className="skills__content">
          
          <ul className="skills__items">

            {skills.map((skill, idx) => (

              idx < skills.length - skillsRemainder 
                ? (
                    <Skill key={skill.skillName} skillName={skill.skillName}>
                      <skill.skillIcon className='skills__icon'/>
                    </Skill>
                  )

              : null

            ))}

          </ul>
        </div>
      </div>
        
    </>
  )};

export default Skills;