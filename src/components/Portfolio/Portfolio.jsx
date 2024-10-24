import { useEffect, useState } from 'react';
import ProjectCard from '../ProjectCard/ProjectCard.jsx';
// import project1Img from '../../assets/images/project1.jpg';
// import project2Img from '../../assets/images/project2.jpg';
// import project3Img from '../../assets/images/project3.jpg';
// import project4Img from '../../assets/images/project4.jpg';
// import project5Img from '../../assets/images/project5.jpg';
// import project6Img from '../../assets/images/project6.jpg';
import LightBox from '../LightBox/LightBox.jsx';
import toast from 'react-hot-toast';
import './Portfolio.scss';
import { Link } from 'react-router-dom';

const PROJECT_COUNT = 6;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Portfolio = () => {
  const [ showLightBox, setShowLightBox ] = useState(false);
  const [ currentIdx, setCurrentIdx ] = useState(null);
  const [ portfolioSummaries, setPortfolioSummaries ] = useState([]);
  const [ showPortfolioPlaceholders, setShowPortfolioPlaceholders ] = useState(true);

  const handleSetShowLightBoxTrue = () => {
    setShowLightBox(true);
  };

  const handleSetShowLightBoxFalse = () => {
    setTimeout(() => {
      setShowLightBox(false);
    }, 500);
  };

  const handleProjectCardClick = (idx) => {
    handleSetShowLightBoxTrue();
    setCurrentIdx(idx);
  };

  const handleIncrementCurrentIdx = () => {
    // if(currentIdx >= projects.length - 1) {
    if(currentIdx >= portfolioSummaries.length - 1) {
      setCurrentIdx(0);
    } else {
      setCurrentIdx(c => c + 1);
    }
  };

  const handleDecrementCurrentIdx = () => {
    if(currentIdx <= 0) {
      // setCurrentIdx(projects.length - 1);
      setCurrentIdx(portfolioSummaries.length - 1);
    } else {
      setCurrentIdx(c => c - 1);
    }
  };

  const handleSetShowPortfolioPlaceholders = () => {
    // setTimeout(() => {
      setShowPortfolioPlaceholders(false);

    // }, 100000)
  }

  // useEffect to get portfolio summaries for ProjectCards
  // only need at initial mount
  useEffect(() => {

    const getPortfolioSummaries = async () => {
      try {
        const response = await fetch(`${BASE_URL}/projects/portfoliosummary?limit=${PROJECT_COUNT}`);
        const data = await response.json(response);

        if(!response.ok) {
          throw new Error("Error fetching portfolio project sumamries")
        }

        setPortfolioSummaries(data);

      } catch(error) {
        console.log(error);
        toast.error(error.message);
      }
    }

    getPortfolioSummaries();
  }, []);


  return (
    <>
      <section className="portfolio">

        {showLightBox

          ? 
            (
              <LightBox 
                // images={projects}
                images={portfolioSummaries}
                currentIdx={currentIdx}
                setCurrentIdx={setCurrentIdx}
                showLightBox={showLightBox}
                setShowLightBox={setShowLightBox}
                handleSetShowLightBoxFalse={handleSetShowLightBoxFalse}
                handleIncrementCurrentIdx={handleIncrementCurrentIdx}
                handleDecrementCurrentIdx={handleDecrementCurrentIdx}
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

          <div className={`portfolio__projects ${showPortfolioPlaceholders ? "" : "show"}`}>

            {
              // projects.map((project, idx) => 
                portfolioSummaries.map((project, idx) => 
                <ProjectCard 
                  key={project.project_id}
                  // key={project.id}
                  idx={idx}
                  maxIdx={portfolioSummaries.length - 1}
                  imgSrc={project.imgSrc}
                  projectTitle={project.projectTitle}
                  handleSetShowLightBoxTrue={handleSetShowLightBoxTrue}
                  handleProjectCardClick={handleProjectCardClick}
                  handleSetShowPortfolioPlaceholders={handleSetShowPortfolioPlaceholders}
                />
              )
            }

            <div className={`portfolio__project-placeholders ${showPortfolioPlaceholders ? "show" : ""}`}>

              {Array.from({ length: PROJECT_COUNT}).map((placeHolder, idx) => (
                <div 
                  key={idx}
                  className='portfolio__project-placeholder'
                >
                </div>
                ))
              }

            </div>
          </div>

          <Link
            className="portfolio__button"
            to="/projects"
          >
            More Projects
          </Link>

        </div>
      </section>  
      
    </>
  )};

export default Portfolio;