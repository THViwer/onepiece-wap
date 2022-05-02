import React from "react";
import {observer} from "mobx-react";
import round from "lodash/round";
import floor from "lodash/floor";
import PropTypes from "prop-types";

const JxMoneyNum = observer(({ data, decimal, sections, isRound }) => {
  const reg =
    "\\d(?=(\\d{" + (sections || 3) + "})+" + (decimal > 0 ? "\\." : "$") + ")";
  let reallyData = isRound ? round(data, decimal) : floor(data, decimal);

  reallyData = reallyData.toString().replace(new RegExp(reg, "g"), "$&,");
  let regAr = data ? data.toString().split(".") : "";
  let totalZero;
  if (decimal > 0) {
    if (regAr.length === 2) {
      totalZero = decimal - regAr[1].length;
    } else {
      totalZero = decimal;
      reallyData += ".";
    }
    while (totalZero > 0) {
      reallyData += "0";
      totalZero--;
    }
  }
  return <React.Fragment>{reallyData}</React.Fragment>;
});

JxMoneyNum.defaultProps = {
  decimal: 0,
  isRound: false
};

JxMoneyNum.propTypes = {
  data: PropTypes.number,
  decimal: PropTypes.number,
  isRound: PropTypes.bool
};

export default JxMoneyNum;
