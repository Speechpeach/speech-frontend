import React from 'react';

const Home = () => {
  return (
    <main className="main-content">
      <section className="hero-section">
        <h1>환영합니다</h1>
        <p>멋진 웹사이트에 오신 것을 환영합니다</p>
        <button className="cta-button">자세히 보기</button>
      </section>

      <section className="video-section">
        <h2>추천 영상</h2>
        {/* 비디오 섹션 내용 */}
      </section>

      <section className="mentor-section">
        <h2>이번달의 멘토</h2>
        {/* 멘토 섹션 내용 */}
      </section>
    </main>
  );
};

export default Home; 