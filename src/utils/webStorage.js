import "webstorage-polyfill";

export function webStorageGetItem(key, defaultValue = null) {
  return localStorage.getItem(key) || defaultValue;
}

export function webStorageSetItem(key, value) {
  localStorage.setItem(key, value);
}

/**
 * 存储对象
 * @param key
 * @param value
 */
export function webStorageSetObjectItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function webStorageRemoveItem(key) {
  localStorage.removeItem(key);
}

/**
 *
 * @param key 保存的键值名
 * @param requestFunction 请求的异步函数
 * @param responseDealFunction 返回参数做处理
 * @return {Promise<null|any | string|any>}
 */
export async function webStorageGetOptionData(
  key,
  requestFunction,
  responseDealFunction = null
) {
  let responseData = localStorage.getItem(key);
  if (responseData !== null && responseData !== "undefined") {
    return JSON.parse(responseData);
  } else {
    responseData = await requestFunction();
    if (responseData) {
      if (responseDealFunction) {
        responseData = responseDealFunction(responseData);
      }
      webStorageSetItem(key, JSON.stringify(responseData));
      return responseData;
    }
    return null;
  }
}
