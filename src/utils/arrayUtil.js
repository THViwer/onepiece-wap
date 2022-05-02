import random from "lodash/random";
import sampleSize from "lodash/sampleSize";

z

export function getRandomKey(arrayData) {
  return random(0, arrayData.length - 1);
}

export function getRandomValue(arrayData) {
  let index = getRandomKey(arrayData);
  return arrayData[index];
}

//获取多个不同随机值 value
export function getNumRandomValue(arrayData, num = 1) {
  return sampleSize(arrayData, num);
}

//获取多个不同随机值  Observable Array value
export function getObservableRandomValue(arrayData, num = 1) {
  return sampleSize([...Array(arrayData.length).keys()], num).reduce(
    (prev, currentValue) => {
      prev.push(arrayData[currentValue]);
      return prev;
    },
    []
  );
}

/**
 * 获取随机大写字母
 * @param num
 * @return {string}
 */
export function getRandomUpperCase(num = 1) {
  let character = "";
  while (num) {
    num--;
    character += String.fromCharCode(
      Math.floor(Math.random() * 26) + "A".charCodeAt(0)
    );
  }
  return character;
}

export function getNumArray(arrayLength) {
  let numArray = [];
  while (arrayLength) {
    arrayLength--;
    numArray.push(arrayLength);
  }
  return numArray;
}
