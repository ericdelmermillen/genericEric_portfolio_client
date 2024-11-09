import { 
  createContext, 
  useContext, 
  useReducer, 
  useEffect, 
  useState
} from "react";

const LightBoxContext = createContext();


const LightBoxContextProvider = ( { children }) => {
  const [ showLightBox, setShowLightBox ] = useState(false);
  const [ currentIdx, setCurrentIdx ] = useState(null);



  const handleCardClick = (idx) => {
    setShowLightBox(true);
    setCurrentIdx(idx);
    console.log(idx)
  };


  const handleSetShowLightBoxTrue = () => {
    setShowLightBox(true);
  };


  // images
  // change project_id to img_id
  // project_title to img_alt
  [
    {
      project_id: 1,
      project_title: "",
      display_order: 1,
      img_src: "https://...."
    }
  ]


  [
    {
      img_id: 1,
      img_alt: "",
      img_src: "https://...."
    }
  ]





  const contextValues = {
    showLightBox, 
    setShowLightBox,
    handleSetShowLightBoxTrue,
    currentIdx, 
    setCurrentIdx,
    handleCardClick
  };

  return (
    <LightBoxContext.Provider value={contextValues}>
      { children }
    </LightBoxContext.Provider>
  )
};

const useLightBoxContext = () => {
  return useContext(LightBoxContext);
}

export { LightBoxContextProvider, useLightBoxContext};