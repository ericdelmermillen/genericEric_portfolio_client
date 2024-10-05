import { SiJavascript, SiTypescript, SiExpress, SiAdobe, SiMysql, SiRedux, SiPostman, SiNextdotjs } from "react-icons/si";
import { FaHtml5, FaReact, FaAws } from "react-icons/fa";
import { FaGithub, FaSass } from "react-icons/fa6";
import { IoLogoCss3 } from "react-icons/io5";
import { DiNodejs } from "react-icons/di";
import { PiFigmaLogoFill } from "react-icons/pi";
import Skill from "../Skill/Skill.jsx"
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
  { skillName: "AWS", skillIcon: FaAws },
  { skillName: "Postman", skillIcon: SiPostman },
  { skillName: "Sass", skillIcon: FaSass },
  { skillName: "Adobe", skillIcon: SiAdobe },
  { skillName: "Figma", skillIcon: PiFigmaLogoFill },
];

const Skills = () => {
  return (
    <>
      <div className="skills">
        <div className="skills__info">
          <h3 className="skills__heading">
            Skills
          </h3>
          {/* <p className="skills__lead">
            From crafting seamless user interfaces to building robust back-end systems, these are the technologies that power my journey as a full-stack developer
          </p> */}
          {/* <p className="skills__lead">
            These are the tools and languages I leverage daily to turn ideas into dynamic, scalable, and efficient solutions.
          </p> */}
          {/* <p className="skills__lead">
            A developer is only as good as the tools in their toolbox. Here’s a breakdown of the technologies I use to bring digital visions to life.
          </p> */}
          {/* <p className="skills__lead">
            Mastering the essentials and embracing new frameworks—these are the skills that enable me to stay ahead in a rapidly evolving tech landscape
          </p> */}
          <p className="skills__lead">
            My expertise spans a wide range of technologies. From front-end development to cloud infrastructure, here are the skills I bring to every project.
          </p>
        </div>
        <div className="skills__content">
          
          <ul className="skills__items">

            {skills.map((skill, idx) => (

              <Skill key={idx} skillName={skill.skillName}>
                <skill.skillIcon className='skills__icon'/>
              </Skill>

            ))}

          </ul>
        </div>
      </div>
        
    </>
  )};

export default Skills;