import React, {Component} from "react";
import {Accordion} from "antd-mobile";
import {defineMessages, FormattedMessage} from "react-intl";
import {computed, observable} from "mobx";
import {inject, observer} from "mobx-react";
import JxIntl from "jxComponents/jxIntl/JxIntl";
import styles from "./AllBalanceView.module.less";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import TextDelayButton from "jxComponents/jxButton/TextDelayButton";
import JxSupKeyBoard from "jxComponents/jxSuperKeyBoard/JxSupKeyBoard";
import {showToast} from "jxUtils/common";
import JxSelect from "jxComponents/jxSelect/JxSelect";
import TextButton from "jxComponents/jxButton/TextButton";

@inject("userStore", "transferStore")
@observer
class PlatformItemView extends React.Component {
  @observable
  inputBalance;

  @observable
  promotionId;

  @computed get isShow() {
    return this.props.userStore.centerBalance !== 0;
  }

  onChange = value => {
    this.promotionId = value;
  };

  onBalanceChange = value => {
    this.inputBalance = value;
  };

  transferAllinMoney = (platform, balance, info) => {
    const { transfer, tips } = this.props.data;
    if (transfer) {
      this.props.userStore.transferAction(
        {
          amount: this.props.userStore.centerBalance,
          to: platform,
          from: "Center"
        },
        info,
        () => {
          this.props.userStore
            .getUserPlatformBalance(platform)
            .then(balance => {
              info.balance = balance;
            });
          showToast(
            <FormattedMessage
              id="funds.transferSuccessful"
              defaultMessage={"转账成功"}
            />
          );
        }
      );
    } else {
      showToast(tips);
    }
  };

  transferMoney = (platform, info) => {
    if (this.inputBalance <= 0 || this.inputBalance === undefined) {
      showToast(
        <FormattedMessage id="funds.balanceTip" defaultMessage={"请输入金额"} />
      );
      return;
    }
    this.props.userStore.transferAction(
      {
        amount: this.inputBalance,
        from: "Center",
        to: platform
      },
      info,
      () => {
        this.inputBalance = "";
        this.props.userStore.getUserPlatformBalance(platform).then(balance => {
          info.balance = balance;
        });
        showToast(
          <FormattedMessage
            id="funds.transferSuccessful"
            defaultMessage={"转账成功"}
          />
        );
      }
    );
  };

  transferGameMoney = () => {
    let { data, category } = this.props;
    let { transfer } = data;
    if (transfer) {
      this.props.transferStore.openTransferDialog(data, category);
    } else {
      this.showTips();
    }
  };

  showTips = () => {
    showToast(this.props.data.tips);
  };

