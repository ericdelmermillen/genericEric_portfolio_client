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
  };




  const contextValues = {
    showLightBox, 
    setShowLightBox,
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