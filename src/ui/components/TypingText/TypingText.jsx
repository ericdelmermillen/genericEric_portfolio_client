import "./TypingText.scss";
import { useState, useEffect, createElement } from 'react';

const TypingText = ({ 
  textToType = 'text to type', 
  typingDelayInterval = '500',
  classNames, 
  elementType = 'h1', 
}) => {
  const [ typingText, setTypingText ] = useState('');

  useEffect(() => {
    if(typingText.length < textToType.length) {
      const typing = setInterval(() => {
        const nextLetterIdx = typingText.length;
        const nextLetter = textToType[nextLetterIdx]
        setTypingText((c) => c+= nextLetter);
      }, typingDelayInterval)
      return () => clearInterval(typing);
    }
  }, [textToType, typingText]);
  
  return (
    <div>
      {createElement(
        elementType, 
        { className: classNames,}, 
        typingText
      )}
    </div>
  )};

export default TypingText;