  render() {
    let { data, onTap } = this.props;
    let { platform, balance, transfer, tips, isSelect, pname, weekBet } = data;
    const icon = isSelect ? styles.iconOpen : styles.iconClose;
    const panelClass = isSelect
      ? `${styles.form} ${styles.formActive}`
      : styles.form;
    return (
      <div>
        <div className={styles.item1}>
          <TextDelayButton className={styles.item2} onClick={onTap}>
            <div className={styles.itemLeft}>
              <div className={icon} />
              <div className={styles.text1}>{pname}</div>
            </div>
            <div className={styles.text1_money}>{balance}</div>
          </TextDelayButton>
          {this.isShow ? (
            <JxFlex addAlignCenter>
              <TextButton
                onTap={() => this.transferAllinMoney(platform, balance, data)}
                className={styles.allInBtn}
              >
                <FormattedMessage
                  id="funds.allTransferIn"
                  defaultMessage={"全部转入"}
                />
              </TextButton>
              <TextButton
                className={styles.icoTranter}
                onTap={this.transferGameMoney}
              />
            </JxFlex>
          ) : (
            <JxFlex addAlignCenter>
              <TextButton className={`${styles.allInBtn} ${styles.disable}`}>
                <FormattedMessage
                  id="funds.allTransferIn"
                  defaultMessage={"全部转入"}
                />
              </TextButton>
              <TextButton
                className={styles.icoTranter}
                onTap={this.transferGameMoney}
              />
            </JxFlex>
          )}
        </div>
        <div>
          <div className={panelClass}>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td>
                    <FormattedMessage id="transfer.weekBet" defaultMessage="WeekBet" />
                    ：
                  </td>
                  <td></td>
                  <td className={styles.weekBet}>{weekBet === "-" ? "-" : weekBet}</td>
                </tr>
                <tr>
                  <td>
                    <FormattedMessage
                      id="funds.depositAmount"
                      defaultMessage={"充值金额"}
                    />
                    ：
                  </td>
                  <td>
                    <JxSupKeyBoard
                      value={this.inputBalance}
                      className={styles.input}
                      type={"float"}
                      onChange={this.onBalanceChange}
                    />
                  </td>
                  <td>
                    {transfer ? (
                      <TextButton
                        className={styles.submit}
                        onTap={() => this.transferMoney(platform, data)}
                      >
                        <FormattedMessage
                          id="funds.submit"
                          defaultMessage={"提交"}
                        />
                      </TextButton>
                    ) : (
                      <TextButton
                        className={`${styles.submit} ${styles.disable}`}
                        onTap={() => this.showTips(tips)}
                      >
                        <FormattedMessage
                          id="funds.submit"
                          defaultMessage={"提交"}
                        />
                      </TextButton>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

@inject("transferStore")
@observer
class AllBalanceView extends Component {
  @computed get menuInfo() {
    return this.props.transferStore.menuInfo;
  }

  menuInfoMessage = defineMessages({
    slot: {
      id: "funds.slots",
      defaultMessage: "老虎机 / 转账"
    },
    live: {
      id: "funds.livecasino",
      defaultMessage: "真人视频 / 转账"
    },
    sport: {
      id: "funds.sport",
      defaultMessage: "体育 / 转账"
    },
    fishing: {
      id: "funds.fishing",
      defaultMessage: "捕鱼 / 转账"
    }
  });

  constructor(props) {
    super(props);
    //  this.onChange("0");
    this.props.transferStore.searchAllPlatformBalance("0");
  }

  onChange = index => {
    this.props.transferStore.updateMenuInfo(index);
  };

  render() {
    return (
      <Accordion
        accordion
        defaultActiveKey={"0"}
        openAnimation={{}}
        onChange={this.onChange}
        className={styles.accordion}
      >
        <Accordion.Panel
          key={0}
          header={<JxIntl id={"slot"} data={this.menuInfoMessage} />}
        >
          <JxSelect
            listData={this.menuInfo[0].list}
            OptionComponent={PlatformItemView}
          />
          {/*{this.menuInfo[0].list.map(item => {*/}
          {/*  return (*/}
          {/*      <PlatformItemView*/}
          {/*          category={this.menuInfo[0].category}*/}
          {/*          data={item}*/}
          {/*          key={item.platform}*/}
          {/*      />*/}
          {/*  );*/}
          {/*})}*/}
        </Accordion.Panel>
        <Accordion.Panel
          header={<JxIntl id={"live"} data={this.menuInfoMessage} />}
        >
          <JxSelect
            listData={this.menuInfo[1].list}
            OptionComponent={PlatformItemView}
          />
        </Accordion.Panel>
        <Accordion.Panel
          header={<JxIntl id={"sport"} data={this.menuInfoMessage} />}
        >
          <JxSelect
            listData={this.menuInfo[2].list}
            OptionComponent={PlatformItemView}
          />
        </Accordion.Panel>
        <Accordion.Panel
          header={<JxIntl id={"fishing"} data={this.menuInfoMessage} />}
        >
          <JxSelect
            listData={this.menuInfo[3].list}
            OptionComponent={PlatformItemView}
          />
        </Accordion.Panel>
      </Accordion>
    );
  }
}

export default AllBalanceView;
