import React from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import styles from "./JxNavDropPanel.module.less";
import { Modal } from "antd-mobile";

@observer
export default class JxNavDropPanel extends React.Component {
  render() {
    const {
      title,
      visible,
      children,
      handleVisibleChange
      // overlayClassName
    } = this.props;
    // let className = `${styles.containerBody} ${overlayClassName}`;
    return (
      <>
        <div className={styles.titleContainer} onClick={handleVisibleChange}>
          {title}
          <div className={styles.sanjiao} />
        </div>
        <Modal
          // className={className}
          popup={true}
          visible={visible}
          maskClosable={true}
          onClose={handleVisibleChange}
        >
          {children}
        </Modal>
      </>
    );
  }
}

JxNavDropPanel.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.node,
  overlayDom: PropTypes.node,
  handleVisibleChange: PropTypes.func,
  overlayClassName: PropTypes.string
};
