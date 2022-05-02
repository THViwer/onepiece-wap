import React from "react";
import styles from "./InputView.module.less";
import {InputItem} from "antd-mobile";

export default class InputView extends React.Component {
  render() {
    const { text, required = true } = this.props;
    return (
      <div>
        <div className={styles.title}>
          {text}
          {required ? <span>*</span> : null}
        </div>
        <InputItem {...this.props} className={styles.input} />
      </div>
    );
  }
}
