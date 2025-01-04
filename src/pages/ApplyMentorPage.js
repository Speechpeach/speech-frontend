import React, { useState, useEffect } from 'react';
import './ApplyMentorPage.css';
import MentorIntroModal from '../components/mentor/MentorIntroModal';
import ApplyMentorModal from '../components/mentor/ApplyMentorModal';

const ApplyMentorPage = () => {
  const [buttonStyle, setButtonStyle] = useState({});
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      const button = document.querySelector('.apply-button-container');
      
      if (footer && button) {
        const footerTop = footer.getBoundingClientRect().top;
        const buttonHeight = button.offsetHeight;
        const windowHeight = window.innerHeight;
        
        if (footerTop < windowHeight) {
          const bottomPosition = windowHeight - footerTop + 20; // 20px margin
          setButtonStyle({ bottom: `${bottomPosition}px` });
        } else {
          setButtonStyle({ bottom: '2rem' });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 위치 설정

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="apply-mentor-page">
      <div className="apply-mentor-header">
        <h1>멘토 지원하기</h1>
        <p>Speech Peach와 함께 발음과 발성 교정을 이끌어갈 멘토를 모집합니다</p>
      </div>

      <div className="mentor-introduction">
        <section className="intro-section">
          <h2>멘토 소개</h2>
          <p>Speech Peach의 멘토는 전문성과 경험을 바탕으로 학습자들의 발음과 발성 교정을 도와주는 역할을 합니다.</p>
        </section>

        <section className="qualification-section">
          <h2>지원 자격</h2>
          <ul>
            <li>아나운서, 성우, 언어 치료사 등 관련 분야 경력 5년 이상</li>
            <li>발음 및 발성 교정 관련 자격증 보유자</li>
            <li>온라인 화상 수업 진행 가능자</li>
            <li>주 2회 이상 멘토링 진행 가능자</li>
          </ul>
        </section>

        <section className="benefit-section">
          <h2>멘토 혜택</h2>
          <ul>
            <li>유연한 시간 관리와 자율적인 수업 진행</li>
            <li>멘토링 수익의 80% 지급</li>
            <li>정기적인 멘토 교육 및 워크샵 제공</li>
            <li>전문 멘토 커뮤니티 참여 기회</li>
          </ul>
        </section>

        <section className="process-section">
          <h2>지원 절차</h2>
          <div className="process-steps">
            <div className="step">
              <span className="step-number">1</span>
              <h3>지원서 작성</h3>
              <p>기본 정보와 경력 사항을 입력해주세요</p>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <h3>서류 심사</h3>
              <p>자격 요건 검토 및 서류 심사를 진행합니다</p>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <h3>인터뷰</h3>
              <p>화상 면접을 통해 멘토링 역량을 확인합니다</p>
            </div>
            <div className="step">
              <span className="step-number">4</span>
              <h3>최종 선발</h3>
              <p>합격자에 한해 멘토 등록을 진행합니다</p>
            </div>
          </div>
        </section>

        <div className="apply-button-container" style={buttonStyle}>
          <button className="apply-form-button" onClick={() => setShowIntroModal(true)}>
            지원서 작성하기
          </button>
        </div>
      </div>
      {showIntroModal && (
        <MentorIntroModal 
          onClose={() => setShowIntroModal(false)}
          onApplyClick={() => {
            setShowIntroModal(false);
            setShowApplyModal(true);
          }}
        />
      )}
      {showApplyModal && (
        <ApplyMentorModal onClose={() => setShowApplyModal(false)} />
      )}
    </div>
  );
};

export default ApplyMentorPage; 