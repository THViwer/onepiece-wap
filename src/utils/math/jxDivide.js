import NP from "number-precision";

/**
 * 除以
 * @param param1
 * @param param2
 * @return {number|*}
 */
export default function jxDivide(param1, param2) {
  return NP.divide(param1, param2);
}
