// src/hooks/useAudioWebSocket.jsx
import { useEffect, useRef } from 'react';

export default function useAudioWebSocket({ onTranscription }) {
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/audio'); // FastAPI 주소
    ws.binaryType = 'arraybuffer';
    wsRef.current = ws;

    ws.onopen = () => console.log('✅ WebSocket 연결됨');
    ws.onmessage = (event) => {
      const result = JSON.parse(event.data);
      onTranscription(result);
    };
    ws.onerror = (e) => console.error('❌ WebSocket 오류', e);
    ws.onclose = () => console.log('🔌 WebSocket 종료');

    return () => ws.close();
  }, [onTranscription]);

  const sendAudio = (audioChunk) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(audioChunk);
    }
  };

  return { sendAudio };
}
