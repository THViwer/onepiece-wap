import React from "react";
import styles from "./JxIFrame.module.less";
import PropTypes from "prop-types";
import { checkHttps } from "jxUtils/common";

export default class JxIFrame extends React.Component {
  render() {
    let { title, src, disableScrolling, iFrameStyle } = this.props;
    src = checkHttps(src);
    const style = {
      overflowY: disableScrolling ? "hidden" : ""
    };
    return (
      <div className={styles.jxIFrameContainer} style={style}>
        <iframe
          className={styles.jxIFrame}
          title={title}
          src={src}
          style={iFrameStyle}
          width="100%"
          height="100%"
        />
      </div>
    );
  }
}

JxIFrame.defaultProps = {
  disableScrolling: false
};

JxIFrame.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
  disableScrolling: PropTypes.bool,
  iFrameStyle: PropTypes.object
};
