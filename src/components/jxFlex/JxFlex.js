import React from "react";
import PropTypes from "prop-types";
import styles from "./JxFlex.module.less";

//XXX 后续可能和ant的Flex合并，使用公用的FLex方便整体控制，节省css的Flex文件大小
const JxFlex = ({
  className,
  children,
  isColumn,
  addAlignCenter,
  addContentCenter,
  addContentSpaceBetween,
  style,
  onClick
}) => {
  let newClassName = `${styles.flex} ${className}`;
  let newProps = {};
  if (isColumn) {
    newClassName += ` ${styles.addColumn}`;
  }
  if (addAlignCenter) {
    newClassName += ` ${styles.addAlignCenter}`;
  }
  if (addContentCenter) {
    newClassName += ` ${styles.addContentCenter}`;
  }
  if (addContentSpaceBetween) {
    newClassName += ` ${styles.addContentSpaceBetween}`;
  }
  if (onClick) {
    newProps["onClick"] = onClick;
  }
  if (style) {
    newProps["style"] = style;
  }
  return (
    <div className={newClassName} {...newProps}>
      {children}
    </div>
  );
};

JxFlex.defaultProps = {
  className: "",
  isColumn: false,
  addAlignCenter: false,
  addContentCenter: false,
  addContentSpaceBetween: false
};

JxFlex.propTypes = {
  className: PropTypes.string,
  isColumn: PropTypes.bool,
  addAlignCenter: PropTypes.bool,
  addContentCenter: PropTypes.bool,
  addContentSpaceBetween: PropTypes.bool
};

export default JxFlex;
