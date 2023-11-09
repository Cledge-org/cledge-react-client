import React, { useState } from 'react';

function TextBubble({ text }) {
  const [isBubbleVisible, setBubbleVisibility] = useState(true);

  const closeBubble = () => {
    setBubbleVisibility(false);
  };

  const boxStyle = {
    backgroundColor: '#F0EFF6', 
  };

  return (
    <div className={`container py-3  border rounded d-flex ${isBubbleVisible ? '' : 'd-none'}`} style={boxStyle}>
        <div className="text-container flex-grow-1">
          <p>{text}</p>
        </div>
        <button className="close-button" onClick={closeBubble} style={{ border: "none", background: "transparent" }}>X</button>   
       </div>
  );
}

export default TextBubble;
