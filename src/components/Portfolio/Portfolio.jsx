import { useEffect, useState } from 'react';
import ProjectCard from '../ProjectCard/ProjectCard.jsx';
import project1Img from '../../assets/images/project1.jpg';
import project2Img from '../../assets/images/project2.jpg';
import project3Img from '../../assets/images/project3.jpg';
import project4Img from '../../assets/images/project4.jpg';
import project5Img from '../../assets/images/project5.jpg';
import project6Img from '../../assets/images/project6.jpg';
import LightBox from '../LightBox/LightBox.jsx';
import './Portfolio.scss';
import toast from 'react-hot-toast';

const projects = [
  {id: 1, imgSrc: project1Img, projectTitle: "Cliboard Landing Page"},
  {id: 2, imgSrc: project2Img, projectTitle: "Loop Studios Website"},
  {id: 3, imgSrc: project3Img, projectTitle: "Shortly Website"},
  {id: 4, imgSrc: project4Img, projectTitle: "Flyo Website"},
  {id: 5, imgSrc: project5Img, projectTitle: "Bookmark Website"},
  {id: 6, imgSrc: project6Img, projectTitle: "Grid Layout"},
];

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Portfolio = () => {
  const [ showLightBox, setShowLightBox ] = useState(false);
  const [ currentIdx, setCurrentIdx ] = useState(null);
  const [ portfolioSummarries, setPortfolioSummarries ] = useState([]);
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
    if(currentIdx >= projects.length - 1) {
      setCurrentIdx(0);
    } else {
      setCurrentIdx(c => c + 1);
    }
  };

  const handleDecrementCurrentIdx = () => {
    if(currentIdx <= 0) {
      setCurrentIdx(projects.length - 1);
    } else {
      setCurrentIdx(c => c - 1);
    }
  };

  // useEffect to get portfolio summaries for ProjectCards
  // only need at initial mount
  useEffect(() => {

    const getPortfolioSummaries = async () => {
      try {
        const response = await fetch(`${BASE_URL}/projects/portfoliosummary`);
        const data = await response.json(response);

        if(!response.ok) {
          throw new Error("Error fetching portfolio project sumamries")
        }

        console.log(data)
        // need to set portfolioSummarries with returned data
        setShowPortfolioPlaceholders(false)

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
                images={projects}
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

          <div className="portfolio__projects">

          {showPortfolioPlaceholders
            ? 
              (
                <h4>Placeholders here</h4>
              )
            :
              (
                projects.map((project, idx) => 
                  <ProjectCard 
                    key={project.id}
                    idx={idx}
                    imgSrc={project.imgSrc}
                    projectTitle={project.projectTitle}
                    handleSetShowLightBoxTrue={handleSetShowLightBoxTrue}
                    handleProjectCardClick={handleProjectCardClick}
                  />
              )
            )
          }

            {/* {projects.map((project, idx) => 
              <ProjectCard 
                key={project.id}
                idx={idx}
                imgSrc={project.imgSrc}
                projectTitle={project.projectTitle}
                handleSetShowLightBoxTrue={handleSetShowLightBoxTrue}
                handleProjectCardClick={handleProjectCardClick}
              />
            )}  */}

          </div>

        </div>
      </section>  
      
    </>
  )};

export default Portfolio;