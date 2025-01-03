import React, { useState } from 'react';
import './MentoringPage.css';
import ApplyMentoringModal from '../components/mentoring/ApplyMentoringModal';

const mentorData = [
  {
    id: 1,
    name: '김아나',
    role: '前 KBS 아나운서',
    experience: '15년',
    rating: 4.9,
    reviewCount: 128,
    specialties: ['발음 교정', '스피치', '발성 훈련'],
    description: '15년간의 방송 경험을 바탕으로 전문적인 발음 교정과 발성 훈련을 제공합니다.',
    imageUrl: 'https://via.placeholder.com/200',
    availability: '월, 수, 금 13:00-18:00',
    education: 'KBS 아나운서 아카데미',
    certifications: ['스피치 지도사 1급', '성우 자격증']
  },
  {
    id: 2,
    name: '이성우',
    role: '前 MBC 아나운서',
    experience: '12년',
    rating: 4.8,
    reviewCount: 100,
    specialties: ['발성 교정', '방송 스피치', '면접 화법'],
    description: '방송 현장에서 쌓은 경험으로 맞춤형 발성 교정과 스피치 훈련을 진행합니다.',
    imageUrl: 'https://via.placeholder.com/200',
    availability: '화, 목 10:00-16:00',
    education: 'MBC 아나운서 스쿨',
    certifications: ['방송 스피치 지도사', '보이스 트레이너']
  },
  {
    id: 3,
    name: '박성아',
    role: '前 SBS 아나운서',
    experience: '10년',
    rating: 4.7,
    reviewCount: 80,
    specialties: ['발음 클리닉', '보이스 트레이닝', '스피치'],
    description: '개인별 음성 특성을 고려한 맞춤형 발성 교정과 발음 클리닉을 제공합니다.',
    imageUrl: 'https://via.placeholder.com/200',
    availability: '월-금 09:00-15:00',
    education: 'SBS 아나운서 아카데미',
    certifications: ['음성 교정사', '스피치 지도사']
  },
  {
    id: 4,
    name: '최보람',
    role: '성우',
    experience: '8년',
    rating: 4.6,
    reviewCount: 60,
    specialties: ['발성 훈련', '더빙', '내레이션'],
    description: '성우로서의 경험을 바탕으로 효과적인 발성 훈련 방법을 전수합니다.',
    imageUrl: 'https://via.placeholder.com/200',
    availability: '월-금 14:00-20:00',
    education: '한국예술종합학교 성우과',
    certifications: ['성우 자격증', '방송 화법 지도사']
  },
  {
    id: 5,
    name: '정화영',
    role: '스피치 트레이너',
    experience: '13년',
    rating: 4.5,
    reviewCount: 100,
    specialties: ['발표 스피치', '면접 화법', '발음 교정'],
    description: '기업체 임직원 대상 스피치 교육 경험이 풍부하며, 체계적인 발음 교정을 제공합니다.',
    imageUrl: 'https://via.placeholder.com/200',
    availability: '화-토 10:00-17:00',
    education: '연세대학교 아나운서학과',
    certifications: ['스피치 지도사 1급', '커뮤니케이션 전문가']
  },
  {
    id: 6,
    name: '한지민',
    role: '보이스 트레이너',
    experience: '11년',
    rating: 4.4,
    reviewCount: 50,
    specialties: ['발성 교정', '음성 클리닉', '호흡법'],
    description: '성악을 전공한 보이스 트레이너로서 과학적인 발성 교정을 제공합니다.',
    imageUrl: 'https://via.placeholder.com/200',
    availability: '월-금 09:00-18:00',
    education: '한국예술종합학교 성악과',
    certifications: ['보이스 트레이너', '발성 지도사']
  }
];

const MentorModal = ({ mentor, onClose }) => {
  const [showApplyModal, setShowApplyModal] = useState(false);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-body">
          <div className="modal-header">
            <img src={mentor.imageUrl} alt={mentor.name} className="modal-image" />
            <div className="modal-title">
              <h2>{mentor.name}</h2>
              <h3>{mentor.role} · 경력 {mentor.experience}</h3>
              <div className="rating-info">
                <div className="stars">
                  {'★'.repeat(Math.floor(mentor.rating))}
                  {mentor.rating % 1 !== 0 && '☆'}
                  {'☆'.repeat(5 - Math.ceil(mentor.rating))}
                </div>
                <span className="rating-text">{mentor.rating} ({mentor.reviewCount}개의 리뷰)</span>
              </div>
              <p className="education">{mentor.education}</p>
            </div>
          </div>
          
          <div className="modal-info">
            <div className="specialties">
              <h4>전문 분야</h4>
              {mentor.specialties.map((specialty, index) => (
                <span key={index} className="specialty-tag">{specialty}</span>
              ))}
            </div>
            
            <div className="certifications">
              <h4>자격증</h4>
              {mentor.certifications.map((cert, index) => (
                <span key={index} className="cert-tag">{cert}</span>
              ))}
            </div>
            
            <div className="description-section">
              <h4>소개</h4>
              <p>{mentor.description}</p>
            </div>
            
            <div className="availability-section">
              <h4>상담 가능 시간</h4>
              <p><i className="far fa-clock"></i> {mentor.availability}</p>
            </div>
          </div>
        </div>
        <div className="modal-button-container">
          <button 
            className="consult-button"
            onClick={(e) => {
              e.stopPropagation();
              setShowApplyModal(true);
            }}
          >
            상담 신청하기
          </button>
        </div>
      </div>
      {showApplyModal && (
        <ApplyMentoringModal
          mentor={mentor}
          onClose={() => setShowApplyModal(false)}
        />
      )}
    </div>
  );
};

