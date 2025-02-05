import { 
  createContext, 
  useContext, 
  useState,
  useCallback
} from "react";

const LightBoxContext = createContext();

const LightBoxContextProvider = ( { children }) => {
  const [ showLightBox, setShowLightBox ] = useState(false);
  const [ currentIdx, setCurrentIdx ] = useState(0);
  const [ lightBoxImages, setLightBoxImages ] = useState([]);

  const handleCardClick = useCallback((idx = 0) => {
    if(lightBoxImages.length === 0) {
      return;
    }; 
    
    setShowLightBox(true);
    setCurrentIdx(idx);
  });

  const handleIncrementCurrentIdx = useCallback(() => {
    setCurrentIdx((prevIdx) => (prevIdx + 1) % lightBoxImages.length);
  }, [lightBoxImages.length]);
  
  const handleDecrementCurrentIdx = useCallback(() => {
    setCurrentIdx((prevIdx) => (prevIdx - 1 + lightBoxImages.length) % lightBoxImages.length);
  }, [lightBoxImages.length]);
  
  const contextValues = {
    showLightBox, 
    setShowLightBox,
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
};

export { LightBoxContextProvider, useLightBoxContext};