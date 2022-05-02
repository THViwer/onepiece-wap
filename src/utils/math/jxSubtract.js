import NP from "number-precision";

/**
 * 减去
 * @param minuend
 * @param subtrahend
 * @return {number|*}
 */
export default function jxSubtract(minuend, subtrahend) {
  return NP.minus(minuend, subtrahend);
}
