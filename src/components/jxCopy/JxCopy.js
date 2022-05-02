import React from "react";
import {observer} from "mobx-react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {successToast} from "../../utils/common";
import TouchFeedback from "rmc-feedback";
import styles from "./JxCopy.module.less";
import PropTypes from "prop-types";

const JxCopy = observer(({ text, className, activeClassName, successTip }) => {
  const newActiveClassName = activeClassName
    ? `${styles.copy} ${className} ${activeClassName}`
    : `${styles.copy} ${className} ${styles.copyActive}`;
  return (
    <TouchFeedback activeClassName={newActiveClassName}>
      <CopyToClipboard text={text} onCopy={() => successToast(successTip)}>
        <div className={`${styles.copy} ${className}`}/>
      </CopyToClipboard>
    </TouchFeedback>
  );
});

JxCopy.defaultProps = {
  className: "",
  activeClassName: "",
  successTip: "复制成功"
};

JxCopy.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  activeClassName: PropTypes.string,
  successTip: PropTypes.any
};

export default JxCopy;
