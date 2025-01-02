import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 비디오 데이터 배열
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

// 비토 데이터 추가
const mentorData = [
  {
    id: 1,
    name: '김멘토',
    role: '언어치료사',
    description: '10년 경력의 언어치료 전문가',
    imageUrl: 'https://via.placeholder.com/150' // 실제 이미지로 교체 필요
  },
  {
    id: 2,
    name: '이멘토',
    role: '심리상담사',
    description: '아동 심리 전문가',
    imageUrl: 'https://via.placeholder.com/150'
  },
  {
    id: 3,
    name: '박멘토',
    role: '특수교육사',
    description: '특수교육 15년 경력',
    imageUrl: 'https://via.placeholder.com/150'
  },
  {
    id: 4,
    name: '최멘토',
    role: '언어발달전문가',
    description: '언어발달 지도 전문가',
    imageUrl: 'https://via.placeholder.com/150'
  }
];

// 비디오 아이템 컴포넌트
const VideoItem = ({ id, title, thumbnail, channelTitle, publishedAt }) => {
  // 날짜 포맷 변환 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className="video-item">
      <img src={thumbnail} alt={title} className="video-thumbnail" />
      <div className="video-info">
        <span className="channel-title">{channelTitle}</span>
        <span className="publish-date">{formatDate(publishedAt)}</span>
      </div>
    </div>
  );
};

// 멘토 카드 컴포넌트
const MentorCard = ({ name, role, description, imageUrl }) => {
  return (
    <div className="mentor-card">
      <img src={imageUrl} alt={name} className="mentor-image" />
      <h3>{name}</h3>
      <h4>{role}</h4>
      <p>{description}</p>
    </div>
  );
};

// 커스텀 화살표 컴포넌트 추가
const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow next-arrow`} onClick={onClick}>
      <i className="fas fa-chevron-right"></i>
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow prev-arrow`} onClick={onClick}>
      <i className="fas fa-chevron-left"></i>
    </div>
  );
};

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="App">
      <Header />
      
      <main className="main-content">
        <section className="hero-section">
          <h1>환영합니다</h1>
          <p>멋진 웹사이트에 오신 것을 환영합니다</p>
          <button className="cta-button">자세히 보기</button>
        </section>

        <section className="video-section">
          <h2>추천 영상</h2>
          <div className="video-slider-container">
            <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={4}
              slidesToScroll={1}
              autoplay={true}
              autoplaySpeed={3000}
              pauseOnHover={true}
              cssEase="linear"
              nextArrow={<NextArrow />}
              prevArrow={<PrevArrow />}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                }
              ]}
            >
              {videoData.map((video) => (
                <VideoItem
                  key={video.id}
                  id={video.id}
                  title={video.title}
                  thumbnail={video.thumbnail}
                  channelTitle={video.channelTitle}
                  publishedAt={video.publishedAt}
                />
              ))}
            </Slider>
          </div>
        </section>

        <section className="mentor-section">
          <h2>이번달의 멘토</h2>
          <div className="mentor-container">
            {mentorData.map((mentor) => (
              <MentorCard
                key={mentor.id}
                name={mentor.name}
                role={mentor.role}
                description={mentor.description}
                imageUrl={mentor.imageUrl}
              />
            ))}
          </div>
        </section>
      </main>

      {showScrollTop && (
        <button 
          className="scroll-to-top"
          onClick={scrollToTop}
          aria-label="맨 위로 이동"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}

      <Footer />
    </div>
  );
}

export default App;
