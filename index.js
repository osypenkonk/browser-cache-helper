import localForage from "localforage";
import { set as idbSet, get as idbGet, del as idbDel } from "idb-keyval";
import isPlainObject from "lodash.isplainobject";
import { v4 as uuidv4 } from "uuid";

class BrowserCacheHelper {
  constructor() {
    // Initialize IndexedDB using localForage for complex data types
    localForage.config({
      driver: localForage.INDEXEDDB,
      name: 'BrowserCacheDB',
      version: 1.0,
      storeName: 'keyval',
      description: 'Key-value pairs for BrowserCacheHelper'
    });
  }

  async set(key, value, storageType = 'localStorage') {
    try {
      if (storageType === 'localStorage' || storageType === 'sessionStorage') {
        window[storageType].setItem(key, JSON.stringify(value));
      } else if (storageType === 'IndexedDB') {
        if (isPlainObject(value) || Array.isArray(value)) {
          await localForage.setItem(key, value);
        } else {
          await idbSet(key, value);
        }
      }
    } catch (error) {
      console.error('Error setting item in storage:', error);
    }
  }

  async get(key, storageType = 'localStorage') {
    try {
      if (storageType === 'localStorage' || storageType === 'sessionStorage') {
        const item = window[storageType].getItem(key);
        return JSON.parse(item);
      } else if (storageType === 'IndexedDB') {
        const item = await localForage.getItem(key);
        if (item === null) {
          return idbGet(key);
        }
        return item;
      }
    } catch (error) {
      console.error('Error getting item from storage:', error);
    }
  }

  async remove(key, storageType = 'localStorage') {
    try {
      if (storageType === 'localStorage' || storageType === 'sessionStorage') {
        window[storageType].removeItem(key);
      } else if (storageType === 'IndexedDB') {
        await localForage.removeItem(key);
        await idbDel(key);
      }
    } catch (error) {
      console.error('Error removing item from storage:', error);
    }
  }
}

export default new BrowserCacheHelper();
