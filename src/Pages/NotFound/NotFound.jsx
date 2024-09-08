import { useEffect } from "react";
import { scrollToTop } from "../../../utils/utils";
import "./NotFound.scss";

const NotFound = ({ children }) => {

  // scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, []);
  
  return (
    <>
      <div className="notFound">
        <div className="notFound__inner">
          {children}
          <h1 className="notFound__heading">Not Found</h1>
        </div>
      </div>
    </>
  )};

export default NotFound;