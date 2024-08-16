import ProjectCard from '../ProjectCard/ProjectCard';
import project1Img from '../../../assets/images/project1.jpg';
import project2Img from '../../../assets/images/project2.jpg';
import project3Img from '../../../assets/images/project3.jpg';
import project4Img from '../../../assets/images/project4.jpg';
import project5Img from '../../../assets/images/project5.jpg';
import project6Img from '../../../assets/images/project6.jpg';
import './Portfolio.scss';

const projects = [
  {id: 1, imgSrc: project1Img, projectTitle: "Cliboard Landing Page"},
  {id: 2, imgSrc: project2Img, projectTitle: "Loop Studios Website"},
  {id: 3, imgSrc: project3Img, projectTitle: "Shortly Website"},
  {id: 4, imgSrc: project4Img, projectTitle: "Flyo Website"},
  {id: 5, imgSrc: project5Img, projectTitle: "Bookmark Website"},
  {id: 6, imgSrc: project6Img, projectTitle: "Grid Layout"},
];


const Portfolio = () => {

  return (
    <>
      <section className="portfolio py-5 bg-light">
        <div className="portfolio__container container">
          <div className="text-center mb-5">
            <h4 className="portfolio__heading text-uppercase fw-bold text-primary">
              Portfolio
            </h4>
            <hr className="w-25 mx-auto" />
            <h2 className="mb-4">
              Check Out My Work
            </h2>
            <p className="lead">Here is a small smaple of my projects:</p>
          </div>

          <div className="projects row">

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