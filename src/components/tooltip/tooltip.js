import React from 'react';
import './tooltip.css';

function Tooltip({ children, tooltipText }) {
  const tipRef = React.createRef(null);
  function handleMouseEnter() {
    tipRef.current.style.display = 'block';
  }
  function handleMouseLeave() {
    tipRef.current.style.display = 'none';
  }
  return (
    <div
      className='tooltip-container'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='tooltip-text' ref={tipRef}>
        {tooltipText}
      </div>
      {children}
    </div>
  );
}

export default Tooltip;
