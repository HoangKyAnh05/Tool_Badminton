// IndexedDB Local Video Storage Service
// Enables users to upload, persist, and play MP4/WebM video files offline directly in browser.

const DB_NAME = 'BadmintonVideoDB';
const DB_VERSION = 1;
const STORE_NAME = 'local_videos';

interface StoredVideoRecord {
  id: string; // Slot ID e.g. pos_1_var_1, video-pos-1-1
  blob: Blob;
  name: string;
  type: string;
  size: number;
  uploadedAt: number;
}

let dbInstance: IDBDatabase | null = null;

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      resolve(dbInstance);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      dbInstance = (event.target as IDBOpenDBRequest).result;
      resolve(dbInstance);
    };

    request.onerror = (event) => {
      console.error('IndexedDB error:', (event.target as IDBOpenDBRequest).error);
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

// Cache active Object URLs in memory
const objectUrlCache = new Map<string, string>();

export const videoStorageService = {
  /**
   * Save a local video File/Blob to IndexedDB
   */
  async saveVideoFile(id: string, file: File | Blob, originalName?: string): Promise<string> {
    const db = await openDB();
    const record: StoredVideoRecord = {
      id,
      blob: file,
      name: originalName || (file instanceof File ? file.name : 'uploaded_video.mp4'),
      type: file.type || 'video/mp4',
      size: file.size,
      uploadedAt: Date.now()
    };

    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(record);

      req.onsuccess = () => {
        // Revoke previous URL if any
        if (objectUrlCache.has(id)) {
          URL.revokeObjectURL(objectUrlCache.get(id)!);
        }
        const newUrl = URL.createObjectURL(file);
        objectUrlCache.set(id, newUrl);
        resolve(newUrl);
      };

      req.onerror = () => reject(req.error);
    });
  },

  /**
   * Get an Object URL for playing the stored video
   */
  async getVideoObjectUrl(id: string): Promise<string | null> {
    if (objectUrlCache.has(id)) {
      return objectUrlCache.get(id)!;
    }

    try {
      const db = await openDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(id);

        req.onsuccess = () => {
          const record = req.result as StoredVideoRecord | undefined;
          if (record && record.blob) {
            const url = URL.createObjectURL(record.blob);
            objectUrlCache.set(id, url);
            resolve(url);
          } else {
            resolve(null);
          }
        };

        req.onerror = () => resolve(null);
      });
    } catch (e) {
      console.warn('Error fetching video from IndexedDB', e);
      return null;
    }
  },

  /**
   * Check if a custom video file exists for slot ID
   */
  async hasVideoFile(id: string): Promise<boolean> {
    try {
      const db = await openDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.count(IDBKeyRange.only(id));
        req.onsuccess = () => resolve(req.result > 0);
        req.onerror = () => resolve(false);
      });
    } catch {
      return false;
    }
  },

  /**
   * Delete a stored video file
   */
  async deleteVideoFile(id: string): Promise<void> {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.delete(id);

        req.onsuccess = () => {
          if (objectUrlCache.has(id)) {
            URL.revokeObjectURL(objectUrlCache.get(id)!);
            objectUrlCache.delete(id);
          }
          resolve();
        };

        req.onerror = () => reject(req.error);
      });
    } catch (e) {
      console.warn('Error deleting video file', e);
    }
  },

  /**
   * Get all stored video metadata keys
   */
  async getAllStoredIds(): Promise<string[]> {
    try {
      const db = await openDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.getAllKeys();
        req.onsuccess = () => resolve((req.result as string[]) || []);
        req.onerror = () => resolve([]);
      });
    } catch {
      return [];
    }
  }
};
