import {inject, observer} from "mobx-react";
import React, {useState} from "react";
import styles from "./WalletView.module.less";
import {FormattedMessage} from "react-intl";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import {computed} from "mobx";
import {CSSTransition} from "react-transition-group";
import TextDelayButton from "jxComponents/jxButton/TextDelayButton";
import {showToast} from "jxUtils/common";

const IconRefresh = observer(function IconRefresh({ onRefresh }) {
  const [inState, setInState] = useState(false);
  return (
      <CSSTransition
          in={inState}
          timeout={1000}
          classNames={{
            enterActive: styles["oneDsfRefLogo-enter-active"]
          }}
          onExited={() => setInState(state => !state)}
      >
        <div
            onClick={() => {
              onRefresh();
              setInState(state => !state);
            }}
            className={styles.iconRefresh}
        />
      </CSSTransition>
  );
});

@inject("userStore")
@observer
export default class WalletView extends React.Component {
  @computed get balance() {
    return this.props.userStore.centerBalance;
  }

  onRefresh = () => {
    const { onSuccess = () => {} } = this.props;
    this.props.userStore.getAllPlatformBalance().then(result => {
      if (result) {
        onSuccess(result);
        showToast(<FormattedMessage id='funds.refreshAmount' defaultMessage='刷新余额成功' />);
      }
    });
  };

  allInBack = () => {
    const { onSuccess = () => {} } = this.props;
    this.props.userStore.allMoneyToCenter().then(result => {
      if (result) {
        onSuccess(result);
        showToast(<FormattedMessage id='funds.retrieveAmount' defaultMessage='金额回收成功' />);
      }
    });
  };

  render() {
    return (
        <JxFlex isColumn addAlignCenter className={styles.container}>
          <div className={styles.title}>
            <FormattedMessage id="founds.wallet" defaultMessage={"主钱包"} />
          </div>
          <JxFlex>
            <div className={styles.countryMoney}>
                <FormattedMessage id="founds.countryMoney" defaultMessage={"MYR"} />
            </div>
            <div className={styles.money}>{this.balance}</div>
            <IconRefresh onRefresh={this.onRefresh} />
          </JxFlex>
          <TextDelayButton onClick={this.allInBack} className={styles.allInBack}>
            <FormattedMessage id='funds.allIn' defaultMessage={"回收"} />
          </TextDelayButton>
        </JxFlex>
    );
  }
}
