import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

/*const DiamondBulletIcon = () => (
  <svg
    className="diamond-bullet"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="url(#skyGradient)"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="skyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00c6ff" />
        <stop offset="100%" stopColor="#0072ff" />
      </linearGradient>
    </defs>
    <path d="M12 2L22 12L12 22L2 12L12 2Z" />
  </svg>
);*/

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-overview">
        <h3 className="footer-heading">Overview</h3>
        <ul className="footer-links">
          <li><HashLink smooth to="/#home">Home</HashLink></li>
          <li><HashLink smooth to="/#about">About</HashLink></li>
          <li><HashLink smooth to="/#films">Films</HashLink></li>
          <li><HashLink smooth to="/#awards">Awards</HashLink></li>
          <li><HashLink smooth to="/#certification">Certification</HashLink></li>
          <li><HashLink smooth to="/#news">News</HashLink></li>
          <li><HashLink smooth to="/#contact">Contact</HashLink></li>
          <li><Link to="/audition">Audition</Link></li>
        </ul>
      </div>

      <div className="footer-left" >
        © {new Date().getFullYear()} Director AVR. All rights reserved.
      </div>
    <div className="footer-right">

</div>

    </footer>
  );
};

export default Footer;
