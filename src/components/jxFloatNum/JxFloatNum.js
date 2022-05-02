import React from "react";
import {observer} from "mobx-react";
import round from "lodash/round";
import PropTypes from "prop-types";
import floor from "lodash/floor";

const JxFloatNum = observer(function JxFloatNum({ data, decimal, isRound }) {
  const reallyData = isRound ? round(data, decimal) : floor(data, decimal);
  return <React.Fragment>{reallyData}</React.Fragment>;
});

JxFloatNum.defaultProps = {
  isRound: true
};

JxFloatNum.propTypes = {
  data: PropTypes.number,
  decimal: PropTypes.number,
  isRound: PropTypes.bool
};

export default JxFloatNum;
