import React, { useState } from 'react';
import { storageService } from '../../services/storage';
import { 
  X, 
  Download, 
  Upload, 
  Copy, 
  Check, 
  FileJson, 
  AlertCircle, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

interface BatchImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged: () => void;
}

export const BatchImportExportModal: React.FC<BatchImportExportModalProps> = ({
  isOpen,
  onClose,
  onDataChanged
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'EXPORT' | 'IMPORT'>('EXPORT');
  const [jsonText, setJsonText] = useState<string>(() => storageService.exportVideoOverrides());
  const [copied, setCopied] = useState<boolean>(false);
  const [importStatus, setImportStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    const blob = new Blob([jsonText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `badminton_videos_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    setImportStatus(null);
    if (!jsonText.trim()) {
      setImportStatus({ success: false, message: 'Vui lòng dán dữ liệu JSON vào ô bên dưới!' });
      return;
    }

    const res = storageService.importVideoOverrides(jsonText);
    if (res.success) {
      setImportStatus({ 
        success: true, 
        message: `Đã nhập thành công ${res.count} video và cấu hình ghi đè!` 
      });
      onDataChanged();
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setImportStatus({ 
        success: false, 
        message: `Lỗi nhập dữ liệu: ${res.error || 'Dữ liệu JSON không đúng cấu trúc'}` 
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setJsonText(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="video-modal-backdrop" onClick={onClose}>
      <div 
        className="batch-modal-card animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="edit-modal-header">
          <div className="header-badge-title">
            <div className="yt-icon-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
              <FileJson size={22} />
            </div>
            <div>
              <h3>Sao Lưu & Đồng Bộ Dữ Liệu Video (JSON)</h3>
              <p className="modal-subtext">Lưu trữ dự phòng danh sách link YouTube hoặc chuyển sang thiết bị khác</p>
            </div>
          </div>
          <button className="theater-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Tabs Switcher */}
        <div className="batch-tabs-row">
          <button 
            className={`batch-tab-btn ${activeTab === 'EXPORT' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('EXPORT');
              setJsonText(storageService.exportVideoOverrides());
              setImportStatus(null);
            }}
          >
            <Download size={16} />
            <span>Xuất Dữ Liệu (Backup JSON)</span>
          </button>
          <button 
            className={`batch-tab-btn ${activeTab === 'IMPORT' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('IMPORT');
              setJsonText('');
              setImportStatus(null);
            }}
          >
            <Upload size={16} />
            <span>Nhập Dữ Liệu (Restore JSON)</span>
          </button>
        </div>

        <div className="batch-modal-body">
          {activeTab === 'EXPORT' ? (
            <div className="export-view">
              <p className="batch-guide-text">
                Toàn bộ các link YouTube bạn đã gắn, video tự thêm và ghi chú kỹ thuật được đóng gói dạng JSON bên dưới. Bạn có thể sao chép hoặc tải về máy tính để bảo quản.
              </p>

              <div className="batch-actions-bar">
                <button className="btn-batch-action" onClick={handleCopy}>
                  {copied ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
                  <span>{copied ? 'Đã sao chép vào bộ nhớ đệm!' : 'Sao chép JSON'}</span>
                </button>
                <button className="btn-batch-action btn-primary-batch" onClick={handleDownload}>
                  <Download size={16} />
                  <span>Tải file .JSON về máy</span>
                </button>
              </div>

              <textarea 
                className="batch-code-area"
                value={jsonText}
                readOnly
                rows={10}
              />
            </div>
          ) : (
            <div className="import-view">
              <p className="batch-guide-text">
                Dán mã JSON đã sao lưu trước đó hoặc tải file <code>.json</code> từ máy tính của bạn vào đây:
              </p>

              <div className="batch-upload-box">
                <input 
                  type="file" 
                  accept=".json,application/json"
                  id="json-file-input"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="json-file-input" className="btn-file-upload">
                  <Upload size={16} />
                  <span>Chọn file JSON từ máy tính</span>
                </label>
              </div>

              <textarea 
                className="batch-code-area"
                placeholder='Dán nội dung JSON vào đây (Ví dụ: { "overrides": { ... } })'
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                rows={9}
              />

              {importStatus && (
                <div className={`import-status-banner ${importStatus.success ? 'is-success' : 'is-error'}`}>
                  {importStatus.success ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}
                  <span>{importStatus.message}</span>
                </div>
              )}

              <div className="import-actions-bar">
                <button className="btn-cancel" onClick={onClose}>
                  Hủy
                </button>
                <button className="btn-apply-import" onClick={handleImport}>
                  <RefreshCw size={16} />
                  <span>Áp Dụng Dữ Liệu Ngay</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
