import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-light py-4 mt-auto border-top">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        
        {/* Copyright Section */}
        <p className="copyright mb-2 mb-md-0 text-muted">
          Copyright © 2025 Depi, All rights reserved
        </p>

        {/* Social Icons Section */}
        <div className="social-icons">
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="text-secondary me-3">
            <i className="fa-brands fa-facebook fa-lg"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-secondary me-3">
            <i className="fa-brands fa-twitter-square fa-lg"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-secondary me-3">
            <i className="fa-brands fa-instagram fa-lg"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-secondary">
            <i className="fa-brands fa-linkedin fa-lg"></i>
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;