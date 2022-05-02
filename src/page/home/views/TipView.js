import React from "react";
import {computed} from "mobx";
import {inject, observer} from "mobx-react";
import {Modal} from "antd-mobile";
import styles from "./TipView.module.less";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import TextDelayButton from "jxComponents/jxButton/TextDelayButton";

@inject("homeStore", "userStore")
@observer
class TipView extends React.Component {
  @computed
  get showRechargeTip() {
    return this.props.homeStore.showRechargeTip;
  }

  goRecharge = () => {
    this.props.userStore.goTransfer();
    this.onClose();
  };

  goGame = () => {
    this.props.userStore.openWillGame();
    this.onClose();
  };

  onClose = () => {
    this.props.homeStore.showRechargeTip = false;
  };

  render() {
    return (
      <Modal
        visible={this.showRechargeTip}
        wrapClassName={styles.tipDialog}
        maskClosable={true}
        transparent
        onClose={this.onClose}
        transitionName="am-zoom"
        maskTransitionName="am-fade"
      >
        <div className={styles.text}>
          Your account balance is less than 10 yuan. Do you need to transfer
          money?
        </div>
        <JxFlex addContentSpaceBetween className={styles.option}>
          <TextDelayButton className={styles.button1} onClick={this.goRecharge}>
            To recharge >
          </TextDelayButton>
          <TextDelayButton className={styles.button2} onClick={this.goGame}>
            To game >
          </TextDelayButton>
        </JxFlex>
      </Modal>
    );
  }
}

export default TipView;
