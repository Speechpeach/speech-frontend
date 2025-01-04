import React, { useState } from 'react';
import './ApplyMentorModal.css';

const ApplyMentorModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    field: '',
    introduction: '',
    link: '',
    channels: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChannelChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      channels: checked 
        ? [...prev.channels, value]
        : prev.channels.filter(channel => channel !== value)
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="instructor-modal" onClick={e => e.stopPropagation()}>
        <div className="instructor-modal-header">
          <h2>
            감사합니다 <br />
            <span>멘토가 되기 위해서</span> <br />
            아래 정보가 필요해요.
          </h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="instructor-modal-form__body">
            <div className="modal-form-item">
              <label>
                <div className="modal-form-item__label">
                  연락받을 이메일
                  <span className="modal-form-item__label--essential">*</span>
                </div>
                <input
                  className="modal-form-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="자주 사용하는 이메일을 입력해주세요."
                  required
                />
              </label>
            </div>

            <div className="modal-form-item">
              <label>
                <div className="modal-form-item__label">
                  이름
                  <span className="modal-form-item__label--essential">*</span>
                </div>
                <div className="modal-form-item__description">
                  실명을 입력해주세요.
                </div>
                <input
                  className="modal-form-input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="이름을 입력해주세요."
                  required
                />
              </label>
            </div>

            <div className="modal-form-item">
              <label>
                <div className="modal-form-item__label">
                  연락처
                  <span className="modal-form-item__label--essential">*</span>
                </div>
                <input
                  className="modal-form-input"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="000-0000-0000"
                  required
                />
              </label>
            </div>

            <div className="modal-form-item">
              <div className="modal-form-item__label">
                전문 분야
                <span className="modal-form-item__label--essential">*</span>
              </div>
              <div className="modal-form-buttons">
                {['아나운서', '성우', '언어치료사', '발성전문가'].map((field) => (
                  <button
                    key={field}
                    type="button"
                    className={`button-select-el ${formData.field === field ? 'is-selected' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, field }))}
                  >
                    {field}
                  </button>
                ))}
              </div>
            </div>

            <div className="modal-form-item">
              <label>
                <div className="modal-form-item__label">
                  자기 소개
                  <span className="modal-form-item__label--essential">*</span>
                </div>
                <div className="modal-form-item__description">
                  멘토님의 경력과 전문성, 그리고 멘토링에 대한 포부를 작성해주세요.
                </div>
                <textarea
                  className="modal-form-textarea"
                  name="introduction"
                  value={formData.introduction}
                  onChange={handleChange}
                  rows="10"
                  required
                />
              </label>
            </div>

            <div className="modal-form-item">
              <label>
                <div className="modal-form-item__label">포트폴리오 링크</div>
                <input
                  className="modal-form-input"
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="개인 홈페이지나 포트폴리오 링크를 입력해주세요"
                />
              </label>
            </div>

            <div className="modal-form-item">
              <div className="modal-form-item__label">
                유입 경로
                <span className="modal-form-item__label--essential">*</span>
              </div>
              <div className="form-check-group">
                {[
                  { value: 'INTERNET_SEARCH', label: '인터넷 검색' },
                  { value: 'SNS', label: 'SNS' },
                  { value: 'REFERRAL', label: '지인 추천' },
                  { value: 'ADS', label: '광고' }
                ].map(({ value, label }) => (
                  <div key={value} className="form-check">
                    <input
                      type="checkbox"
                      id={value}
                      value={value}
                      checked={formData.channels.includes(value)}
                      onChange={handleChannelChange}
                      className="form-check-input"
                    />
                    <label className="form-check-label" htmlFor={value}>
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="instructor-modal-footer">
            <button
              type="submit"
              className="submit-button"
              disabled={!formData.email || !formData.name || !formData.phone || !formData.field}
            >
              제출
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyMentorModal; 