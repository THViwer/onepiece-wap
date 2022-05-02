import React from "react";
import TouchFeedback from "rmc-feedback";
import styles from "./TextButton.module.less";
import Hammer from "react-hammerjs";
import PropTypes from "prop-types";

/**
 * 普通文字按钮
 */
const TextButton = ({ className, activeClassName, onTap, children, style }) => {
  const newActiveClassName = activeClassName
    ? `${className} ${styles["jx-text-button"]} ${activeClassName}`
    : `${className} ${styles["jx-text-button"]} ${
        styles["jx-text-button-active"]
      }`;
  onTap = onTap || function() {};
  return (
    <TouchFeedback activeClassName={newActiveClassName}>
      <Hammer action={onTap}>
        <div className={className} style={style}>
          {children}
        </div>
      </Hammer>
    </TouchFeedback>
  );
};

TextButton.defaultProps = {
  style: {},
  className: ""
};

TextButton.propTypes = {
  style: PropTypes.any,
  activeClassName: PropTypes.string,
  className: PropTypes.string,
  onTap: PropTypes.func
};

export default TextButton;
