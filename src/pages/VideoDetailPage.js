import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './VideoDetailPage.css';

const VideoDetailPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('memo');
  const [memo, setMemo] = useState('');
  const [recordings, setRecordings] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [highlightColor, setHighlightColor] = useState('#fff740');
  const [scriptData, setScriptData] = useState([
    { time: '00:00', text: '앵커: 안녕하십니까, KBS 뉴스입니다.' },
    { time: '00:05', text: '오늘의 주요 뉴스를 전해드리겠습니다.' },
    { time: '00:10', text: '첫 번째 소식입니다. 정부가 오늘 발표한 새로운 정책에 대해 알아보겠습니다.' },
  ]);

  const textareaRefs = useRef({});

  const insertSymbol = (lineIndex, symbol) => {
    const textarea = textareaRefs.current[lineIndex];
    if (!textarea) return;

    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    
    // 선택된 텍스트가 해당 div 내부인지 확인
    if (!textarea.contains(range.commonAncestorContainer)) {
      // 커서가 없는 경우 텍스트 끝에 추가
      const textNode = document.createTextNode(symbol);
      textarea.appendChild(textNode);
    } else {
      // 선택된 위치에 삽입
      const textNode = document.createTextNode(symbol);
      range.insertNode(textNode);
      // 커서를 삽입된 기호 뒤로 이동
      range.setStartAfter(textNode);
      range.setEndAfter(textNode);
    }
    
    const newScriptData = [...scriptData];
    newScriptData[lineIndex] = {
      ...newScriptData[lineIndex],
      text: textarea.innerHTML
    };
    setScriptData(newScriptData);
  };

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

  const removeHighlight = (event, lineIndex) => {
    // mark 태그를 클릭한 경우에만 처리
    if (event.target.tagName.toLowerCase() === 'mark') {
      const mark = event.target;
      const textContent = mark.textContent;
      const textNode = document.createTextNode(textContent);
      mark.parentNode.replaceChild(textNode, mark);
      
      const textarea = textareaRefs.current[lineIndex];
      const newScriptData = [...scriptData];
      newScriptData[lineIndex] = {
        ...newScriptData[lineIndex],
        text: textarea.innerHTML
      };
      setScriptData(newScriptData);
    }
  };

  const handleHighlight = (lineIndex) => {
    const textarea = textareaRefs.current[lineIndex];
    if (!textarea) return;

    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    
    // 선택된 텍스트가 해당 div 내부인지 확인
    if (!textarea.contains(range.commonAncestorContainer)) return;
    
    if (selection.isCollapsed) return; // 텍스트가 선택되지 않은 경우

    try {
      // 선택된 텍스트의 내용을 가져옴
      const selectedText = range.toString();
      
      // 기존 range 제거
      range.deleteContents();
      
      // 새로운 mark 요소 생성
      const span = document.createElement('mark');
      span.style.backgroundColor = highlightColor;
      span.title = '클릭하여 형광펜 지우기';
      span.textContent = selectedText;
      
      // 새로운 요소 삽입
      range.insertNode(span);
    } catch (error) {
      console.error('형광펜 표시 중 오류 발생:', error);
      return;
    }

    const newScriptData = [...scriptData];
    newScriptData[lineIndex] = {
      ...newScriptData[lineIndex],
      text: textarea.innerHTML
    };
    setScriptData(newScriptData);
    
    // 선택 영역 초기화
    selection.removeAllRanges();
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
            <div className="script-tools">
              <div className="tool-group">
                <span className="tool-label">장단음:</span>
                <button onClick={() => insertSymbol(0, "ː")} className="tool-button">ː(장음)</button>
              </div>
              <div className="tool-group">
                <span className="tool-label">끊어읽기:</span>
                <button onClick={() => insertSymbol(0, "/")} className="tool-button">/</button>
              </div>
              <div className="tool-group">
                <span className="tool-label">이어읽기:</span>
                <button onClick={() => insertSymbol(0, "↗")} className="tool-button">↗</button>
              </div>
              <div className="tool-group">
                <span className="tool-label">형광펜:</span>
                <button 
                  className={`highlight-button ${highlightColor === '#fff740' ? 'active' : ''}`}
                  onClick={() => setHighlightColor('#fff740')}
                  style={{ backgroundColor: '#fff740' }}
                ></button>
                <button 
                  className={`highlight-button ${highlightColor === '#96ff8e' ? 'active' : ''}`}
                  onClick={() => setHighlightColor('#96ff8e')}
                  style={{ backgroundColor: '#96ff8e' }}
                ></button>
                <button 
                  className={`highlight-button ${highlightColor === '#ff9696' ? 'active' : ''}`}
                  onClick={() => setHighlightColor('#ff9696')}
                  style={{ backgroundColor: '#ff9696' }}
                ></button>
              </div>
            </div>
            <div className="script-content">
              {scriptData.map((line, index) => (
                <div key={index} className="script-line">
                  <span className="timestamp">{line.time}</span>
                  <div className="script-text-container">
                    <div
                      ref={el => textareaRefs.current[index] = el}
                      className="script-textarea"
                      contentEditable="true"
                      suppressContentEditableWarning={true}
                      onInput={(e) => {
                        const newScriptData = [...scriptData];
                        newScriptData[index] = {
                          ...newScriptData[index],
                          text: e.target.innerHTML
                        };
                        setScriptData(newScriptData);
                      }}
                      onClick={(e) => removeHighlight(e, index)}
                      dangerouslySetInnerHTML={{ __html: line.text }}
                    ></div>
                    <div className="line-tools">
                      <button onClick={() => insertSymbol(index, "ː")} title="장음">ː</button>
                      <button onClick={() => insertSymbol(index, "/")} title="끊어읽기">/</button>
                      <button onClick={() => insertSymbol(index, "↗")} title="이어읽기">↗</button>
                      <button 
                        onClick={() => handleHighlight(index)} 
                        title="형광펜으로 표시"
                        className="highlight-tool-button"
                        style={{ backgroundColor: highlightColor }}
                      >
                        <span className="highlight-icon">✏️</span>
                      </button>
                    </div>
                  </div>
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