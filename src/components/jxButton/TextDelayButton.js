import React from "react";
import TouchFeedback from "rmc-feedback";
import styles from "./TextButton.module.less";
import PropTypes from "prop-types";

/**
 * 普通文字按钮
 */
const TextDelayButton = ({
  className,
  activeClassName,
  onClick,
  children,
  style
}) => {
  const newActiveClassName = activeClassName
    ? `${className} ${styles["jx-text-button"]} ${activeClassName}`
    : `${className} ${styles["jx-text-button"]} ${
        styles["jx-text-button-active"]
      }`;
  onClick = onClick || function() {};
  return (
    <TouchFeedback activeClassName={newActiveClassName}>
      <div className={className} style={style} onClick={onClick}>
        {children}
      </div>
    </TouchFeedback>
  );
};

TextDelayButton.defaultProps = {
  style: {},
  className: ""
};

TextDelayButton.propTypes = {
  style: PropTypes.any,
  activeClassName: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default TextDelayButton;
