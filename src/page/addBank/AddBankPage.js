import React from "react";
import {inject, observer} from "mobx-react";
import JxPage from "jxComponents/jxPage/JxPage";
import JxContent from "jxComponents/jxContent/JxContent";
import JxNavBar from "jxComponents/jxNavBar/JxNavBar";
import {defineMessages, FormattedMessage, injectIntl} from "react-intl";
import {forOwn} from "lodash";
import {showToast} from "jxUtils/common";
import {List, Picker} from "antd-mobile";
import {AppButton} from "jxComponents/jxButton";
import {createForm} from "rc-form";
import {computed} from "mobx";
import InputView from "../login/views/InputView";
import styles from "./AddBankPage.module.less";
import {hot} from "react-hot-loader/root";
import AddBankStore from "../../store/AddBankStore";

const messages = defineMessages({
  name: {
    id: "funds.name",
    defaultMessage: "姓名"
  },
  bankNo: {
    id: "funds.accountNo",
    defaultMessage: "卡号"
  },
  entryBankNo: {
    id: "funds.entryBankNo",
    defaultMessage: "请输入卡号"
  },
  bindBank: {
    id: "funds.bindBank",
    defaultMessage: "绑定银行卡"
  },
  save: {
    id: "common.save",
    defaultMessage: "保存"
  },
  bankLength: {
    id: "user.bankLength",
    defaultMessage: "请输入正确的银行卡号"
  }
});

@inject("addBankStore", "userStore")
@observer
class WithdrawForm extends React.Component {
  @computed get userName() {
    return this.props.userStore.realName;
  }
  @computed get supportBankList() {
    const { supportBankList } = this.props.addBankStore;
    return supportBankList;
  }

  @computed get ShowSupportBankList() {
    return this.supportBankList.length > 0;
  }

  submitAction = () => {
    this.props.form.validateFields((error, formData) => {
      if (error === null) {
        let { bank, bankCardNumber } = formData;
        formData.bank = bank[0];
        formData.bankCardNumber = bankCardNumber.replace(/ /g, "");
        this.props.addBankStore.addBankAction(formData).then();
      } else {
        forOwn(error, function(value) {
          showToast(value.errors[0].message);
          return false;
        });
      }
    });
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
          >
            <List.Item className={styles.input} arrow="down" />
          </Picker>
        ) : (
          <List.Item className={styles.input} />
        )}
        <InputView
          disabled
          text={<FormattedMessage id="user.name" defaultMessage="姓名" />}
          value={this.userName}
        />
        <InputView
          text={intl.formatMessage(messages.bankNo)}
          type={"bankCard"}
          {...getFieldProps("bankCardNumber", {
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
        <AppButton
          theme="color1"
          onClick={this.submitAction}
          className={styles.systemButton}
        >
          {intl.formatMessage(messages.save)}
        </AppButton>
      </div>
    );
  }
}

const WithdrawFormValidate = createForm()(injectIntl(WithdrawForm));

@observer
class AddBankPage extends React.Component {
  addBankStore = new AddBankStore();

  render() {
    return (
      <JxPage storeKey={"addBankStore"} storeValue={this.addBankStore}>
        <JxNavBar>
          <FormattedMessage
            id="AddBankPage.title"
            defaultMessage={"绑定银行"}
          />
        </JxNavBar>
        <JxContent>
          <WithdrawFormValidate />
        </JxContent>
      </JxPage>
    );
  }
}

export default hot(injectIntl(AddBankPage));
