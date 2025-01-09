import { useEffect } from 'react';
import { getFormattedDate } from '../../../utils/utils.js';
import DatePicker from 'react-datepicker';
import CalendarIcon from "../../assets/svgs/CalendarIcon.jsx";
import 'react-datepicker/dist/react-datepicker.css';
import "./ProjectDatePicker.scss";

const ProjectDatePicker = ({ 
  projectDate, 
  setProjectDate,
  isAddProject,
  iconClassName
}) => {

  // Convert date in DD-MM-YYYY format to a local Date object
  const convertToLocalDate = (dateString) => {
    const [ day, month, year ] = dateString.split('-').map(Number);
    // Create a new date object with the provided day, month, and year
    const localDate = new Date(year, month - 1, day); // months are 0-based
  
    return localDate;
  };
  
  let parsedDate = projectDate && projectDate.length === 10
    ? convertToLocalDate(projectDate)
    : null;

  const handleChange = (date) => {
    setProjectDate(getFormattedDate(date));
  };


  // useEffect to set initial date for date picker to today's date if addProject
  useEffect(() => {
    if(isAddProject) {
      parsedDate = new Date();
    };
  }, []);

  return (
    <div className='projectDatePicker'>
      <div className="projectDatePicker__inner">
        <DatePicker
          selected={parsedDate} 
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
  );
};

export default ProjectDatePicker;
