import React from "react";
import PropTypes from "prop-types";
import styles from "./JxContent.module.less";

function JxContent({ className, children, addDefaultBottom, onScroll }) {
  let divProps = {};
  className = className
    ? `${styles.contentContainer} ${className}`
    : styles.contentContainer;
  if (addDefaultBottom) {
    className += ` ${styles.addBottom}`;
  }
  if (onScroll) {
    divProps["onScroll"] = onScroll;
  }
  return (
    <div className={className} page="scrollContent" {...divProps}>
      {children}
    </div>
  );
}

JxContent.defaultProps = {
  addDefaultBottom: true
};

JxContent.propTypes = {
  className: PropTypes.string,
  onScroll: PropTypes.func,
  addDefaultBottom: PropTypes.bool
};

export default JxContent;
