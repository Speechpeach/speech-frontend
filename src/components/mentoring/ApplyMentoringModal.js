import React, { useState } from 'react';
import './ApplyMentoringModal.css';
import Calendar from './Calendar';

const ApplyMentoringModal = ({ mentor, onClose }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [formData, setFormData] = useState({
    schedule: '',
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.replace('apply-mentoring__', '')]: value
    }));
  };

  const handleDateSelect = (date) => {
    setFormData(prev => ({
      ...prev,
      schedule: `2025.1.${date}`
    }));
    setShowCalendar(false);
  };

  return (
    <div className="modal-overlay apply-modal" onClick={onClose}>
      <div className="apply-mentoring__container" onClick={e => e.stopPropagation()}>
        <div className="apply-mentoring__header">
          <div className="apply-mentoring-header-left">
            <h1>신청하기</h1>
            <span>1/3</span>
          </div>
          <div className="apply-mentoring-header-right">
            <button type="button" className="apply-mentoring__button-cancel" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.237 5.237a.808.808 0 0 1 1.142 0L12 10.857l5.621-5.62a.808.808 0 1 1 1.142 1.142L13.143 12l5.62 5.621a.807.807 0 1 1-1.142 1.142L12 13.143l-5.621 5.62a.808.808 0 1 1-1.142-1.142L10.857 12l-5.62-5.621a.808.808 0 0 1 0-1.142z" fill="#858A8D"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="apply-mentoring__body">
          <div className="apply-mentoring__input-section">
            <span className="input-section__title">
              스케줄 설정
              <span className="input-section__required-star">*</span>
            </span>
            <div className="schedule-select-wrapper">
              <input
                type="text"
                id="apply-mentoring__schedule"
                className="ac-input"
                placeholder="날짜 및 시간 선택"
                value={formData.schedule}
                onClick={() => setShowCalendar(!showCalendar)}
                readOnly
              />
              {showCalendar && (
                <Calendar
                  selectedDate={formData.schedule}
                  onDateSelect={handleDateSelect}
                />
              )}
            </div>
          </div>

          <div className="apply-mentoring__input-section">
            <span className="input-section__title">
              실명 (반드시 실명을 입력해 주세요)
              <span className="input-section__required-star">*</span>
            </span>
            <input 
              type="text"
              id="apply-mentoring__name"
              className="ac-input"
              placeholder="실명을 입력해주세요."
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="apply-mentoring__input-section">
            <span className="input-section__title">
              연락 가능한 연락처 (수락 시에만 멘토에게 공개됩니다)
              <span className="input-section__required-star">*</span>
            </span>
            <input 
              type="tel"
              id="apply-mentoring__phone"
              className="ac-input"
              placeholder="000-0000-0000"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="apply-mentoring__input-section">
            <span className="input-section__title">
              연락 가능한 이메일 (수락 시에만 멘토에게 공개됩니다)
              <span className="input-section__required-star">*</span>
            </span>
            <input 
              type="email"
              id="apply-mentoring__email"
              className="ac-input"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="apply-mentoring__input-section">
            <span className="input-section__title">
              지식공유자에게 남길 메시지
              <span className="input-section__required-star">*</span>
            </span>
            <textarea
              id="apply-mentoring__message"
              className="ac-input"
              placeholder="멘토링 받고 싶은 내용을 상세하게 남겨주시면 더욱 의미있는 시간을 가질 수 있어요!"
              value={formData.message}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="apply-mentoring__footer">
          <button type="button" className="ac-button is-text" onClick={onClose}>
            이전으로
          </button>
          <button 
            type="button" 
            className="ac-button is-solid is-primary"
            disabled={!formData.name || !formData.phone || !formData.email || !formData.message || !formData.schedule}
          >
            다음으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyMentoringModal; 