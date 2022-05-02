// import clone from "lodash/clone";
import dayjs from "dayjs";

// /**
//  * 数字转换倒计时
//  * @param pourTime
//  * @return {string}
//  */
// export function numToDateString(pourTime) {
//   let hour = Math.floor(pourTime / 3600);
//   let minute = Math.floor((pourTime - hour * 3600) / 60);
//   let second = Math.floor(pourTime % 60);
//   if (hour < 10) {
//     hour = "0" + hour;
//   }
//
//   if (minute < 10) {
//     minute = "0" + minute;
//   }
//   if (second < 10) {
//     second = "0" + second;
//   }
//   return hour + ":" + minute + ":" + second;
// }
//
/**
 * 计算距离当前时间的秒
 * @param time
 * @return {number}
 */
export function nowAndTimeDiff(time) {
  return (+new Date() - +new Date(time)) / 1000;
}

// export function dateFormat(time1, format) {
//   if (!time1) {
//     return;
//   }
//   let dateObject = new Date(time1);
//   let timeZone = new Date().getTimezoneOffset();
//   /**
//    * 解决时区问题
//    */
//   if (timeZone !== -480) {
//     dateObject.setMinutes(dateObject.getMinutes() + timeZone + 480);
//   }
//   return getDateFormatToString(dateObject, format);
// }

/**
 * 时间转换字符串
 * @param time1
 * @param format
 * @return {*}
 */
export function getDateFormatToString(time1, format) {
  if (!time1) {
    return;
  }
  return dayjs(time1).format(format);
}

export function dateSubtractDayToString(time1, num, format) {
  return dayjs(time1)
      .subtract(num, "day")
      .format(format);
}

// export function dateAddDay(date, num) {
//   let cloneDate = clone(date);
//   return new Date(cloneDate.setDate(cloneDate.getDate() + num));
// }
//
// export function dateAddMonth(date, num) {
//   let cloneDate = clone(date);
//   return new Date(cloneDate.setMonth(cloneDate.getMonth() + num));
// }
//
// export function getDateNum() {
//   return +new Date();
// }
