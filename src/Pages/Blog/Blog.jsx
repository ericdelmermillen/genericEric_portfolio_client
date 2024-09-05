import { useEffect } from "react";
import { scrollToTop } from "../../../utils/utils";
import "./Blog.scss";
import { FaGlobe, FaCode, FaCartShopping } from "react-icons/fa6";

const Blog = () => {

  const mapNum = 100;

  // get documentHeight with useEffect to get after initial render
  // get mapNum by dividing documentHeight by X (?)
  // stagger horizonatal margin of icons by Y rem relative to the module of the idx

  
  // scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, []);


  return (
    <>
      <div className="blog">
        <div className="blog__inner">

          <div className="blog__wallpaper">
            
            {Array.from({length: mapNum}).map((_, idx) => (

              <div key={idx} className="wallpaper__item">

                {idx % 2 === 0
                  ? <FaCode className="wallpaper__icon"/>
                  : idx % 3 === 0
                  ? <FaGlobe className="wallpaper__icon"/>
                  : idx % 5 === 0
                  ? <FaCartShopping className="wallpaper__icon"/>
                  : <FaCode className="wallpaper__icon"/>

                }
              </div>
            ))}
            
          </div>

          <h1 className="blog__heading">
            From Blog
          </h1>
        </div>
      </div>
    </>
  )};

export default Blog;