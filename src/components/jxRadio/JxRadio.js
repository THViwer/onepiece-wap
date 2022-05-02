import React from "react";
import { observer } from "mobx-react";
import { TextButton } from "../jxButton";
import styles from "./JxRadio.module.less";
import PropTypes from "prop-types";

const JxRadio = observer(({ data, onTap, className }) => {
  const { text, isSelect, showIcon } = data;
  const iconClass = isSelect
    ? `${styles.iconRadio} ${styles.iconActive}`
    : styles.iconRadio;
  const iconColor = isSelect ? `${styles.iconColor1}` : styles.iconColor2;
  className = `${styles.radioContainer} ${className}`;
  return (
    <TextButton onTap={onTap} className={className}>
      {showIcon ? <div className={iconClass} /> : null}
      <span className={iconColor}>{text}</span>
    </TextButton>
  );
});

JxRadio.defaultProps = {
  className: ""
};

JxRadio.propTypes = {
  className: PropTypes.string,
  onTap: PropTypes.func
};
export default JxRadio;
