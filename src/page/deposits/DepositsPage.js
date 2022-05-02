import React from "react";
import {inject, observer} from "mobx-react";
import JxPage from "jxComponents/jxPage/JxPage";
import JxContent from "jxComponents/jxContent/JxContent";
import JxNavBar from "jxComponents/jxNavBar/JxNavBar";
import {defineMessages, FormattedMessage, injectIntl} from "react-intl";
import {DatePicker, List, Picker} from "antd-mobile";
import {AppButton} from "jxComponents/jxButton";
import {createForm} from "rc-form";
import styles from "./DepositsPage.module.less";
import {hot} from "react-hot-loader/root";
import DepositsStore from "../../store/DepositsStore";
import {computed, observable} from "mobx";
import InputView from "../login/views/InputView";
import JxSupKeyBoard from "jxComponents/jxSuperKeyBoard/JxSupKeyBoard";
import {forOwn} from "lodash";
import {showToast} from "jxUtils/common";
import JxSelect from "jxComponents/jxSelect/JxSelect";
import TextDelayButton from "jxComponents/jxButton/TextDelayButton";
import {expr} from "mobx-utils";
import JxCopy from "jxComponents/jxCopy/JxCopy";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import {getDateFormatToString} from "jxUtils/timeUtil";
import Files from "react-files";

const messages = defineMessages({
  save: {
    id: "funds.submit",
    defaultMessage: "提交"
  },
  name: {
    id: "common.name",
    defaultMessage: "姓名"
  },
  amountThanTen: {
    id: "funds.amountThanTen",
    defaultMessage: "请输入大于10金额"
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
  },
  entryMinMax: {
    id: "deposit.entryMinMax",
    defaultMessage: "Min/Max Limit：{min}/{max}"
  }
});

const MoneyItem = observer(function MoneyItem({ data, onTap }) {
  const { value, isSelect } = data;
  let className = expr(() =>
    isSelect
      ? `${styles.moneyItem} ${styles.moneyItemActive}`
      : `${styles.moneyItem}`
  );
  return (
    <TextDelayButton className={className} onClick={onTap}>
      {value}
    </TextDelayButton>
  );
});

const ClientBankItem = observer(function MoneyItem({ data, onTap }) {
  const { bankName, name, bankCardNumber, isSelect, logo } = data;

  return isSelect ? (
    <JxFlex addAlignCenter onClick={onTap} className={styles.container5}>
      <div className={styles.bankSelect} />
      <div className={styles.bankItemContainer}>
        <JxFlex addAlignCenter>
          <div
            className={styles.bankLogo}
            style={{ backgroundImage: `url(${logo})` }}
          />
          <div>{bankName}</div>
        </JxFlex>
        <JxFlex addAlignCenter className={styles.bankInputContainer}>
          <div className={styles.bankInput}>{name}</div>
          <JxCopy text={name} className={styles.copy} />
        </JxFlex>
        <JxFlex addAlignCenter className={styles.bankInputContainer}>
          <div className={styles.bankInput}>{bankCardNumber}</div>
          <JxCopy text={bankCardNumber} className={styles.copy} />
        </JxFlex>
      </div>
    </JxFlex>
  ) : (
    <JxFlex addAlignCenter className={styles.container5} onClick={onTap}>
      <div className={styles.bankNoSelect} />
      <JxFlex
        className={styles.bankNoSelectInfo}
        addContentSpaceBetween
        addAlignCenter
      >
        <JxFlex addAlignCenter>
          <div
            className={styles.bankLogo}
            style={{ backgroundImage: `url(${logo})` }}
          />
          <div>{bankName}</div>
        </JxFlex>
        <div className={styles.online}>online</div>
      </JxFlex>
    </JxFlex>
  );
});

const ClientThirdBankItem = observer(function ClientThirdBankItem({
  data,
  onTap
}) {
  const { name, isSelect, logo } = data;
  let selectClassName = expr(() =>
    isSelect ? `${styles.bankSelect}` : `${styles.bankNoSelect}`
  );
  return (
    <JxFlex addAlignCenter onClick={onTap} className={styles.container5}>
      <div className={selectClassName} />
      <div className={styles.bankItemContainer}>
        <JxFlex addAlignCenter>
          <div
            className={styles.bankLogo}
            style={{ backgroundImage: `url(${logo})` }}
          />
          <div>{name}</div>
        </JxFlex>
      </div>
    </JxFlex>
  );
});

