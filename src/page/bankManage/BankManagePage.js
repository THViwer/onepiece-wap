import React from "react";
import {inject, observer} from "mobx-react";
import {computed} from "mobx";
import {hot} from "react-hot-loader";
import JxPage from "jxComponents/jxPage/JxPage";
import JxNavBar from "jxComponents/jxNavBar/JxNavBar";
import JxContent from "jxComponents/jxContent/JxContent";
import styles from "./BankManagePage.module.less";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import BankManageStore from "../../store/BankManageStore";
import JxModule from "jxComponents/jxModule/JxModule";
import {showToast} from "jxUtils/common";
import {defineMessages, injectIntl} from "react-intl";
import {TextButton} from "jxComponents/jxButton";

const messages = defineMessages({
  bankDetails: {
    id: "account.bankDetail",
    defaultMessage: "银行卡详情"
  },
  currentBankExistCard: {
    id: "account.currentBankExistCard",
    defaultMessage: "当前银行已存在银行卡"
  }
});

@inject("bankManageStore")
@observer
class GameItemView extends React.Component {
  goEditBankPage = () => {
    this.props.bankManageStore.goEditBankPage(this.props.data);
  };

  render() {
    let { data } = this.props;
    const { logo, bank, name, bankCardNumber, bankStr } = data;
    let newClassName = `${styles.imgBg}`;
    return bankCardNumber ? (
      <TextButton className={styles.gameItem} onTap={this.goEditBankPage}>
        <JxFlex addAlignCenter className={styles.gameTop}>
          <div
            style={{ backgroundImage: `url(${logo})` }}
            className={newClassName}
          />
          {bank}
        </JxFlex>
        <div>
          <div className={styles.name}>{name}</div>
          <div className={styles.bankStr}>{bankStr}</div>
        </div>
      </TextButton>
    ) : null;
  }
}

@observer
class BankManagePage extends JxModule {
  bankManageStore = new BankManageStore();

  navBackShowEvent(navParam) {
    this.bankManageStore.initData();
  }

  @computed get listData() {
    return this.bankManageStore.listData;
  }

  goAddBankPage = () => {
    if (this.bankManageStore.supportAddBank) {
      this.bankManageStore.goAddBankPage();
    } else {
      showToast(this.props.intl.formatMessage(messages.currentBankExistCard));
    }
  };

  render() {
    const intl = this.props.intl;
    return (
      <JxPage storeValue={this.bankManageStore} storeKey={"bankManageStore"}>
        <JxNavBar
          rightIconButton={styles.add}
          onRightClick={this.goAddBankPage}
        >
          {intl.formatMessage(messages.bankDetails)}
        </JxNavBar>
        <JxContent>
          <JxFlex isColumn className={styles.container}>
            {this.listData.map(item => {
              return (
                <GameItemView data={item} key={item.bank} onTap={this.down} />
              );
            })}
          </JxFlex>
        </JxContent>
      </JxPage>
    );
  }
}

export default hot(module)(injectIntl(BankManagePage));
