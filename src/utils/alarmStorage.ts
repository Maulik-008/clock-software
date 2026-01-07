// IndexedDB utility for managing custom alarm sounds
const DB_NAME = 'StudyClockDB';
const STORE_NAME = 'customAlarms';
const DB_VERSION = 1;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB per file
const MAX_TOTAL_STORAGE = 50 * 1024 * 1024; // 50MB total

export interface CustomAlarm {
  id: string;
  name: string;
  blob: Blob;
  size: number;
  uploadedAt: number;
}

// Initialize IndexedDB
const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
};

// Get all custom alarms
export const getAllCustomAlarms = async (): Promise<CustomAlarm[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// Get total storage used
export const getTotalStorageUsed = async (): Promise<number> => {
  const alarms = await getAllCustomAlarms();
  return alarms.reduce((total, alarm) => total + alarm.size, 0);
};

// Check if storage limit would be exceeded
export const canAddFile = async (
  fileSize: number
): Promise<{ canAdd: boolean; reason?: string }> => {
  if (fileSize > MAX_FILE_SIZE) {
    return {
      canAdd: false,
      reason: `File size exceeds maximum limit of ${(
        MAX_FILE_SIZE /
        (1024 * 1024)
      ).toFixed(1)}MB`,
    };
  }

  const totalUsed = await getTotalStorageUsed();
  if (totalUsed + fileSize > MAX_TOTAL_STORAGE) {
    return {
      canAdd: false,
      reason: `Total storage limit of ${(
        MAX_TOTAL_STORAGE /
        (1024 * 1024)
      ).toFixed(0)}MB would be exceeded`,
    };
  }

  return { canAdd: true };
};

// Add a custom alarm
export const addCustomAlarm = async (file: File): Promise<CustomAlarm> => {
  // Validate file type
  if (!file.type.startsWith('audio/')) {
    throw new Error('File must be an audio file');
  }

  // Check storage limits
  const canAdd = await canAddFile(file.size);
  if (!canAdd.canAdd) {
    throw new Error(canAdd.reason);
  }

  const db = await initDB();
  const id = `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const customAlarm: CustomAlarm = {
    id,
    name: file.name,
    blob: file,
    size: file.size,
    uploadedAt: Date.now(),
  };

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(customAlarm);

    request.onsuccess = () => resolve(customAlarm);
    request.onerror = () => reject(request.error);
  });
};

// Delete a custom alarm
export const deleteCustomAlarm = async (id: string): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// Get custom alarm by ID
export const getCustomAlarm = async (
  id: string
): Promise<CustomAlarm | null> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
};

// Create audio URL from custom alarm
export const getCustomAlarmURL = async (id: string): Promise<string | null> => {
  const alarm = await getCustomAlarm(id);
  if (!alarm) return null;
  return URL.createObjectURL(alarm.blob);
};

// Format bytes to human readable
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

// Get storage info
export const getStorageInfo = async () => {
  const totalUsed = await getTotalStorageUsed();
  const alarms = await getAllCustomAlarms();

  return {
    totalUsed,
    totalUsedFormatted: formatBytes(totalUsed),
    maxStorage: MAX_TOTAL_STORAGE,
    maxStorageFormatted: formatBytes(MAX_TOTAL_STORAGE),
    percentageUsed: (totalUsed / MAX_TOTAL_STORAGE) * 100,
    alarmsCount: alarms.length,
    maxFileSize: MAX_FILE_SIZE,
    maxFileSizeFormatted: formatBytes(MAX_FILE_SIZE),
  };
};
