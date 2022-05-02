import {inject, observer} from "mobx-react";
import React from "react";
import {computed} from "mobx";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import styles from "./UserInfoView.module.less";
import {FormattedMessage} from "react-intl";
import TextDelayButton from "jxComponents/jxButton/TextDelayButton";

@inject("userStore")
@observer
export class UserInfoItemView extends React.Component {
  @computed get userName() {
    return this.props.userStore.userName;
  }

  @computed get userBalance() {
    return this.props.userStore.centerBalance;
  }

  render() {
    return (
        <JxFlex className={styles.leftItem} isColumn>
          <div className={styles.topText}>
            <FormattedMessage id="home.welcome" defaultMessage={"欢迎您"} />，
            {this.userName}
          </div>
          <div >
            <FormattedMessage id="home.centerWallet" defaultMessage={"主钱包"}
            />
            ： <span>{this.userBalance}</span>
          </div>
        </JxFlex>
    );
  }
}

@inject("userStore")
@observer
export default class UserInfoView extends React.Component {
  goDeposits = () => {
    this.props.userStore.goDeposits();
  };

  goWithdraw = () => {
    this.props.userStore.goWithdraw();
  };

  goTransfer = () => {
    this.props.userStore.goTransfer();
  };

  render() {
    return (
        <JxFlex
            className={styles.container}
            addContentSpaceBetween
            addAlignCenter
        >
          <UserInfoItemView />
          <JxFlex className={styles.rightItem}>
            <TextDelayButton
                className={styles.optionItem}
                onClick={this.goDeposits}
            >
              <div className={styles.icDeposits} />
              <div>
                <FormattedMessage id="home.deposits" defaultMessage={"充值"}
                />
              </div>
            </TextDelayButton>
            <TextDelayButton
                className={styles.optionItem}
                onClick={this.goWithdraw}
            >
              <div className={styles.icWithdraw} />
              <div>
                <FormattedMessage  id="home.withdraw"  defaultMessage={"取款"}
                />
              </div>
            </TextDelayButton>
            <TextDelayButton
                className={styles.optionItem}
                onClick={this.goTransfer}
            >
              <div className={styles.icTransfer} />
              <div>
                <FormattedMessage id="home.transfer" defaultMessage={"转账"} />
              </div>
            </TextDelayButton>
          </JxFlex>
        </JxFlex>
    );
  }
}
