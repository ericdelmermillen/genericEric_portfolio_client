import DatePicker from 'react-datepicker';
import CalendarIcon from "../../assets/svgs/CalendarIcon.jsx";
import 'react-datepicker/dist/react-datepicker.css';
import "./ProjectDatePicker.scss";

const ProjectDatePicker = ({ 
  projectDate, 
  setProjectDate,
  iconClassName,
  rawDate
}) => {

  const handleChange = (date) => {
    setProjectDate(date);
    console.log(date)
  };


  return (
    <div className='projectDatePicker'>
      <div className="projectDatePicker__inner">
        <DatePicker
          selected={rawDate
            ? rawDate
            : projectDate}
          onChange={handleChange}
          className='projectDatePicker__selector'
          dateFormat="MM/dd/yyyy"
          placeholderText={projectDate ? "Select a date" : projectDate}
        />
        <div className="projectDatePicker__icon-container">
          <CalendarIcon 
            className={iconClassName}
          />
        </div>
      </div>
      
    </div>
  )};

export default ProjectDatePicker;