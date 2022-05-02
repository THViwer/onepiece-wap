import {Toast} from "antd-mobile";
import uuidV4 from "uuid/v4";
import homeStore from "../store/HomeStore";

/**
 * 获取唯一id
 * @return {String}
 * @constructor
 */
export function uniqueId() {
  return uuidV4();
}

/**
 * 简单提示框
 * @param message
 */
export function showToast(message) {
  if (message.hasOwnProperty("props")) {
    message = homeStore.localeMessage[message.props.id];
  }
  Toast.info(message, 1.5);
}

/**
 * 简单提示框复制成功
 * @param message
 */
export function successToast(message) {
  if (message.hasOwnProperty("props")) {
    message = homeStore.localeMessage[message.props.id];
  }
  Toast.success(message, 1.5);
}

export function showLoading(message) {
  if (message.hasOwnProperty("props")) {
    message = homeStore.localeMessage[message.props.id];
  }
  Toast.loading(message, 0);
}

// /**
//  * 对话框
//  * @param title {string}
//  * @param message {string}
//  * @param actions { Array action}
//  * class action{
//  *  text,
//  *  onPress,
//  *  style
//  * }
//  */
// export function showAlert(title, message, actions) {
//   return Modal.alert(title, message, actions);
// }

/**
 * 获取url参数
 * @param name
 * @return {string|null}
 */
export function urlQueryString(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg);
  return r !== null ? unescape(r[2]) : null;
}

// /**
//  * 克隆一个新的对象，并且对象指向新的地址
//  * @param oldObject
//  * @return {any}
//  */
// export function cloneObject(oldObject) {
//   return JSON.parse(JSON.stringify(oldObject));
// }

/**
 * 优化循环定时器， 使用requestAnimationFrame,防止后台多次运行
 * @param callback
 * @param delay 间隔延迟时间
 * @param fastFirst 是否快速执行第一次
 * @return {
 *      stop : {Function}
 *      restart : {Function}
 * }
 */
// export function jxInterval(callback, delay, fastFirst = true) {
//   if (fastFirst) {
//     callback();
//   }
//   return interval(callback, delay);
// }

/**
 * 清空循环特殊定时器
 * @param jxInterval
 * @return {*}
 */
// export function jxTimerClear(jxInterval) {
//   if (jxInterval) {
//     jxInterval.stop();
//     jxInterval = undefined;
//   }
//   return jxInterval;
// }

/**
 * 优化时间定时器
 * @param callback
 * @param delay
 */
export function jxTimeout(callback, delay) {
  return setTimeout(callback, delay);
}

/**
 * 启动微信
 */
export function openWeChat() {
  window.open("weixin://");
}

/**
 * 启动微信
 */
export function openWhatsApp(number) {
  window.open(`https://api.whatsapp.com/send?phone=${number}`);
}

/**
 * 启动支付宝
 */
// export function openAlipay() {
//   window.open("https://d.alipay.com");
// }

/**
 * 启动支付宝
 */
// export function openQQ() {
//   window.open("mqqwpa://im/chat?chat_type=wpa");
// }

/**
 * 启动qq联系人
 * @param qqNum
 */
// export function openQQContact(qqNum) {
//   if (userStore.deviceSystem === "Android") {
//     qqNum = `mqq://im/chat?chat_type=wpa&version=1&src_type=web&uin=${qqNum}`;
//   } else {
//     qqNum = `mqqwpa://im/chat?chat_type=wpa&version=1&src_type=web&web_src=oicqzone.com&uin=${qqNum}`;
//   }
//   return qqNum;
// }

/**
 * 获取通用地址
 * @param imgPath
 * @return {string}
 */
export function imgImport(imgPath) {
  return `/static/media/${imgPath}`;
}

export const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item
    };
  }, initialValue);
};

/**
 * 获取相对站点地址
 * @param urlPath
 * @return {string}
 */
export function siteUrlPath(urlPath) {
  return `${window.location.origin}/${urlPath}`;
}

// export function checkHttps(url) {
//   const rep = /^https:/;
//   const hostname = window.location.protocol;
//   if (hostname === "https:" && !rep.test(url)) {
//     url = url.replace(/^http:/, "https:");
//   }
//   return url;
// }
