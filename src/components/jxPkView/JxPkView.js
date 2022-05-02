import React from "react";
import PropTypes from "prop-types";
import styles from "./JxPkView.module.less";

const JxPkView = ({ text, state, pkBackgroundSize, pkTextSize }) => {
  const pkClassName = `${styles.statePk} ${
    styles["statePk" + state]
  } ${pkBackgroundSize}`;
  const pkClassNum = `${styles.pkBase} ${
    styles["pk10State" + text]
  } ${pkTextSize}`;
  return (
    <div className={pkClassName}>
      <div className={pkClassNum} />
    </div>
  );
};

JxPkView.defaultProps = {
  pkBackgroundSize: "",
  pkTextSize: ""
};

JxPkView.propTypes = {
  text: PropTypes.string,
  state: PropTypes.string,
  pkBackgroundSize: PropTypes.string
};

export default JxPkView;
