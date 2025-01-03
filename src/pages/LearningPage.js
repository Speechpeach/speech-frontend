import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LearningPage.css';

const videoData = [
    {
      id: 'DMXxwn_ny08',
      title: '견고한 엔비디아-TSMC 동맹…"반대 연합" 등장?',
      thumbnail: 'https://i.ytimg.com/vi/DMXxwn_ny08/mqdefault.jpg',
      publishedAt: '2024-05-01T04:00:08Z',
      channelTitle: 'KBS News'
    },
    {
      id: '_Rs2IPkGqOU',
      title: '75세 이상 운전자 100만 시대…얼마나 위험?',
      thumbnail: 'https://i.ytimg.com/vi/_Rs2IPkGqOU/mqdefault.jpg',
      publishedAt: '2024-05-04T12:44:26Z',
      channelTitle: 'KBS News'
    },
    {
      id: '1c5WKjDq2MQ',
      title: '정치권 향하는 태양광 수사…신영대 의원 사무실 압수수색',
      thumbnail: 'https://i.ytimg.com/vi/1c5WKjDq2MQ/mqdefault.jpg',
      publishedAt: '2024-05-03T01:29:18Z',
      channelTitle: 'KBS News'
    },
    {
      id: 'd8K_o1afrKw',
      title: '엄홍길, 17년 만에 히말라야 미답봉 등정',
      thumbnail: 'https://i.ytimg.com/vi/d8K_o1afrKw/mqdefault.jpg',
      publishedAt: '2024-05-03T22:21:20Z',
      channelTitle: 'KBS News'
    },
    {
      id: 'rBjYE-AMqT4',
      title: '라파 대피 시작, 공격 임박…이스라엘 공습으로 "20여 명 사망"',
      thumbnail: 'https://i.ytimg.com/vi/rBjYE-AMqT4/mqdefault.jpg',
      publishedAt: '2024-05-06T14:18:13Z',
      channelTitle: 'KBS News'
    },
    {
      id: 'z5wSsmntKG4',
      title: '대구 아파트 주차장서 30대 여성 차량에 깔려 숨져',
      thumbnail: 'https://i.ytimg.com/vi/z5wSsmntKG4/mqdefault.jpg',
      publishedAt: '2024-05-01T04:04:17Z',
      channelTitle: 'KBS News'
    },
    {
      id: '111pn7U0vZM',
      title: '연휴 첫날 나들이객으로 북적…도로 곳곳 정체',
      thumbnail: 'https://i.ytimg.com/vi/111pn7U0vZM/mqdefault.jpg',
      publishedAt: '2024-05-04T12:31:43Z',
      channelTitle: 'KBS News'
    },
    {
      id: 'VIDEO_ID_8',
      title: '언어치료사 자격증 제도 개편 예정',
      thumbnail: 'https://via.placeholder.com/320x180',
      publishedAt: '2024-05-01T00:00:00Z',
      channelTitle: 'Speech Peach'
    },
    {
      id: 'VIDEO_ID_9',
      title: '아동 언어발달 최신 연구결과 발표',
      thumbnail: 'https://via.placeholder.com/320x180',
      publishedAt: '2024-05-02T00:00:00Z',
      channelTitle: 'Speech Peach'
    },
    {
      id: 'VIDEO_ID_10',
      title: '해외 언어치료 사례와 시사점',
      thumbnail: 'https://via.placeholder.com/320x180',
      publishedAt: '2024-05-03T00:00:00Z',
      channelTitle: 'Speech Peach'
    }
  ];
  

const VideoCard = ({ video }) => {
  // 날짜 포맷 변환 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <Link to={`/study/video/${video.id}`} style={{ textDecoration: 'none' }}>
      <div className="video-item">
        <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
        <div className="video-info">
          <span className="channel-title">{video.channelTitle}</span>
          <span className="publish-date">{formatDate(video.publishedAt)}</span>
        </div>
        <h3 className="video-title">{video.title}</h3>
      </div>
    </Link>
  );
};

const LearningPage = () => {
  const [filter, setFilter] = useState('all');

  return (
    <div className="learning-page">
      <div className="learning-header">
        <h1>학습하기</h1>
        <p>실제 뉴스 영상으로 발음과 발성을 학습해보세요</p>
      </div>

      <div className="video-filter">
        <select 
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">전체 방송사</option>
          <option value="KBS">KBS</option>
          <option value="MBC">MBC</option>
          <option value="SBS">SBS</option>
          <option value="JTBC">JTBC</option>
        </select>
      </div>

      <div className="video-grid">
        {videoData
          .filter(video => filter === 'all' || video.channelTitle.includes(filter))
          .map(video => (
            <VideoCard
              key={video.id}
              video={video}
            />
          ))}
      </div>
    </div>
  );
};

export default LearningPage; 