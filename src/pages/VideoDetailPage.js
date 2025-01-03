import React from 'react';
import './VideoDetailPage.css';

const VideoDetailPage = ({ match }) => {
  // 실제로는 videoId를 사용하여 API에서 데이터를 가져와야 합니다
  const videoId = match.params.id;
  
  return (
    <div className="video-detail-page">
      <div className="video-detail-container">
        <div className="video-player-section">
          <div className="video-player-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="video-info">
            <h1>뉴스 제목이 여기에 표시됩니다</h1>
            <div className="video-meta">
              <span className="channel">KBS News</span>
              <span className="date">2024.01.15</span>
            </div>
          </div>
        </div>
        
        <div className="script-section">
          <h2>스크립트</h2>
          <div className="script-content">
            <div className="script-line">
              <span className="timestamp">00:00</span>
              <p>앵커: 안녕하십니까, KBS 뉴스입니다.</p>
            </div>
            <div className="script-line">
              <span className="timestamp">00:05</span>
              <p>오늘의 주요 뉴스를 전해드리겠습니다.</p>
            </div>
            {/* 더 많은 스크립트 라인들... */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailPage; 