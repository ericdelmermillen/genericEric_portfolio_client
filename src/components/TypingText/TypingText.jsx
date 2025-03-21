import { useState, useEffect, useRef, createElement } from 'react';

const TypingText = ({ 
  textToType = 'text to type', 
  typingDelayInterval = 200, 
  classNames, 
  elementType = 'h1'
}) => {
  
  const [ typingText, setTypingText ] = useState('');
  const typingTextRef = useRef('');
  const intervalRef = useRef(null);

  // Clear previous interval if any
  // intervals not automatically cleared by unmounting
  useEffect(() => {
    if(intervalRef.current) {
      clearInterval(intervalRef.current);
    };

    // Reset typing state: not technically necessary since the ref is redefined on each mounting and we are not updating the textToType while to component is mounted
    typingTextRef.current = '';
    setTypingText('');

    const typing = setInterval(() => {
      const nextLetterIdx = typingTextRef.current.length;
      const nextLetter = textToType[nextLetterIdx];

      if(nextLetter) {
        typingTextRef.current += nextLetter;
        setTypingText(typingTextRef.current);
      } else {
        clearInterval(typing);
      }
    }, typingDelayInterval);

    intervalRef.current = typing;

    return () => clearInterval(typing); 
  }, [textToType, typingDelayInterval]);

  return (
    <>
      {createElement(
        elementType, 
        { className: classNames }, 
        typingText
      )}
    </>
  )};

export default TypingText;