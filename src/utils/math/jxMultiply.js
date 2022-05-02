import NP from "number-precision";

/**
 * 乘以
 * @param param1
 * @param param2
 * @return {number|*}
 */
export default function jxMultiply(param1, param2) {
  return NP.times(param1, param2);
}
