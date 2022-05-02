import React from "react";
import {observer} from "mobx-react";
import round from "lodash/round";
import PropTypes from "prop-types";

const JxPercentNum = observer(({ data, decimal }) => {
  const reallyData = round(data * 100, decimal);
  return <React.Fragment>{reallyData}%</React.Fragment>;
});

JxPercentNum.propTypes = {
  data: PropTypes.number,
  decimal: PropTypes.number
};

export default JxPercentNum;
