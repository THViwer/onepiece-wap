import React from "react";
import styles from "./JxPage.module.less";
import JxFlex from "../jxFlex/JxFlex";
import PropTypes from "prop-types";
import { Provider } from "mobx-react";

const JxPage = ({
  storeKey,
  storeValue,
  className,
  isContentTheme,
  children
}) => {
  let parentDom;
  className = isContentTheme
    ? `${styles.whiteContent} ${className}`
    : `${styles.pageContainer} ${className}`;
  const childDom = <JxFlex className={className}>{children}</JxFlex>;
  if (storeValue) {
    let parentProp = {};
    //XXX 展示兼容constructor.name
    // if (!storeKey) {
    //   storeKey = lowerFirst(storeValue.constructor.name);
    // }
    parentProp[storeKey] = storeValue;
    parentDom = <Provider {...parentProp}>{childDom}</Provider>;
  } else {
    parentDom = childDom;
  }
  return <React.Fragment>{parentDom}</React.Fragment>;
};

JxPage.defaultProps = {
  className: "",
  isContentTheme: false
};

JxPage.propTypes = {
  storeKey: PropTypes.string,
  storeValue: PropTypes.any,
  className: PropTypes.string,
  isContentTheme: PropTypes.bool
};

export default JxPage;
