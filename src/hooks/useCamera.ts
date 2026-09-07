import { useState, useEffect, useRef, useCallback } from 'react';

export interface CameraState {
  isActive: boolean;
  isLoading: boolean;
  error: string | null;
  stream: MediaStream | null;
}

export function useCamera(autoStart: boolean = false) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }
    setStream(null);
    setIsActive(false);
    setIsLoading(false);
    setError(null);
  }, []);

  const startCamera = useCallback(async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Trình duyệt của bạn không hỗ trợ truy cập camera.');
      setIsActive(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Stop any existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
        audio: false
      });

      streamRef.current = mediaStream;
      setStream(mediaStream);
      setIsActive(true);
      setIsLoading(false);
    } catch (err: unknown) {
      setIsLoading(false);
      setIsActive(false);
      const e = err as { name?: string; message?: string };
      if (e.name === 'NotAllowedError' || e.name === 'PermissionDeniedError') {
        setError('Không thể truy cập camera. Hãy cấp quyền camera trên trình duyệt để sử dụng.');
      } else if (e.name === 'NotFoundError' || e.name === 'DevicesNotFoundError') {
        setError('Không tìm thấy thiết bị camera trên máy tính của bạn.');
      } else if (e.name === 'NotReadableError' || e.name === 'TrackStartError') {
        setError('Camera đang bị ứng dụng khác sử dụng (Zoom, Teams, v.v.).');
      } else {
        setError('Lỗi kết nối camera: ' + (e.message || 'Vui lòng kiểm tra lại thiết bị.'));
      }
    }
  }, []);

  const toggleCamera = useCallback(() => {
    if (isActive) {
      stopCamera();
    } else {
      startCamera();
    }
  }, [isActive, startCamera, stopCamera]);

  useEffect(() => {
    if (autoStart) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [autoStart, startCamera, stopCamera]);

  return {
    isActive,
    isLoading,
    error,
    stream,
    startCamera,
    stopCamera,
    toggleCamera
  };
}
