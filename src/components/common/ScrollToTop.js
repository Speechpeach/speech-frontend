import React from 'react';
import './ScrollToTop.css';

const ScrollToTop = ({ show }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!show) return null;

  return (
    <button 
      className="scroll-to-top"
      onClick={scrollToTop}
      aria-label="맨 위로 이동"
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
};

export default ScrollToTop; 