const ClientDepositItem = observer(function ClientBankItem({ data, onTap }) {
  const { payType, isSelect } = data;
  const selectClass = isSelect
    ? `${styles.depositSelect} ${styles.depositSelectActive}`
    : styles.depositSelect;
  return (
    <JxFlex
      addContentCenter
      className={selectClass}
      addAlignCenter
      onClick={onTap}
    >
      {payType}
    </JxFlex>
  );
});

@inject("depositsStore", "userStore")
@observer
class DepositsForm extends React.Component {
  memberBankId;

  memberBankCardNumber;

  hasBank = false;

  @observable
  showUserBank = false;

  @observable
  showUserBankInfo = false;

  @computed get userBankStyle() {
    return this.showUserBankInfo ? styles.iconOpen : styles.iconClose;
  }

  @computed get moneyList() {
    return this.props.depositsStore.moneyList;
  }

  @computed get clientBankList() {
    return this.props.depositsStore.clientBankList;
  }

  @computed get thirdClientBankList() {
    return this.props.depositsStore.thirdClientBankList;
  }

  @computed get supportBankList() {
    return this.props.depositsStore.supportBankList;
  }

  @computed get ShowSupportBankList() {
    return this.supportBankList.length > 0;
  }

  @computed get showClientBankList() {
    return this.clientBankList.length > 0;
  }

  @computed get userName() {
    const { realName } = this.props.userStore;
    return realName;
  }

  @computed get depositChannelList() {
    return this.props.depositsStore.depositChannelList;
  }

  @computed get checkDeposits() {
    return this.clientBankList.length === 0;
  }

  @computed get depositOptionsList() {
    return this.props.depositsStore.depositOptionsList;
  }

  @computed get payType() {
    return this.props.depositsStore.payType;
  }

  @computed get payId() {
    return this.props.depositsStore.payId;
  }

  @computed get maxThirdAmount() {
    return this.props.depositsStore.maxAmount;
  }

  @computed get minThirdAmount() {
    return this.props.depositsStore.minAmount;
  }

  @observable
  bankMaxAmount = 0;

  @observable
  bankMinAmount = 0;

  onChangeDepositOption = info => {
    this.props.depositsStore.changeDepositOption(info);
  };

  constructor(props) {
    super(props);
    // 初始状态
    this.props.depositsStore.initData().then(() => {
      const { supportBankList } = this.props.depositsStore;
      if (supportBankList.length > 0) {
        let userBankInfo = supportBankList[0][0];
        this.changeUserInfo(userBankInfo);
      }
    });
  }

  submitAction = () => {
    this.props.form.validateFields((error, formData) => {
      if (error === null) {
        if (this.payId !== 0) {
          formData.payId = this.payId;
          this.props.depositsStore.goThirdPage(formData).then(() => {
            this.props.form.setFieldsValue({
              amount: ""
            });
          });
          return;
        }
        let {
          memberBankCardNumber,
          depositTime,
          memberBank,
          channel
        } = formData;
        if (channel[0] === "CASH_DEPOSIT_MACHINE" || channel[0] === "ATM") {
          if (this.files.length === 0) {
            showToast(
              <FormattedMessage
                id="deposit.uploadImg"
                defaultMessage="上传信息"
              />
            );
            return;
          }
        }

        formData.memberBank = memberBank[0];
        formData.channel = channel[0];
        formData.depositTime = getDateFormatToString(
          depositTime,
          "YYYY-MM-DD HH:mm:ss"
        );
        formData.memberBankCardNumber = memberBankCardNumber.replace(/ /g, "");
        if (this.hasBank) {
          formData.memberBankId = this.memberBankId;
        }

        this.props.depositsStore.goDeposit2Page(formData, this.files).then();
      } else {
        forOwn(error, function(value) {
          showToast(value.errors[0].message);
          return false;
        });
      }
    });
  };

  onThirdBankChange = bankInfo => {
    this.props.form.setFieldsValue({
      selectBank: bankInfo.bank
    });
  };

  changeBank = bankInfo => {
    const bankName = bankInfo[0];
    this.props.form.setFieldsValue({
      memberBank: bankInfo
    });
    this.supportBankList[0].find(item => {
      if (bankName === item.value) {
        this.changeUserInfo(item);
      }
      return item.value === bankName;
    });
  };

  changeUserInfo = userBankInfo => {
    const { bankCardNumber, id } = userBankInfo;
    if (bankCardNumber) {
      this.memberBankId = id;
      this.hasBank = true;
      this.memberBankCardNumber = bankCardNumber;
      this.props.form.setFieldsValue({
        memberBankCardNumber: bankCardNumber
      });
    } else {
      this.hasBank = false;
      this.showUserBankInfo = true;
      this.memberBankCardNumber = "";
      this.props.form.setFieldsValue({
        memberBankCardNumber: ""
      });
    }
  };

