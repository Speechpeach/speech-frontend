import { useState, useRef, useEffect } from 'react';
import './App.css';
import speechPeach from './images/speechPeach.jpg';

function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsLoginModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLoginClick = () => {
    setIsDropdownOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-logo">
          <img src={speechPeach} alt="Speech Peach Logo" className="logo-image" />
        </div>
        <ul className="nav-links">
          <li><a href="#home">홈</a></li>
          <li><a href="#about">소개</a></li>
          <li><a href="#services">서비스</a></li>
          <li><a href="#contact">문의하기</a></li>
        </ul>
        <div className="profile-dropdown" ref={dropdownRef}>
          <button className="profile-btn" onClick={toggleDropdown}>
            <i className="fas fa-user"></i>
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <button className="login-btn" onClick={handleLoginClick}>로그인</button>
            </div>
          )}
        </div>
      </nav>
      
      <main className="main-content">
        <section className="hero-section">
          <h1>환영합니다</h1>
          <p>멋진 웹사이트에 오신 것을 환영합니다</p>
          <button className="cta-button">자세히 보기</button>
        </section>
      </main>

      {isLoginModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef}>
            <h2>로그인</h2>
            <form className="login-form">
              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input type="email" id="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">비밀번호</label>
                <input type="password" id="password" required />
              </div>
              <button type="submit" className="login-submit-btn">로그인</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
