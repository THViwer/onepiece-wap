import React from "react";
import {inject, observer} from "mobx-react";
import JxPage from "jxComponents/jxPage/JxPage";
import JxContent from "jxComponents/jxContent/JxContent";
import JxNavBar from "jxComponents/jxNavBar/JxNavBar";
import {defineMessages, FormattedMessage, injectIntl} from "react-intl";
import WalletView from "../Funds/views/WalletView";
import {forOwn} from "lodash";
import {showToast} from "jxUtils/common";
import {List, Picker} from "antd-mobile";
import {AppButton} from "jxComponents/jxButton";
import {createForm} from "rc-form";
import WithdrawStore from "../../store/WithdrawStore";
import {computed} from "mobx";
import InputView from "../login/views/InputView";
import JxSupKeyBoard from "jxComponents/jxSuperKeyBoard/JxSupKeyBoard";
import styles from "./WithdrawPage.module.less";
import {hot} from "react-hot-loader/root";

const messages = defineMessages({
  save: {
    id: "common.save",
    defaultMessage: "保存"
  },
  name: {
    id: "common.name",
    defaultMessage: "姓名"
  },

  amountThanZero: {
    id: "funds.amountThanZero",
    defaultMessage: "请输入大于0金额"
  },
  entryAmount: {
    id: "funds.entryAmount",
    defaultMessage: "请输入金额"
  },
  entryDepositTime: {
    id: "funds.entryDepositTime",
    defaultMessage: "请输入存款时间"
  },
  selectChannel: {
    id: "funds.selectChannel",
    defaultMessage: "请选择存款方式"
  },
  bankNo: {
    id: "user.bankNo",
    defaultMessage: "银行卡号"
  },
  entryBankNo: {
    id: "user.entryBankNo",
    defaultMessage: "请输入银行卡号"
  },
  bankLength: {
    id: "user.bankLength",
    defaultMessage: "请输入正确的银行卡号"
  }
});

@injectIntl
@inject("withdrawStore", "userStore")
@observer
class WithdrawForm extends React.Component {
  memberBankId;

  hasBank = false;

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.props.withdrawStore
      .initData(this.props.intl.formatMessage)
      .then(() => {
        const { supportBankList } = this.props.withdrawStore;
        if (supportBankList.length > 0) {
          let userBankInfo = supportBankList[0][0];
          this.changeUserInfo(userBankInfo);
        }
      });
  }

  @computed get userName() {
    const { realName } = this.props.userStore;
    return realName;
  }

  @computed get supportBankList() {
    const { supportBankList } = this.props.withdrawStore;
    return supportBankList;
  }

  @computed get ShowSupportBankList() {
    return this.supportBankList.length > 0;
  }

  @computed get supportWithdraw() {
    return this.props.withdrawStore.supportWithdraw;
  }

  changeBank = bankInfo => {
    const bankId = bankInfo[0];
    this.props.form.setFieldsValue({
      bank: bankInfo
    });
    this.supportBankList[0].find(item => {
      const findItem = item.value === bankId;
      if (findItem) {
        this.changeUserInfo(item);
      }
      return findItem;
    });
  };

  changeUserInfo = userBankInfo => {
    const { bankCardNumber, id } = userBankInfo;
    if (bankCardNumber) {
      this.memberBankId = id;
      this.hasBank = true;
      this.props.form.setFieldsValue({
        bankCardNumber
      });
    } else {
      this.hasBank = false;
      this.props.form.setFieldsValue({
        bankCardNumber: ""
      });
    }
  };

  submitAction = () => {
    const { formatMessage } = this.props.intl;
    if (this.supportWithdraw) {
      this.props.form.validateFields((error, formData) => {
        if (error === null) {
          let { bank, bankCardNumber } = formData;
          formData.bank = bank[0];
          if (this.hasBank) {
            formData.memberBankId = this.memberBankId;
          }
          formData.bankCardNumber = bankCardNumber.replace(/ /g, "");
          this.props.withdrawStore.goWithdraw(formData, formatMessage).then();
        } else {
          forOwn(error, function(value) {
            showToast(value.errors[0].message);
            return false;
          });
        }
      });
    } else {
      this.props.withdrawStore.showErrorMessage();
    }
  };

  render() {
    const { getFieldProps } = this.props.form;
    const intl = this.props.intl;
    return (
      <div className={styles.formContainer}>
        <div className={styles.title}>
          <FormattedMessage id="funds.bank" defaultMessage="银行" />
          <span>*</span>
        </div>
        {this.ShowSupportBankList ? (
          <Picker
            data={this.supportBankList}
            cascade={false}
            {...getFieldProps("bank", {
              initialValue: [this.supportBankList[0][0].value]
            })}
            onChange={this.changeBank}
          >
            <List.Item className={styles.input} arrow="down" />
          </Picker>
        ) : (
          <List.Item className={styles.input} />
        )}
        <InputView
          text=<FormattedMessage id="funds.bankNo" defaultMessage="银行卡号" />
          type={"bankCard"}
          disabled={this.hasBank}
          {...getFieldProps("bankCardNumber", {
            rules: [
              {
                required: true,
                message: {
                  required: true,
                  message: intl.formatMessage(messages.entryBankNo)
                }
              },
              {
                validator: (rule, value) => {
                  return /^\d{8,16}$/.test(value.replace(/ /g, ""));
                },
                message: intl.formatMessage(messages.bankLength)
              }
            ]
          })}
        />
        <InputView
          text={<FormattedMessage id="user.name" defaultMessage="用户名" />}
          disabled
          value={this.userName}
        />
        <div className={styles.title}>
          <FormattedMessage id="funds.amount" defaultMessage="金额" />
          <span>*</span>
        </div>
        <JxSupKeyBoard
          type={"float"}
          {...getFieldProps("money", {
            rules: [
              {
                required: true,
                message: intl.formatMessage(messages.entryAmount)
              },
              {
                validator: (rule, value) => 0 < value,
                message: intl.formatMessage(messages.amountThanZero)
              }
            ]
          })}
          className={`${styles.input} ${styles.numInput}`}
        />
        <AppButton
          theme="color1"
          onClick={this.submitAction}
          className={
            this.supportWithdraw
              ? styles.systemButton
              : styles.disableSystemButton
          }
        >
          <FormattedMessage id="funds.withdraw" defaultMessage="取款" />
        </AppButton>
      </div>
    );
  }
}

const WithdrawFormValidate = createForm()(WithdrawForm);

@observer
class WithdrawPage extends React.Component {
  withdrawStore = new WithdrawStore();

  render() {
    return (
      <JxPage storeKey={"withdrawStore"} storeValue={this.withdrawStore}>
        <JxNavBar>
          <FormattedMessage id="home.withdraw" defaultMessage={"取款"} />
        </JxNavBar>
        <JxContent>
          <WalletView />
          <WithdrawFormValidate />
        </JxContent>
      </JxPage>
    );
  }
}

export default hot(WithdrawPage);
