import React from "react";
import { computed } from "mobx";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import { NavBar } from "antd-mobile";
import TextButton from "../jxButton/TextButton";
import TextDelayButton from "../jxButton/TextDelayButton";
import styles from "./JxNavBar.module.less";

@inject("appController", "jxAppStore")
@observer
export default class JxNavBar extends React.Component {
  backClick = () => {
    this.props.appController.navBack();
  };

  @computed
  get showNavBar() {
    return !this.props.jxAppStore.openForApp;
  }

  @computed get supportChangeHeight() {
    const { openForApp, navBarHeight } = this.props.jxAppStore;
    return openForApp && navBarHeight;
  }

  @computed get navBarHeight() {
    return this.props.jxAppStore.navBarHeight;
  }

  render() {
    //XXX 头部导航栏组建（可优化）
    const {
      hasBackButton = true,
      mode,
      icon,
      leftIconButton,
      rightIconButton,
      onRightClick,
      onLeftClick,
      leftTextButton,
      rightTextButton,
      children,
      onBackClick = this.backClick,
      className
    } = this.props;
    let compProps = { mode, icon };

    if (className) {
      compProps["className"] = className;
    }

    if (hasBackButton) {
      compProps["icon"] = (
        <TextButton className={styles.iconBackPadding} onTap={onBackClick}>
          <div className={styles.iconBack} />
        </TextButton>
      );
    }

    //TODO 目前有些按钮可能与遮罩层重叠，所以要使用延迟按钮
    if (rightTextButton && rightTextButton !== "") {
      let rightContentPro = {};
      if (onRightClick) {
        rightContentPro = { onClick: onRightClick };
      }
      compProps["rightContent"] = (
        <TextDelayButton className={styles.barTextButton} {...rightContentPro}>
          {rightTextButton}
        </TextDelayButton>
      );
    }

    if (rightIconButton) {
      compProps["rightContent"] = (
        <TextDelayButton
          onClick={onRightClick}
          className={`${styles.barIcon} ${rightIconButton}`}
        />
      );
    }

    if (leftTextButton && leftTextButton !== "") {
      compProps["leftContent"] = (
        <TextButton onTap={onLeftClick} className={styles.barTextButton}>
          {leftTextButton}
        </TextButton>
      );
    }

    if (leftIconButton) {
      compProps["leftContent"] = (
        <TextButton
          onTap={onLeftClick}
          className={`${styles.barIcon} ${leftIconButton}`}
        />
      );
    }
    return (
      <>
        {this.showNavBar ? (
          this.supportChangeHeight ? (
            <div
              className={styles.navBar}
              style={{ height: this.navBarHeight }}
            >
              <div className={styles.navBarLine} />
              <NavBar {...compProps}>{children}</NavBar>
            </div>
          ) : (
            <NavBar {...compProps}>{children}</NavBar>
          )
        ) : null}
      </>
    );
  }
}

JxNavBar.propTypes = {
  hasBackButton: PropTypes.bool,
  leftIconButton: PropTypes.string,
  rightIconButton: PropTypes.string,
  leftTextButton: PropTypes.node,
  rightTextButton: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onRightClick: PropTypes.func,
  onLeftClick: PropTypes.func,
  onBackClick: PropTypes.func
};
