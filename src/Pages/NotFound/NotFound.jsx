import { useEffect } from "react";
import { scrollToTop } from "../../../utils/utils";
import "./NotFound.scss";

const NotFound = () => {

  // scroll to top on mount
  useEffect(() => {
    scrollToTop();
  }, []);
  
  return (
    <>
      <div className="notFound">
        <h1>Not Found</h1>
      </div>
    </>
  )};

export default NotFound;