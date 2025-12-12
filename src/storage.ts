interface StorageResult {
  key: string;
  value: string;
  shared?: boolean;
}

class LocalStorage {
  async get(key: string, shared?: boolean): Promise<StorageResult | null> {
    try {
      const value = localStorage.getItem(key);
      if (value === null) return null;
      return { key, value, shared };
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  }

  async set(key: string, value: string, shared?: boolean): Promise<StorageResult | null> {
    try {
      localStorage.setItem(key, value);
      return { key, value, shared };
    } catch (error) {
      console.error('Storage set error:', error);
      return null;
    }
  }

  async delete(key: string, shared?: boolean): Promise<{ key: string; deleted: boolean; shared?: boolean } | null> {
    try {
      localStorage.removeItem(key);
      return { key, deleted: true, shared };
    } catch (error) {
      console.error('Storage delete error:', error);
      return null;
    }
  }

  async list(prefix?: string, shared?: boolean): Promise<{ keys: string[]; prefix?: string; shared?: boolean } | null> {
    try {
      const keys = Object.keys(localStorage).filter(key => 
        !prefix || key.startsWith(prefix)
      );
      return { keys, prefix, shared };
    } catch (error) {
      console.error('Storage list error:', error);
      return null;
    }
  }
}

declare global {
  interface Window {
    storage: LocalStorage;
  }
}

if (typeof window !== 'undefined') {
  window.storage = new LocalStorage();
}

export {};