import React from 'react';
import './MentorModal.css';

const MentorIntroModal = ({ onClose, onApplyClick }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="mentor-intro-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>멘토 소개</h2>
        
        <div className="intro-content">
          <section className="intro-section">
            <h3>Speech Peach 멘토란?</h3>
            <p>Speech Peach의 멘토는 전문성과 경험을 바탕으로 학습자들의 발음과 발성 교정을 도와주는 전문가입니다. 
            온라인 플랫폼을 통해 1:1 맞춤형 교육을 제공하며, 학습자의 성장을 위해 함께 노력합니다.</p>
          </section>

          <section className="role-section">
            <h3>주요 역할</h3>
            <ul>
              <li>1:1 온라인 발음/발성 교정 수업 진행</li>
              <li>학습자별 맞춤형 커리큘럼 설계</li>
              <li>정기적인 피드백 및 발전 과정 기록</li>
              <li>전문 멘토 커뮤니티 활동 참여</li>
            </ul>
          </section>

          <section className="qualification-section">
            <h3>지원 자격</h3>
            <ul>
              <li>아나운서, 성우, 언어 치료사 등 관련 분야 경력 5년 이상</li>
              <li>발음 및 발성 교정 관련 자격증 보유자</li>
              <li>온라인 화상 수업 진행 가능자</li>
              <li>주 2회 이상 멘토링 진행 가능자</li>
            </ul>
          </section>

          <section className="benefit-section">
            <h3>멘토 혜택</h3>
            <ul>
              <li>멘토링 수익의 80% 지급</li>
              <li>유연한 시간 관리와 자율적인 수업 진행</li>
              <li>정기적인 멘토 교육 및 워크샵 제공</li>
              <li>전문 멘토 커뮤니티 참여 기회</li>
            </ul>
          </section>
        </div>

        <div className="modal-actions">
          <button className="apply-button" onClick={onApplyClick}>
            지원서 작성하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorIntroModal; 