  changeChannel = channel => {
    this.showUserBank = true;
    this.props.form.setFieldsValue({
      memberBankCardNumber: this.memberBankCardNumber
    });
    this.props.form.setFieldsValue({
      channel: channel
    });
  };

  selectMoney = moneyInfo => {
    if (this.payType === "Bank") {
      this.props.form.setFieldsValue({
        money: moneyInfo.value
      });
    } else {
      this.props.form.setFieldsValue({
        amount: moneyInfo.value
      });
    }
  };

  changeMoney = value => {
    if (this.payId === 0) {
      this.props.form.setFieldsValue({
        money: value
      });
    } else {
      this.props.form.setFieldsValue({
        amount: value
      });
    }
    this.props.depositsStore.moneyList.map(item => {
      item.isSelect = item.value === value;
      return item;
    });
  };

  onChange = clientBankInfo => {
    const { id, minAmount, maxAmount } = clientBankInfo;
    this.bankMaxAmount = maxAmount;
    this.bankMinAmount = minAmount;
    this.props.form.setFieldsValue({
      clientBankId: id
    });
  };

  changeUserBankInfo = () => {
    this.showUserBankInfo = !this.showUserBankInfo;
  };

  @observable
  files = [];

  onFilesChange = files => {
    this.files = files;
  };

  onFilesError = (error, file) => {
    console.log("error code " + error.code + ": " + error.message);
  };

  removeFile = () => {
    this.files.pop();
  };

