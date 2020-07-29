let SecureLS = require("secure-ls");
let secureLs = new SecureLS({
  encodingType: "des",
  isCompression: false,
  encryptionSecret: "dW5pLXBheQ"
});

/**
 * 默认情况下key 可以为null、 undefined、'';
 * 如果值不存在，获取结果为null;
 */

/**
 * 日志flag
 * @type {string}
 */
const LOG_TAG = "STORAGE";

/**
 * 异步存储键值对
 * @param key
 * @param value
 * @param callback
 */
function setStorage(key, value, callback) {
  new Promise(resolve => {
    setStorageSync(key, value);
    resolve();
  })
    .then(() => {
      if (callback && callback.success) {
        callback.success();
      }
    })
    .catch(error => {
      console.error(LOG_TAG, error);
      if (callback && callback.fail) {
        callback.fail();
      }
    });
}

/**
 * 同步存储键值对
 * @param key
 * @param value
 */
function setStorageSync(key, value) {
  if (value === undefined) {
    value = null;
  }
  let jsonValue = JSON.stringify(value); // 其实可以传入undefined
  secureLs.set(key, jsonValue);
}

/**
 * 异步获取键应用的值
 *
 * @param key
 * @param callback
 */
function getStorage(key, callback) {
  new Promise(resolve => {
    let result = getStorageSync(key);
    resolve(result);
  })
    .then(value => {
      if (callback && callback.success) {
        callback.success(value);
      }
    })
    .catch(error => {
      if (callback && callback.fail) {
        callback.fail(error);
      }
    });
}

/**
 * 同步获取键对应的值
 * @param key
 * @returns {null|any}
 */
function getStorageSync(key) {
  let jsonValue = secureLs.get(key);
  // let jsonValue = window.localStorage.getItem(key);
  if (jsonValue === undefined || !jsonValue) {
    return null;
  } else {
    return JSON.parse(jsonValue); // 解析json不能传入undefined
  }
}

/**
 * 异步移除置顶的键值对数据
 * @param key
 */
function removeStorage(key) {
  new Promise(resolve => {
    removeStorageSync(key);
    resolve();
  })
    .then(() => {})
    .catch(error => {
      console.error(LOG_TAG, error);
    });
}

/**
 * 同步移除置顶的键值对
 * @param key
 */
function removeStorageSync(key) {
  secureLs.remove(key);
}

/**
 * 异步清除所有键值对数据
 */
function clearStorage() {
  new Promise(resolve => {
    clearStorageSync();
    resolve();
  })
    .then(() => {})
    .catch(error => {
      console.error(LOG_TAG, error);
    });
}

/**
 * 同步清除所有键值对
 */
function clearStorageSync() {
  secureLs.clear();
}

export default {
  setStorage: setStorage,
  setStorageSync: setStorageSync,
  getStorage: getStorage,
  getStorageSync: getStorageSync,
  removeStorage: removeStorage,
  removeStorageSync: removeStorageSync,
  clearStorage: clearStorage,
  clearStorageSync: clearStorageSync
};
