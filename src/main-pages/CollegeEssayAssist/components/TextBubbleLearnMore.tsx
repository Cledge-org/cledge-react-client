import React, { useState } from 'react';
import Link from 'next/link';

function TextBubbleWithLink({ text, link }) {
  const [isBubbleVisible, setBubbleVisibility] = useState(true);

  const closeBubble = () => {
    setBubbleVisibility(false);
  };

  const boxStyle = {
    backgroundColor: '#F0EFF6', 
  };

  return (
    <div className={`container py-3 my-2 border rounded d-flex ${isBubbleVisible ? '' : 'd-none'}`} style={boxStyle}>
      <div className="text-container flex-grow-1">
        <p>
          {text}{' '}
          <span className="cl-blue text-decoration-underline">
            <Link href={link} className="text-blue">Learn More</Link>
          </span>
        </p>
      </div>
      <button className="close-button" onClick={closeBubble} style={{ border: "none", background: "transparent" }}>X</button>
    </div>
  );
}

export default TextBubbleWithLink;