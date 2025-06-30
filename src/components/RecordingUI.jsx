// src/components/RecordingUI.jsx
import React, { useEffect, useRef, useState } from 'react';
import useAudioWebSocket from '../hooks/useAudioWebSocket';
import DashboardChartUI from '../pages/DashboardChartPage';
import '../styles/RecordingUI.css';

const RecordingUI = () => {
  const [isRecording, setIsRecording] = useState(true);
  const [showSummary, setShowSummary] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [transcripts, setTranscripts] = useState([]);
  const mediaRecorderRef = useRef(null);

  const { sendAudio } = useAudioWebSocket({
    onTranscription: (result) => {
      setTranscripts((prev) => [...prev, ...result]);
    },
  });

  // 🎤 실제 녹음 처리
  useEffect(() => {
    if (!isRecording) return;

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
          const arrayBuffer = reader.result;
          sendAudio(arrayBuffer);
        };
        reader.readAsArrayBuffer(e.data);
      };

      mediaRecorder.start(1000); // 1초 간격으로 전송
      console.log('🎤 녹음 시작');
    });

    return () => {
      mediaRecorderRef.current?.stop();
      console.log('🛑 녹음 중지');
    };
  }, [isRecording, sendAudio]);

  // 🖨️ 프린트 출력
  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=600,height=400');
    if (printWindow) {
      const content = transcripts
        .map((entry) => `[화자 ${entry.speaker}] ${entry.text}`)
        .join('\n');
      printWindow.document.write(`<pre>${content}</pre>`);
      printWindow.document.close();
      printWindow.print();
    }
  };

  // 🛑 녹음 중지 버튼
  const handleStopRecording = () => {
    setIsRecording(false);
    setShowSummary(true);
  };

  return (
    <div className="recording-wrapper">
      {isRecording && (
        <>
          {/* 상단 아이콘 */}
          <div className="recording-header-icons">
            <span title="녹음 중지" onClick={handleStopRecording}>🛑</span>
            <span title="수정 모드" onClick={() => setIsEditing((prev) => !prev)}>✏️</span>
            <span title="인쇄" onClick={handlePrint}>🖨️</span>
          </div>

          {/* 좌측: 마이크 UI */}
          <div className="recording-left">
            <div className="mic-icon">🎙️</div>
            <div className="dot-loader">
              <span className="dot" style={{ '--i': 1 }}>.</span>
              <span className="dot" style={{ '--i': 2 }}>.</span>
              <span className="dot" style={{ '--i': 3 }}>.</span>
            </div>
            <div className="status-text">녹음 중...</div>
          </div>

          {/* 우측: STT 결과 출력 */}
          <div className="recording-right">
            <h4>음성 텍스트 변환</h4>
            <div className="transcription-box">
              <pre>
                {transcripts.length === 0
                  ? '텍스트 없음'
                  : transcripts.map(
                      (entry, idx) => `[화자 ${entry.speaker}] ${entry.text}\n`
                    )}
              </pre>
            </div>
          </div>
        </>
      )}

      {/* 녹음 종료 후 요약 */}
      {!isRecording && showSummary && (
        <div className="dashboard-summary-wrapper" style={{ marginTop: '30px' }}>
          <DashboardChartUI />
        </div>
      )}
    </div>
  );
};

export default RecordingUI;
