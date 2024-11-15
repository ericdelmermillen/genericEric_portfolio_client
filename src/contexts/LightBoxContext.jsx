import { 
  createContext, 
  useContext, 
  useState
} from "react";

const LightBoxContext = createContext();

const LightBoxContextProvider = ( { children }) => {
  const [ showLightBox, setShowLightBox ] = useState(false);
  const [ currentIdx, setCurrentIdx ] = useState(null);
  const [ lightBoxImages, setLightBoxImages ] = useState([]);

  const handleCardClick = (idx = 0) => {
    setShowLightBox(true);
    setCurrentIdx(idx);
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
};

export { LightBoxContextProvider, useLightBoxContext};