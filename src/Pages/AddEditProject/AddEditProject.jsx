import { useLocation, useParams } from "react-router-dom";
import "./AddEditProject.scss"
import { useEffect } from "react";


const AddEditProject = ({ children }) => {

  const { projectID } = useParams();
  const { pathname} = useLocation();

  const isEditProject = pathname.includes("edit");
  const isAddProject = pathname.includes("add");

  // console.log(isAddProject)

  // fetch existing project on mount useEffect
  useEffect(() => {
    if(isEditProject) { 

      try {

      } catch(error) {
        console.log(error.message)
      }

    }
    
  }, [])

  return (
    <>
    <div className="addEditProject">
      <div className="addEditProject__inner">
        {children}
        <div className="addEditProject__inner__content">
          <h1 className="addEditProject__h1">
            {isAddProject
              ? "Add New Project"
              : `Edit Project #${projectID}`
            }
          </h1>
        </div>

      </div>
    </div>
      
    </>
  )};

export default AddEditProject;