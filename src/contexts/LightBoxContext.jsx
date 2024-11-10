import { 
  createContext, 
  useContext, 
  useReducer, 
  useEffect, 
  useState
} from "react";

// will need a useEffect that watches the current and prev urls to reset all values when the page changes
const LightBoxContext = createContext();


const LightBoxContextProvider = ( { children }) => {
  const [ showLightBox, setShowLightBox ] = useState(false);
  const [ currentIdx, setCurrentIdx ] = useState(null);
  const [ lightBoxImages, setLightBoxImages ] = useState();


  const handleCardClick = (idx) => {
    setShowLightBox(true);
    setCurrentIdx(idx);
    console.log(idx)
  };


  const handleSetShowLightBoxTrue = () => {
    setShowLightBox(true);
  };


  const handleIncrementCurrentIdx = () => {
    if(currentIdx >= lightBoxImages.length - 1) {
      setCurrentIdx(0);
    } else {
      setCurrentIdx(c => c + 1);
    };
  };

  const handleDecrementCurrentIdx = () => {
    if(currentIdx <= 0) {
      setCurrentIdx(lightBoxImages.length - 1);
    } else {
      setCurrentIdx(c => c - 1);
    };
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
    lightBoxImages, 
    setLightBoxImages,
    currentIdx, 
    setCurrentIdx,
    handleCardClick,
    handleIncrementCurrentIdx,
    handleDecrementCurrentIdx
  };

  return (
    <LightBoxContext.Provider value={contextValues}>
      { children }
    </LightBoxContext.Provider>
  );
};

const useLightBoxContext = () => {
  return useContext(LightBoxContext);
}

export { LightBoxContextProvider, useLightBoxContext};