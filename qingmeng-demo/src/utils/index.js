// 1、浏览器永久存储   window.localStorage

export const Local = {
  // 设置永久存储
  set(key, val) {
    window.localStorage.setItem(key, JSON.stringify(val));
  },
  // 获取永久存储
  get(key) {
    let json = window.localStorage.getItem(key);
    try {
      return JSON.parse(json);
    } catch (error) {
      return json;
    }
  },
  // 移除永久存储
  remove(key) {
    window.localStorage.removeItem(key);
  },
};

// 2、浏览器临时存储   window.sessionStorage

export const Session = {
  // 设置临时存储
  set(key, val) {
    window.sessionStorage.setItem(key, JSON.stringify(val));
  },
  // 获取临时存储
  get(key) {
    let json = window.sessionStorage.getItem(key);
    try {
      return JSON.parse(json);
    } catch (error) {
      return json;
    }
  },
  // 移除临时存储
  remove(key) {
    window.sessionStorage.removeItem(key);
  },
};
