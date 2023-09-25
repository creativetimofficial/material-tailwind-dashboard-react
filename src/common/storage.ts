export abstract class CustomStorage {
  // The local storage container
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  /**
   * To get the storage value synchronously from corresponding key
   * @param key
   * @returns
   */
  getValue<T = string>(key: string): T | undefined {
    return JSON.parse(this.storage.getItem(key)!) as T;
  }

  /**
   * To set the storage value synchronously from corresponding key
   * @param key
   * @param value
   */
  setValue<T extends number | string | object | boolean>(key: string, value: T) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  /**
   * Deletes the value corresponding to the key
   * @param key
   */
  deleteValue(key: string) {
    this.storage.removeItem(key);
  }

  /**
   * Clears completely the storage
   */
  clearStorage() {
    this.storage.clear();
  }

  /**
   * Verifies if the value exists in the storage
   * @param key
   */
  valueExist(key: string): boolean {
    if (!this.getValue(key)) {
      return false;
    }
    return true;
  }

  /**
   * To get the storage value asynchronously from corresponding key
   * @param key
   * @returns
   */
  async getAsyncValue<T>(key: string): Promise<T | undefined> {
    return this.storage.getItem(key) as T;
  }

  /**
   * To set the storage value asynchronously from corresponding key
   * @param key
   * @param value
   */
  async setAsyncValue<T extends number | string | object | boolean>(
    key: string,
    value: T,
  ) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  /**
   * Function to clear all the session variables, except some selected ones
   * @param selectedKeys
   */
  clearSessionStorageExcept(selectedKeys: Array<string>) {
    for (let i = this.storage.length - 1; i >= 0; i--) {
      const key = this.storage.key(i);
      if (!selectedKeys.includes(key!)) {
        this.deleteValue(key!);
      }
    }
  }
}

export class SessionStorage extends CustomStorage {
  // The storage instance
  private static instance: SessionStorage;

  private constructor() {
    super(sessionStorage);
  }

  /**
   * Provides a unique instance of the storage
   * @returns
   */
  public static getInstance(): SessionStorage {
    if (!SessionStorage.instance) {
      SessionStorage.instance = new SessionStorage();
    }

    return SessionStorage.instance;
  }
}

export class LocalStorage extends CustomStorage {
  private static instance: SessionStorage;

  private constructor() {
    super(localStorage);
  }

  /**
   * Provides a unique instance of the storage
   */
  public static getInstance(): SessionStorage {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new LocalStorage();
    }

    return LocalStorage.instance;
  }
}
