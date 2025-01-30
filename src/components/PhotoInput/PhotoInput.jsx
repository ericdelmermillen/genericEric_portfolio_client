import { useRef, useState } from 'react';
import { checkIfIsFirefox } from '../../../utils/utils.js';
import PhotoPlaceholder from "../../assets/svgs/PhotoPlaceholder.jsx";
import './PhotoInput.scss';

const MIN_LOADING_INTERVAL = import.meta.env.VITE_MIN_LOADING_INTERVAL;
const isFirefox = checkIfIsFirefox();

const PhotoInput = ({ 
  photo, 
  setPhotos, 
  handleImageChange,
  handleInputDragStart = null,
  handleDropInputTarget = null
}) => {

  const [ showImage, setShowImage ] = useState(false);

  const inputNo = photo.photoNo;
  const displayOrder = photo.displayOrder;

  const fileInputRef = useRef(null);

  const handleFileInputChange = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if(file) {
      handleImageChange(e, photo.photoNo);
      setTimeout(() => {
        setShowImage(true);
      }, MIN_LOADING_INTERVAL);
    };
  };

  const handleClearInput = (e) => {
    e.stopPropagation();
    setShowImage(false);
  
    setPhotos(prevPhotos => {
      return prevPhotos.map(photo => {
        if(photo.photoNo === inputNo) {
          return { ...photo, photoPreview: null, photoData: null };
        }
        return photo;
      });
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleImageLoad = () => {
    setShowImage(true);
  };
  
  return (
    <>
      <div 
        className="photoInput"
        draggable={true}
        onClick={showImage 
          ? null
          : handleFileInputChange}
        onDragStart={!isFirefox && handleInputDragStart
          ? () => handleInputDragStart(inputNo)
          : null}
        onMouseDown={isFirefox && handleInputDragStart
          ? () => handleInputDragStart(inputNo)
          : null}
        onDragOver={handleDragOver}
        onDrop={handleDropInputTarget
          ? () => handleDropInputTarget(inputNo, displayOrder)
          : null}
      > 
        <div 
          className={`photoInput__box ${showImage 
            ? "disabled" 
            : ""}`}
          draggable={true}
        >
          <img
            className={`photoInput__image ${showImage 
              ? "inFront" 
              : ""}`}
            src={photo.photoPreview}
            onLoad={handleImageLoad} 
            draggable={true}
          />
          <PhotoPlaceholder
            className={`photoInput__placeholder ${showImage 
              ? "behind" 
              : ""}`}
            strokeClassName="photoInput__placeholderStroke"
          />
          <div
            className={`photoInput__clearButton ${showImage 
              ? "show" 
              : ""}`}
            onClick={handleClearInput}
          >
            <div className="photoInput__clear">
              <div className="photoInput__close-icon"></div>
              <div className="photoInput__close-icon"></div>
            </div>
          </div>
        </div>

        <label 
          htmlFor={`fileInput_${photo.photoNo}`} 
          className="photoInput__fileLabel"
        >
          Choose a photo
        </label>
        <input
          ref={fileInputRef}
          type="file"
          id={`fileInput_${photo.photoNo}`}
          accept="image/jpeg, image/png"
          className="photoInput__fileInput"
          onChange={handleFileChange}
        />
      </div>
    </>
  )};

export default PhotoInput;
