import ProjectCard from '../ProjectCard/ProjectCard.jsx';
import project1Img from '../../assets/images/project1.jpg';
import project2Img from '../../assets/images/project2.jpg';
import project3Img from '../../assets/images/project3.jpg';
import project4Img from '../../assets/images/project4.jpg';
import project5Img from '../../assets/images/project5.jpg';
import project6Img from '../../assets/images/project6.jpg';
import LightBox from '../LightBox/LightBox.jsx';
import './Portfolio.scss';
import { useState } from 'react';

const projects = [
  {id: 1, imgSrc: project1Img, projectTitle: "Cliboard Landing Page"},
  {id: 2, imgSrc: project2Img, projectTitle: "Loop Studios Website"},
  {id: 3, imgSrc: project3Img, projectTitle: "Shortly Website"},
  {id: 4, imgSrc: project4Img, projectTitle: "Flyo Website"},
  {id: 5, imgSrc: project5Img, projectTitle: "Bookmark Website"},
  {id: 6, imgSrc: project6Img, projectTitle: "Grid Layout"},
];


// need lightbox here


const Portfolio = () => {
  const [ showLightBox, setShowLightBox ] = useState(true);

  const toggleShowLightBox = () => {
    setShowLightBox(c => !c);
  };

  return (
    <>
      <section className="portfolio">

      {showLightBox
        ? (
            <LightBox 
            setShowLightBox={setShowLightBox}
              toggleShowLightBox={toggleShowLightBox}
            />
          )
        : null
      }
        
        <div className="portfolio__inner">
          <div className="portfolio__header">
            <h4 className="portfolio__heading">
              PORTFOLIO
            </h4>
            <h2 className="portfolio__sub-heading">
              Check Out My Work
            </h2>
            <p className="portfolio__lead">
              Here is a small smaple of my projects:
            </p>
            
          </div>

          <div className="portfolio__projects">

            {projects.map(project => 
              <ProjectCard 
                key={project.id}
                imgSrc={project.imgSrc}
                projectTitle={project.projectTitle}
              />
            )} 

          </div>

        </div>
      </section>  
      
    </>
  )};

export default Portfolio;