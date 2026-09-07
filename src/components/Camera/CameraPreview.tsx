import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, Minimize2, Maximize2, AlertCircle, RefreshCw, Circle, Square, Download, Play, X, Check } from 'lucide-react';

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
  const playbackVideoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);

  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // Clean up recording timer on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (recordedVideoUrl) URL.revokeObjectURL(recordedVideoUrl);
    };
  }, [recordedVideoUrl]);

  // Start Recording Stream
  const startRecording = () => {
    if (!stream) return;
    try {
      recordedChunksRef.current = [];

      // Determine supported mime type
      let mimeType = 'video/webm;codecs=vp8,opus';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = 'video/mp4';
          if (!MediaRecorder.isTypeSupported(mimeType)) {
            mimeType = '';
          }
        }
      }

      const options = mimeType ? { mimeType } : undefined;
      const recorder = new MediaRecorder(stream, options);

      recorder.ondataavailable = (event: BlobEvent) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const mime = recorder.mimeType || 'video/webm';
        const blob = new Blob(recordedChunksRef.current, { type: mime });
        if (blob.size > 0) {
          const url = URL.createObjectURL(blob);
          setRecordedVideoUrl(url);
          setShowReviewModal(true);
        }
      };

      recorder.start(500); // 500ms chunks
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordingSeconds(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Failed to start MediaRecorder', err);
      alert('Không thể bắt đầu quay video trên trình duyệt này. Vui lòng kiểm tra quyền truy cập camera.');
    }
  };

  // Stop Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setIsRecording(false);
  };

  // Format seconds to mm:ss
  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Download Recorded Video
  const handleDownloadRecorded = () => {
    if (!recordedVideoUrl) return;
    const a = document.createElement('a');
    a.href = recordedVideoUrl;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    a.download = `badminton_training_${timestamp}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!isActive && !error && !isLoading) {
    return (
      <button 
        className="camera-quick-toggle-btn"
        onClick={onToggle}
        title="Bật camera để soi dáng và quay video bài tập"
      >
        <Camera size={18} />
        <span>Bật Camera</span>
      </button>
    );
  }

  return (
    <>
      <div className={`camera-preview-panel ${isMinimized ? 'is-minimized' : ''}`}>
        <div className="camera-header">
          <div className="camera-title">
            <Camera size={16} />
            <span>{isRecording ? `🔴 ĐANG QUAY (${formatTimer(recordingSeconds)})` : 'Camera Tập Luyện'}</span>
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
              onClick={() => {
                if (isRecording) stopRecording();
                onToggle();
              }}
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

                {isRecording && (
                  <div className="recording-status-badge animate-pulse">
                    <span className="rec-dot" />
                    <span>REC {formatTimer(recordingSeconds)}</span>
                  </div>
                )}

                <div className="camera-tag">TRỰC TIẾP</div>
              </div>
            )}

            {/* Video Recording Action Bar */}
            {isActive && (
              <div className="camera-record-bar">
                {!isRecording ? (
                  <button 
                    className="btn-start-record" 
                    onClick={startRecording}
                    title="Bắt đầu quay video lại buổi tập của bạn"
                  >
                    <Circle size={14} fill="#ef4444" color="#ef4444" />
                    <span className="rec-text-full">Quay video bài tập</span>
                    <span className="rec-text-mobile">Quay video</span>
                  </button>
                ) : (
                  <button 
                    className="btn-stop-record animate-pulse" 
                    onClick={stopRecording}
                    title="Dừng quay và xem lại clip"
                  >
                    <Square size={13} fill="#ffffff" color="#ffffff" />
                    <span className="rec-text-full">Dừng & Lưu video ({formatTimer(recordingSeconds)})</span>
                    <span className="rec-text-mobile">Lưu ({formatTimer(recordingSeconds)})</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Review & Download Recorded Clip Modal */}
      {showReviewModal && recordedVideoUrl && (
        <div className="video-modal-backdrop animate-fade-in" onClick={() => setShowReviewModal(false)}>
          <div className="recorded-review-card animate-pop" onClick={(e) => e.stopPropagation()}>
            <div className="review-card-header">
              <div className="review-title">
                <Check size={20} className="text-emerald" />
                <span>Đã ghi hình thành công!</span>
              </div>
              <button className="cam-icon-btn" onClick={() => setShowReviewModal(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="review-video-wrap">
              <video 
                ref={playbackVideoRef}
                src={recordedVideoUrl} 
                controls 
                autoPlay 
                playsInline
                className="review-video-player"
              />
            </div>

            <div className="review-card-actions">
              <button 
                className="btn-download-record"
                onClick={handleDownloadRecorded}
                title="Tải video bài tập này về điện thoại / máy tính"
              >
                <Download size={18} />
                <span>Tải Video Về Máy</span>
              </button>

              <button 
                className="btn-close-review"
                onClick={() => setShowReviewModal(false)}
              >
                Đóng & Tiếp tục tập
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
