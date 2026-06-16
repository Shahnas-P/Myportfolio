import React from 'react';
import { ArrowUp } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const userName = import.meta.env.VITE_USER_NAME || 'Alex Dev';

  return (
    <footer className="footer-panel">
      <div className="container footer-container">
        <div className="footer-brand">
          <span className="logo-bracket">&lt;</span>
          <span className="logo-text">{userName.replace(/\s+/g, '')}</span>
          <span className="logo-bracket"> /&gt;</span>
        </div>
        
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} {userName}. All rights reserved. Crafted with React &amp; CSS.
        </p>

        <button 
          className="back-to-top-btn glass" 
          onClick={handleScrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
