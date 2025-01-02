import React from 'react';
import kakao_login_medium_narrow from '../images/kakao_login_medium_narrow.png';
import './LoginPage.css';

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_APP_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

const LoginPage = ({ isOpen, onClose }) => {
  const loginHandler = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="login-container">
          <h2>로그인</h2>
          <img 
            src={kakao_login_medium_narrow} 
            alt="카카오 로그인" 
            className="kakao-login-btn"
            onClick={loginHandler}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 