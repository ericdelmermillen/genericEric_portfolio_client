import { useEffect } from "react";
import { scrollToTop } from "../../../utils/utils";
import BackButton from "../../components/BackButton/BackButton";
import "./NotFound.scss";

const NotFound = ({ children }) => {

  // scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, []);

  // update title of page
  useEffect(() => {
      document.title = "Eric Millen's Not Found Page";
  }, []);
  
  return (
    <>
      <div className="notFound">
        <BackButton />
        <div className="notFound__inner">
          {children}
          <div className="notFound__text">
            <h1 className="notFound__heading">Error 404</h1>
            <h3 className="notFound__sub-heading">Page Not Found</h3>
          </div>
        </div>
      </div>
    </>
  )};

export default NotFound;