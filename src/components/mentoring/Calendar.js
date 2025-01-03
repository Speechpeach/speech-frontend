import React from 'react';
import './Calendar.css';

const Calendar = ({ selectedDate, onDateSelect }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // 달력에 표시할 날짜들 생성
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  // 달력 날짜 배열 생성
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // 예약 가능한 날짜 (토요일, 일요일)
  const isAvailableDate = (date) => {
    if (!date) return false;
    const dayOfWeek = new Date(currentYear, currentMonth, date).getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  return (
    <div className="apply-mentoring__schedule-section">
      <div className="apply-mentoring__calendar">
        <div className="mentoring-calendar">
          <div className="calendar-container">
            <div className="calendar-header">
              <div className="calendar-header__button">
                <button type="button" className="e-change-month" data-type="last">
                  <i className="far fa-chevron-left">◀</i>
                </button>
              </div>
              <div className="calendar-header__title">
                {currentYear}.{currentMonth + 1}
              </div>
              <div className="calendar-header__button">
                <button type="button" className="e-change-month" data-type="next">
                  <i className="far fa-chevron-right">▶</i>
                </button>
              </div>
            </div>
            <div className="calendar-body">
              <div className="calendar-grid">
                {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                  <div key={day} className="calendar-grid__day-name">{day}</div>
                ))}
                {days.map((day, index) => (
                  <div 
                    key={index} 
                    className={`calendar-grid__date ${
                      !day ? '' :
                      isAvailableDate(day) ? 'calendar-grid__date--active calendar-grid__date--available' :
                      'calendar-grid__date--disabled'
                    }`}
                  >
                    {day && (
                      <button
                        type="button"
                        id={`calendar-date-${day}`}
                        className="e-change-date"
                        disabled={!isAvailableDate(day)}
                        data-date={day}
                        data-day={new Date(currentYear, currentMonth, day).getDay()}
                        onClick={() => onDateSelect(day)}
                      >
                        {day}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="calendar-footer">
              <div><div className="can-apply-color"></div><span>신청 가능</span></div>
              <div><div className="cannot-apply-color"></div><span>신청대기 및 마감</span></div>
            </div>
          </div>
        </div>
      </div>
      <div className="apply-mentoring__times">
        <div className="times__kst">*한국 시간 기준입니다.</div>
        <div className="times__container"></div>
      </div>
    </div>
  );
};

export default Calendar; 