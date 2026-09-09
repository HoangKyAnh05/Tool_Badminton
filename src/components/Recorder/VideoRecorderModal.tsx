import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  X, 
  Video, 
  Square, 
  Circle, 
  Pause, 
  Play, 
  Download, 
  RefreshCw, 
  SwitchCamera, 
  Mic, 
  MicOff, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Camera
} from 'lucide-react';

interface VideoRecorderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type RecordState = 'idle' | 'countdown' | 'recording' | 'paused' | 'finished';

export const VideoRecorderModal: React.FC<VideoRecorderModalProps> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playbackRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);

  const [recordState, setRecordState] = useState<RecordState>('idle');
  const [cameraFacing, setCameraFacing] = useState<'user' | 'environment'>('user');
  const [micEnabled, setMicEnabled] = useState<boolean>(true);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(3);
  const [countdownEnabled, setCountdownEnabled] = useState<boolean>(true);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [savedFileName, setSavedFileName] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoadingCamera, setIsLoadingCamera] = useState<boolean>(false);
  const [hasMultipleCameras, setHasMultipleCameras] = useState<boolean>(false);

  // Check camera devices
  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return;
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter((d) => d.kind === 'videoinput');
      setHasMultipleCameras(videoDevices.length > 1);
    }).catch(() => {});
  }, []);

  // Stop camera tracks helper
  const stopStream = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  }, []);

  // Initialize camera stream
  const initCamera = useCallback(async () => {
    if (!isOpen) return;
    setIsLoadingCamera(true);
    setErrorMsg(null);
    stopStream();

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Trình duyệt của bạn không hỗ trợ quay video từ camera.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: cameraFacing,
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 }
        },
        audio: micEnabled
      });

      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsLoadingCamera(false);
    } catch (err: any) {
      setIsLoadingCamera(false);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setErrorMsg('Vui lòng cấp quyền truy cập Camera & Micro trong cài đặt trình duyệt để quay video.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setErrorMsg('Không tìm thấy thiết bị Camera trên thiết bị của bạn.');
      } else {
        setErrorMsg('Lỗi kết nối Camera: ' + (err.message || 'Không thể khởi động camera.'));
      }
    }
  }, [isOpen, cameraFacing, micEnabled, stopStream]);

  // Handle open/close
  useEffect(() => {
    if (isOpen) {
      setRecordState('idle');
      setRecordingSeconds(0);
      setRecordedVideoUrl(null);
      setErrorMsg(null);
      initCamera();
    } else {
      stopStream();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (recordedVideoUrl) URL.revokeObjectURL(recordedVideoUrl);
    }
    return () => {
      stopStream();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isOpen, initCamera]);

  // Clean up recorded url on unmount
  useEffect(() => {
    return () => {
      if (recordedVideoUrl) URL.revokeObjectURL(recordedVideoUrl);
    };
  }, [recordedVideoUrl]);

  // Trigger Automatic Download to Device
  const triggerAutoDownload = (blob: Blob, mimeExtension: string = 'mp4') => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
    const filename = `badminton_video_${dateStr}.${mimeExtension}`;

    setSavedFileName(filename);

    const url = URL.createObjectURL(blob);
    setRecordedVideoUrl(url);

    // Auto download immediately
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Start actual recording after countdown
  const startRecordingNow = () => {
    if (!mediaStreamRef.current) return;
    recordedChunksRef.current = [];

    let mimeType = 'video/mp4';
    let fileExt = 'mp4';

    if (MediaRecorder.isTypeSupported('video/mp4;codecs=avc1')) {
      mimeType = 'video/mp4;codecs=avc1';
      fileExt = 'mp4';
    } else if (MediaRecorder.isTypeSupported('video/mp4')) {
      mimeType = 'video/mp4';
      fileExt = 'mp4';
    } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')) {
      mimeType = 'video/webm;codecs=vp9,opus';
      fileExt = 'webm';
    } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8,opus')) {
      mimeType = 'video/webm;codecs=vp8,opus';
      fileExt = 'webm';
    } else if (MediaRecorder.isTypeSupported('video/webm')) {
      mimeType = 'video/webm';
      fileExt = 'webm';
    } else {
      mimeType = '';
      fileExt = 'mp4';
    }

    try {
      const recorder = new MediaRecorder(mediaStreamRef.current, mimeType ? { mimeType } : undefined);

      recorder.ondataavailable = (e: BlobEvent) => {
        if (e.data && e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const finalMime = recorder.mimeType || 'video/webm';
        const blob = new Blob(recordedChunksRef.current, { type: finalMime });
        if (blob.size > 0) {
          triggerAutoDownload(blob, fileExt);
          setRecordState('finished');
        }
      };

      recorder.start(500); // 500ms chunks
      mediaRecorderRef.current = recorder;
      setRecordState('recording');
      setRecordingSeconds(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.error('Error starting MediaRecorder', err);
      setErrorMsg('Không thể bắt đầu ghi video: ' + (err.message || 'Lỗi thiết bị'));
      setRecordState('idle');
    }
  };

  // Click Start recording button
  const handleStartRecording = () => {
    if (!countdownEnabled) {
      startRecordingNow();
      return;
    }

    setRecordState('countdown');
    setCountdownSeconds(3);

    let count = 3;
    const interval = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdownSeconds(count);
      } else {
        clearInterval(interval);
        startRecordingNow();
      }
    }, 1000);
  };

  // Pause / Resume
  const handleTogglePause = () => {
    if (!mediaRecorderRef.current) return;
    if (recordState === 'recording') {
      mediaRecorderRef.current.pause();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      setRecordState('paused');
    } else if (recordState === 'paused') {
      mediaRecorderRef.current.resume();
      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
      setRecordState('recording');
    }
  };

  // Stop recording and trigger auto save
  const handleStopRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  // Format seconds to hh:mm:ss
  const formatTimer = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    if (h > 0) {
      return `${pad(h)}:${pad(m)}:${pad(s)}`;
    }
    return `${pad(m)}:${pad(s)}`;
  };

  // Switch camera front/back
  const handleToggleCameraFacing = () => {
    if (recordState === 'recording' || recordState === 'paused') return;
    setCameraFacing((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  // Toggle mic
  const handleToggleMic = () => {
    if (recordState === 'recording' || recordState === 'paused') return;
    setMicEnabled((prev) => !prev);
  };

  // Reset to record again
  const handleRecordAgain = () => {
    if (recordedVideoUrl) URL.revokeObjectURL(recordedVideoUrl);
    setRecordedVideoUrl(null);
    setSavedFileName('');
    setRecordState('idle');
    setRecordingSeconds(0);
    initCamera();
  };

  // Re-download file
  const handleReDownload = () => {
    if (!recordedVideoUrl) return;
    const a = document.createElement('a');
    a.href = recordedVideoUrl;
    a.download = savedFileName || 'badminton_video.mp4';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (!isOpen) return null;

  return (
    <div className="video-recorder-backdrop animate-fade-in" onClick={recordState === 'recording' ? undefined : onClose}>
      <div className="video-recorder-modal animate-scale-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="recorder-modal-header">
          <div className="recorder-header-left">
            <div className="recorder-badge-icon">
              <Camera size={22} className="text-cyan" />
            </div>
            <div>
              <h2 className="recorder-modal-title">QUAY VIDEO TỰ LUYỆN CẦU LÔNG</h2>
              <span className="recorder-modal-subtitle">
                {recordState === 'finished' 
                  ? 'Ghi hình hoàn tất • Video đã được tải về máy của bạn' 
                  : 'Ghi lại dáng tập, bộ chân và kỹ thuật thực tế • Tự động lưu về máy khi dừng'}
              </span>
            </div>
          </div>

          <button 
            className="recorder-btn-close" 
            onClick={onClose} 
            title="Đóng cửa sổ"
          >
            <X size={20} />
          </button>
        </div>

        {/* Viewport Area */}
        <div className="recorder-viewport-container">
          {/* Main live camera view */}
          {recordState !== 'finished' && (
            <div className="recorder-camera-wrapper">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className={`recorder-video-element ${cameraFacing === 'user' ? 'mirror-camera' : ''}`}
              />

              {/* Status overlay (Loading / Error) */}
              {isLoadingCamera && (
                <div className="recorder-overlay-message">
                  <RefreshCw size={36} className="animate-spin text-cyan" />
                  <p>Đang kết nối camera của thiết bị...</p>
                </div>
              )}

              {errorMsg && (
                <div className="recorder-overlay-error">
                  <AlertCircle size={40} className="text-danger" />
                  <h4>Không thể khởi động Camera</h4>
                  <p>{errorMsg}</p>
                  <button className="btn-retry-camera" onClick={initCamera}>
                    <RefreshCw size={16} />
                    <span>Thử lại</span>
                  </button>
                </div>
              )}

              {/* Countdown overlay (3, 2, 1) */}
              {recordState === 'countdown' && (
                <div className="recorder-countdown-overlay">
                  <div className="countdown-number animate-pop">{countdownSeconds}</div>
                  <div className="countdown-text">Chuẩn bị vào tư thế sân...</div>
                </div>
              )}

              {/* Live recording indicator */}
              {recordState === 'recording' && (
                <div className="recorder-live-badge recording animate-pulse">
                  <span className="rec-red-dot" />
                  <span className="rec-text">REC</span>
                  <span className="rec-time">{formatTimer(recordingSeconds)}</span>
                </div>
              )}

              {/* Paused indicator */}
              {recordState === 'paused' && (
                <div className="recorder-live-badge paused">
                  <Pause size={14} className="text-amber" />
                  <span className="rec-text">ĐANG TẠM DỪNG</span>
                  <span className="rec-time">{formatTimer(recordingSeconds)}</span>
                </div>
              )}

              {/* Framing guidelines on camera preview */}
              {recordState !== 'countdown' && !errorMsg && !isLoadingCamera && (
                <div className="camera-framing-grid">
                  <div className="framing-corner top-left" />
                  <div className="framing-corner top-right" />
                  <div className="framing-corner bottom-left" />
                  <div className="framing-corner bottom-right" />
                  <div className="framing-center-cross" />
                </div>
              )}
            </div>
          )}

          {/* Finished review screen with auto-download notice */}
          {recordState === 'finished' && recordedVideoUrl && (
            <div className="recorder-finished-view animate-fade-in">
              <div className="auto-download-alert">
                <div className="alert-icon-wrap">
                  <CheckCircle2 size={24} className="text-lime" />
                </div>
                <div className="alert-text-wrap">
                  <span className="alert-title">🎉 ĐÃ TỰ ĐỘNG TẢI VIDEO VỀ MÁY CỦA BẠN!</span>
                  <span className="alert-desc">
                    Tên tệp: <strong>{savedFileName}</strong> (Thời lượng: {formatTimer(recordingSeconds)})
                  </span>
                </div>
              </div>

              <div className="review-video-wrapper">
                <video 
                  ref={playbackRef}
                  src={recordedVideoUrl} 
                  controls 
                  autoPlay 
                  playsInline 
                  className="recorder-playback-element"
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Controls Bar */}
        <div className="recorder-controls-bar">
          {/* IDLE State Controls */}
          {recordState === 'idle' && (
            <div className="recorder-idle-controls">
              <div className="recorder-options-group">
                {/* Switch camera button */}
                <button 
                  className="recorder-tool-btn" 
                  onClick={handleToggleCameraFacing}
                  title={`Đang dùng camera: ${cameraFacing === 'user' ? 'Trước (Selfie)' : 'Sau (Mặt lưng)'}. Bấm để đổi camera.`}
                >
                  <SwitchCamera size={18} />
                  <span>{cameraFacing === 'user' ? 'Cam trước' : 'Cam sau'}</span>
                </button>

                {/* Mic toggle */}
                <button 
                  className={`recorder-tool-btn ${micEnabled ? 'tool-active' : 'tool-muted'}`}
                  onClick={handleToggleMic}
                  title={micEnabled ? 'Âm thanh đang BẬT' : 'Âm thanh đang TẮT'}
                >
                  {micEnabled ? <Mic size={18} /> : <MicOff size={18} />}
                  <span>{micEnabled ? 'Có tiếng' : 'Tắt tiếng'}</span>
                </button>

                {/* Countdown toggle */}
                <button 
                  className={`recorder-tool-btn ${countdownEnabled ? 'tool-active' : ''}`}
                  onClick={() => setCountdownEnabled(!countdownEnabled)}
                  title="Bật/Tắt đếm ngược 3 giây trước khi quay"
                >
                  <Clock size={18} />
                  <span>{countdownEnabled ? 'Đếm 3s: BẬT' : 'Đếm 3s: TẮT'}</span>
                </button>
              </div>

              {/* Main Record Button */}
              <button 
                className="btn-main-record animate-pulse" 
                onClick={handleStartRecording}
                disabled={isLoadingCamera || !!errorMsg}
              >
                <div className="record-red-disc" />
                <span>BẮT ĐẦU QUAY VIDEO</span>
              </button>
            </div>
          )}

          {/* RECORDING / PAUSED State Controls */}
          {(recordState === 'recording' || recordState === 'paused') && (
            <div className="recorder-active-controls">
              <div className="recording-timer-info">
                <span className="live-dot-glow" />
                <span>Thời gian quay: <strong>{formatTimer(recordingSeconds)}</strong></span>
              </div>

              <div className="recording-btns-group">
                <button 
                  className="btn-pause-recording"
                  onClick={handleTogglePause}
                  title={recordState === 'recording' ? 'Tạm dừng quay' : 'Tiếp tục quay'}
                >
                  {recordState === 'recording' ? <Pause size={18} /> : <Play size={18} />}
                  <span>{recordState === 'recording' ? 'TẠM DỪNG' : 'TIẾP TỤC'}</span>
                </button>

                <button 
                  className="btn-stop-recording"
                  onClick={handleStopRecording}
                  title="Dừng quay và tự động lưu video về máy"
                >
                  <Square size={18} fill="#ffffff" />
                  <span>DỪNG & LƯU VỀ MÁY</span>
                </button>
              </div>
            </div>
          )}

          {/* FINISHED State Controls */}
          {recordState === 'finished' && (
            <div className="recorder-finished-controls">
              <button className="btn-finish-action primary" onClick={handleRecordAgain}>
                <RefreshCw size={18} />
                <span>QUAY VIDEO MỚI</span>
              </button>

              <button className="btn-finish-action secondary" onClick={handleReDownload}>
                <Download size={18} />
                <span>TẢI LẠI LẦN NỮA</span>
              </button>

              <button className="btn-finish-action close" onClick={onClose}>
                <X size={18} />
                <span>HOÀN TẤT & ĐÓNG</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
