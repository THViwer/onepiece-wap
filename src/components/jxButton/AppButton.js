import React from "react";
import PropTypes from "prop-types";
import TouchFeedback from "rmc-feedback";
import styles from "./AppButton.module.less";

/**
 * 普通文字按钮
 */
export default function AppButton({
  className,
  theme,
  onClick,
  children,
  disabled,
  onDisable
}) {
  className = className ? `${styles[theme]}  ${className}` : styles[theme];
  if (disabled) {
    className = `${className} ${styles.disabled}`;
    onClick = onDisable;
  }
  const myProps = { className, onClick };
  return (
    <TouchFeedback activeClassName={`${className} ${styles.active}`}>
      <div {...myProps}>{children}</div>
    </TouchFeedback>
  );
}

AppButton.defaultProps = {
  disabled: false,
  className: "",
  theme: "color1",
  onDisable: () => {}
};

AppButton.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  theme: PropTypes.string,
  onClick: PropTypes.func,
  onDisable: PropTypes.func
};
