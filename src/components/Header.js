import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import speechPeach from '../images/speechPeach.jpg';
import './Header.css';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('검색어:', searchQuery);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsDropdownOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <img src={speechPeach} alt="Speech Peach Logo" className="logo-image" />
        </div>
        <ul className="nav-links">
          <li><Link to="/">홈</Link></li>
          <li><Link to="/about">소개</Link></li>
          <li><Link to="/services">서비스</Link></li>
          <li><Link to="/contact">문의하기</Link></li>
        </ul>
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
        <div className="profile-dropdown" ref={dropdownRef}>
          <button className="login-btn" onClick={openLoginModal}>로그인</button>
        </div>
      </nav>
      <LoginPage isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default Header; 