  render() {
    const { getFieldProps } = this.props.form;
    const intl = this.props.intl;
    const { formatMessage } = this.props.intl;
    return (
      <>
        <JxSelect
          OptionComponent={ClientDepositItem}
          listData={this.depositOptionsList}
          className={styles.depositList}
          onChange={this.onChangeDepositOption}
        />
        {this.payType === "Bank" ? (
          <div>
            <div className={styles.formContainerTop}>
              <div className={styles.title}>
                <FormattedMessage
                  id="funds.transferAmount"
                  defaultMessage="充值金额"
                />
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
                      validator: (rule, value) =>
                        this.bankMinAmount <= value &&
                        value <= this.bankMaxAmount,
                      message: formatMessage(messages.entryMinMax, {
                        max: this.bankMaxAmount,
                        min: this.bankMinAmount
                      })
                    }
                  ]
                })}
                onChange={this.changeMoney}
                className={`${styles.input} ${styles.numInput}`}
              >
                <JxSelect
                  className={styles.select}
                  listData={this.moneyList}
                  OptionComponent={MoneyItem}
                  onChange={this.selectMoney}
                />
              </JxSupKeyBoard>
              <div className={styles.title}>
                {intl.formatMessage(messages.bankNo)}
                <span>*</span>
              </div>
            </div>
            {this.showClientBankList ? (
              <JxSelect
                className={styles.bankContainer}
                listData={this.clientBankList}
                OptionComponent={ClientBankItem}
                {...getFieldProps("clientBankId", {})}
                autoFirstEvent={true}
                onChange={this.onChange}
              />
            ) : null}
            <div className={styles.formContainer}>
              <div className={styles.title}>
                <FormattedMessage
                  id="funds.transferTime"
                  defaultMessage="充值时间"
                />
                <span>*</span>
              </div>
              <DatePicker
                {...getFieldProps("depositTime", {
                  rules: [
                    {
                      required: true,
                      message: intl.formatMessage(messages.entryDepositTime)
                    }
                  ]
                })}
              >
                <List.Item className={styles.input} arrow="down" />
              </DatePicker>
              <div className={styles.title}>
                <FormattedMessage
                  id="funds.transferChannel"
                  defaultMessage="充值渠道"
                />
                <span>*</span>
              </div>
              <Picker
                data={this.depositChannelList}
                cascade={false}
                {...getFieldProps("channel", {
                  rules: [
                    {
                      required: true,
                      message: intl.formatMessage(messages.selectChannel)
                    }
                  ]
                })}
                onChange={this.changeChannel}
              >
                <List.Item className={styles.input} arrow="down" />
              </Picker>
              <div style={{ display: this.showUserBank ? "block" : "none" }}>
                <div className={styles.title}>
                  <FormattedMessage
                    id="funds.bankDetail"
                    defaultMessage="银行信息"
                  />
                  <span>*</span>
                </div>
                {this.ShowSupportBankList ? (
                  <JxFlex className={styles.userBankContainer} addAlignCenter>
                    <Picker
                      data={this.supportBankList}
                      cascade={false}
                      {...getFieldProps("memberBank", {
                        initialValue: [this.supportBankList[0][0].value]
                      })}
                      onChange={this.changeBank}
                    >
                      <List.Item className={styles.input} arrow="down" />
                    </Picker>
                    <div
                      className={this.userBankStyle}
                      onClick={this.changeUserBankInfo}
                    />
                  </JxFlex>
                ) : (
                  <List.Item className={styles.input} />
                )}

                <div
                  style={{ display: this.showUserBankInfo ? "block" : "none" }}
                >
                  <InputView
                    text={intl.formatMessage(messages.bankNo)}
                    type={"bankCard"}
                    disabled={this.hasBank}
                    {...getFieldProps("memberBankCardNumber", {
                      rules: [
                        {
                          required: true,
                          message: intl.formatMessage(messages.entryBankNo)
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
                    text={
                      <FormattedMessage id="user.name" defaultMessage="姓名" />
                    }
                    disabled
                    value={this.userName}
                  />
                </div>
              </div>
              <JxFlex>
                <Files
                  className={styles.fileUploadButton}
                  onChange={this.onFilesChange}
                  onError={this.onFilesError}
                  accepts={["image/*"]}
                  multiple
                  maxFiles={1}
                  maxFileSize={10000000}
                  minFileSize={0}
                  clickable
                >
                  Upload Receipt
                </Files>
                {this.files.map((file, index) => {
                  return (
                    <img
                      key={index}
                      alt={""}
                      onClick={() => this.removeFile(file)}
                      className={styles.imgFile}
                      src={file.preview.url}
                    />
                  );
                })}
              </JxFlex>

              <AppButton
                theme="color1"
                onClick={this.submitAction}
                className={styles.systemButton}
                disabled={this.checkDeposits}
              >
                <FormattedMessage id="funds.submit" defaultMessage="提交" />
              </AppButton>
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.formContainerTop}>
              <div className={styles.title}>
                <FormattedMessage
                  id="funds.transferAmount"
                  defaultMessage="充值金额"
                />
                <span>*</span>
              </div>
              <JxSupKeyBoard
                type={"float"}
                {...getFieldProps("amount", {
                  rules: [
                    {
                      required: true,
                      message: intl.formatMessage(messages.entryAmount)
                    },
                    {
                      validator: (rule, value) =>
                        value <= this.maxThirdAmount &&
                        this.minThirdAmount <= value,
                      message: formatMessage(messages.entryMinMax, {
                        max: this.maxThirdAmount,
                        min: this.minThirdAmount
                      })
                    }
                  ]
                })}
                onChange={this.changeMoney}
                className={`${styles.input} ${styles.numInput}`}
              >
                <JxSelect
                  className={styles.select}
                  listData={this.moneyList}
                  OptionComponent={MoneyItem}
                  onChange={this.selectMoney}
                />
              </JxSupKeyBoard>
            </div>
            {(this.payType === "SurePay" || this.payType === "FPX") && this.thirdClientBankList.length > 0 ? (
              <>
                <div className={styles.formContainerTop}>
                  <div className={styles.title}>
                    {intl.formatMessage(messages.bankNo)}
                    <span>*</span>
                  </div>
                </div>
                <JxSelect
                  className={styles.bankContainer}
                  listData={this.thirdClientBankList}
                  OptionComponent={ClientThirdBankItem}
                  {...getFieldProps("selectBank", {})}
                  autoFirstEvent={true}
                  onChange={this.onThirdBankChange}
                />
              </>
            ) : null}
            <div className={styles.formContainer}>
              <AppButton
                theme="color1"
                onClick={this.submitAction}
                className={styles.systemButton}
                disabled={this.checkDeposits}
              >
                <FormattedMessage id="funds.submit" defaultMessage="提交" />
              </AppButton>
            </div>
          </div>
        )}
      </>
    );
  }
}

const DepositsFormValidate = createForm()(injectIntl(DepositsForm));

@observer
class DepositsPage extends React.Component {
  depositsStore = new DepositsStore();
  render() {
    return (
      <JxPage storeKey={"depositsStore"} storeValue={this.depositsStore}>
        <JxNavBar>
          <FormattedMessage id="home.deposits" defaultMessage={"Deposits"} />
        </JxNavBar>
        <JxContent>
          <DepositsFormValidate />
        </JxContent>
      </JxPage>
    );
  }
}

export default hot(injectIntl(DepositsPage));
