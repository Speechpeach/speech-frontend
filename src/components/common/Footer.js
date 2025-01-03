import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Speech Peach</h3>
          <p>더 나은 의사소통을 위한 솔루션</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">홈</Link></li>
            <li><Link to="/about">소개</Link></li>
            <li><Link to="/services">서비스</Link></li>
            <li><Link to="/contact">문의하기</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul>
            <li><i className="fas fa-phone"></i> 02-123-4567</li>
            <li><i className="fas fa-envelope"></i> info@speechpeach.com</li>
            <li><i className="fas fa-map-marker-alt"></i> 서울특별시 강남구</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Speech Peach. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 