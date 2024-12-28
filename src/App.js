import { useState, useRef, useEffect } from 'react';
import './App.css';
import speechPeach from './images/speechPeach.jpg';

function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_APP_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;


  const loginHandler = () => {
    window.location.href = link;
  }

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('검색어:', searchQuery);
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
          <button className="profile-btn" onClick={toggleDropdown}>
            <i className="fas fa-user"></i>
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <button className="login-btn" onClick={loginHandler}>로그인</button>
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
    </div>
  );
}

export default App;
