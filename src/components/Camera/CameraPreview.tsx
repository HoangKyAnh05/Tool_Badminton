import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, Minimize2, Maximize2, AlertCircle, RefreshCw } from 'lucide-react';

interface CameraPreviewProps {
  stream: MediaStream | null;
  isActive: boolean;
  isLoading: boolean;
  error: string | null;
  onToggle: () => void;
  onRetry: () => void;
}

export const CameraPreview: React.FC<CameraPreviewProps> = ({
  stream,
  isActive,
  isLoading,
  error,
  onToggle,
  onRetry
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!isActive && !error && !isLoading) {
    return (
      <button 
        className="camera-quick-toggle-btn"
        onClick={onToggle}
        title="Bật webcam soi dáng di chuyển"
      >
        <Camera size={18} />
        <span>Bật Camera</span>
      </button>
    );
  }

  return (
    <div className={`camera-preview-panel ${isMinimized ? 'is-minimized' : ''}`}>
      <div className="camera-header">
        <div className="camera-title">
          <Camera size={16} />
          <span>Webcam Quan Sát</span>
        </div>
        <div className="camera-actions">
          <button 
            className="cam-icon-btn"
            onClick={() => setIsMinimized(!isMinimized)}
            title={isMinimized ? 'Phóng to' : 'Thu nhỏ'}
          >
            {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
          </button>
          <button 
            className="cam-icon-btn danger"
            onClick={onToggle}
            title="Tắt camera"
          >
            <CameraOff size={14} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="camera-body">
          {isLoading && (
            <div className="camera-loading">
              <RefreshCw size={24} className="spin" />
              <span>Đang kết nối camera...</span>
            </div>
          )}

          {error && (
            <div className="camera-error">
              <AlertCircle size={28} className="error-icon" />
              <p>{error}</p>
              <button className="btn-retry" onClick={onRetry}>
                <RefreshCw size={14} /> Thử lại
              </button>
            </div>
          )}

          {isActive && (
            <div className="video-wrapper">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="mirrored-video"
              />
              <div className="camera-tag">TRỰC TIẾP (SOI DÁNG)</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
