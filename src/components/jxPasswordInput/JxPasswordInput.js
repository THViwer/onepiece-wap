import React from "react";
import {action, computed, observable} from "mobx";
import {observer} from "mobx-react";
import {InputItem} from "antd-mobile";
import styles from "./JxPasswordInput.module.less";

/**
 * 密码输入框
 */
@observer
class JxPasswordInput extends React.Component {
  @observable showPassword = false;

  @computed
  get passwordInputType() {
    return this.showPassword ? "text" : "password";
  }

  @action
  changeShowPassword = () => {
    this.showPassword = !this.showPassword;
  };

  @computed
  get iconPasswordSee() {
    return this.showPassword
      ? `${styles.iconSee} ${styles.iconSeeActive}`
      : `${styles.iconSee}`;
  }

  render() {
    return (
      <InputItem
        {...this.props}
        type={this.passwordInputType}
        onExtraClick={this.changeShowPassword}
        extra={<div className={this.iconPasswordSee} />}
      />
    );
  }
}

export default JxPasswordInput;