const ReviewModal = ({ mentor, onClose }) => {
  const reviews = [
    { id: 1, rating: 5, content: "정말 도움이 많이 되었습니다. 발음이 많이 좋아졌어요!", date: "2024.03.15", author: "김**" },
    { id: 2, rating: 4, content: "전문적인 강의 감사합니다.", date: "2024.03.10", author: "이**" },
    { id: 3, rating: 5, content: "체계적인 커리큘럼이 좋았습니다.", date: "2024.03.05", author: "박**" },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="review-modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="review-modal-header">
          <h2>{mentor.name} 멘토 리뷰</h2>
          <div className="rating-summary">
            <div className="rating-big">
              <span className="rating-number">{mentor.rating}</span>
              <div className="stars">
                {'★'.repeat(Math.floor(mentor.rating))}
                {mentor.rating % 1 !== 0 && '☆'}
                {'☆'.repeat(5 - Math.ceil(mentor.rating))}
              </div>
            </div>
            <span className="review-count">리뷰 {mentor.reviewCount}개</span>
          </div>
        </div>
        <div className="reviews-list">
          {reviews.map(review => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <div className="stars">{'★'.repeat(review.rating)}</div>
                <span className="review-author">{review.author}</span>
                <span className="review-date">{review.date}</span>
              </div>
              <p className="review-content">{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MentorCard = ({ mentor, onClick, onReviewClick }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div className="mentor-card" onClick={onClick}>
      <div className="mentor-image">
        <img src={mentor.imageUrl} alt={mentor.name} />
        <div className="rating-badge" onClick={(e) => {
          e.stopPropagation();
          onReviewClick();
        }}>
          <span className="rating-number">{mentor.rating}</span>
          <span className="rating-star">★</span>
        </div>
        <button 
          className={`like-button ${isLiked ? 'liked' : ''}`} 
          onClick={handleLikeClick}
        >
          {isLiked ? '♥' : '♡'}
        </button>
      </div>
      <div className="mentor-info">
        <h2>{mentor.name}</h2>
        <h3>{mentor.role}</h3>
        <div className="rating-info">
          <div className="stars">
            {'★'.repeat(Math.floor(mentor.rating))}
            {mentor.rating % 1 !== 0 && '☆'}
            {'☆'.repeat(5 - Math.ceil(mentor.rating))}
          </div>
          <span className="rating-text">{mentor.rating} ({mentor.reviewCount}개의 리뷰)</span>
        </div>
        <p className="experience">경력 {mentor.experience}</p>
        <div className="specialties">
          {mentor.specialties.slice(0, 2).map((specialty, index) => (
            <span key={index} className="specialty-tag">{specialty}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const MentoringPage = () => {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showReviews, setShowReviews] = useState(false);

  return (
    <div className="mentoring-page">
      <div className="mentoring-header">
        <h1>멘토링</h1>
        <p>전문 아나운서, 성우와 함께하는 발음·발성 교정</p>
      </div>

      <div className="mentor-filter">
        <select className="filter-select">
          <option value="">전체 분야</option>
          <option value="발음 교정">발음 교정</option>
          <option value="발성 훈련">발성 훈련</option>
          <option value="스피치">스피치</option>
        </select>
        <select className="filter-select">
          <option value="">경력순</option>
          <option value="high">높은 경력순</option>
          <option value="low">낮은 경력순</option>
        </select>
      </div>

      <div className="mentor-grid">
        {mentorData.map(mentor => (
          <MentorCard 
            key={mentor.id} 
            mentor={mentor} 
            onClick={() => setSelectedMentor(mentor)}
            onReviewClick={() => {
              setSelectedMentor(mentor);
              setShowReviews(true);
            }}
          />
        ))}
      </div>

      {selectedMentor && !showReviews && (
        <MentorModal 
          mentor={selectedMentor} 
          onClose={() => setSelectedMentor(null)} 
        />
      )}

      {selectedMentor && showReviews && (
        <ReviewModal 
          mentor={selectedMentor} 
          onClose={() => {
            setSelectedMentor(null);
            setShowReviews(false);
          }} 
        />
      )}
    </div>
  );
};

export default MentoringPage; 