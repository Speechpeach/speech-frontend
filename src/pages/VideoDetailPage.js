import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './VideoDetailPage.css';

const VideoDetailPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('memo');
  const [memo, setMemo] = useState('');
  const [recordings, setRecordings] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  // 임시 스크립트 데이터
  const scriptData = [
    { time: '00:00', text: '앵커: 안녕하십니까, KBS 뉴스입니다.' },
    { time: '00:05', text: '오늘의 주요 뉴스를 전해드리겠습니다.' },
    { time: '00:10', text: '첫 번째 소식입니다. 정부가 오늘 발표한 새로운 정책에 대해 알아보겠습니다.' },
    // ... 더 많은 스크립트 라인
  ];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
        const audioUrl = URL.createObjectURL(blob);
        setRecordings(prev => [...prev, {
          url: audioUrl,
          timestamp: new Date().toLocaleString()
        }]);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('마이크 접근 권한이 필요합니다.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleMemoChange = (e) => {
    setMemo(e.target.value);
  };

  return (
    <div className="video-detail-page">
      <div className="split-container">
        <div className="left-section">
          <div className="video-section">
            <div className="video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="interaction-section">
            <div className="tabs">
              <button 
                className={`tab-button ${activeTab === 'memo' ? 'active' : ''}`}
                onClick={() => setActiveTab('memo')}
              >
                메모
              </button>
              <button 
                className={`tab-button ${activeTab === 'record' ? 'active' : ''}`}
                onClick={() => setActiveTab('record')}
              >
                녹음
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'memo' ? (
                <div className="memo-section">
                  <textarea
                    value={memo}
                    onChange={handleMemoChange}
                    placeholder="영상을 보면서 메모를 작성해보세요..."
                    className="memo-textarea"
                  />
                </div>
              ) : (
                <div className="record-section">
                  <div className="record-controls">
                    {!isRecording ? (
                      <button className="record-button" onClick={startRecording}>
                        녹음 시작
                      </button>
                    ) : (
                      <button className="stop-button" onClick={stopRecording}>
                        녹음 중지
                      </button>
                    )}
                  </div>
                  <div className="recordings-list">
                    {recordings.map((recording, index) => (
                      <div key={index} className="recording-item">
                        <span className="recording-timestamp">{recording.timestamp}</span>
                        <audio src={recording.url} controls className="audio-player" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="right-section">
          <div className="script-section">
            <h2>스크립트</h2>
            <div className="script-content">
              {scriptData.map((line, index) => (
                <div key={index} className="script-line">
                  <span className="timestamp">{line.time}</span>
                  <p>{line.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailPage; 