import { getFormattedDate } from '../../../utils/utils.js';
import DatePicker from 'react-datepicker';
import CalendarIcon from "../../assets/svgs/CalendarIcon.jsx";
import 'react-datepicker/dist/react-datepicker.css';
import "./ProjectDatePicker.scss";

const ProjectDatePicker = ({ 
  projectDate, 
  setProjectDate,
  iconClassName
}) => {


  const handleChange = (date) => {
    setProjectDate(getFormattedDate(date));
  };


  return (
    <div className='projectDatePicker'>
      <div className="projectDatePicker__inner">
        <DatePicker
          selected={projectDate}
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