import "./Skill.scss";

const Skill = ({ children, skillName}) => {
  return (
    <>
      <li className='skill__item'>
        {children}
        <span className='skill__skill-name'>{skillName}</span>
      </li>
    </>
  )};

export default Skill;