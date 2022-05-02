import React from "react";
import {inject, observer} from "mobx-react";
import JxPage from "jxComponents/jxPage/JxPage";
import JxContent from "jxComponents/jxContent/JxContent";
import JxNavBar from "jxComponents/jxNavBar/JxNavBar";
import {defineMessages, FormattedMessage, injectIntl} from "react-intl";
import {forOwn} from "lodash";
import {showToast} from "jxUtils/common";
import {AppButton} from "jxComponents/jxButton";
import {createForm} from "rc-form";
import {computed} from "mobx";
import InputView from "../login/views/InputView";
import styles from "./EditBankPage.module.less";
import {hot} from "react-hot-loader/root";
import EditBankStore from "../../store/EditBankStore";

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

@inject("editBankStore", "userStore")
@observer
class WithdrawForm extends React.Component {
  @computed get userName() {
    return this.props.userStore.realName;
  }

  @computed get bank() {
    return this.props.editBankStore.bankInfo.bank;
  }

  submitAction = () => {
    this.props.form.validateFields((error, formData) => {
      if (error === null) {
        let {  bankCardNumber } = formData;
        formData.bankCardNumber = bankCardNumber.replace(/ /g, "");
        this.props.editBankStore.editBankAction(formData).then();
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
        <InputView
          disabled
          text={<FormattedMessage id="funds.bank" defaultMessage="银行" />}
          value={this.userName}
          {...getFieldProps("bank", {
            initialValue: this.bank
          })}
        />
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
class EditBankPage extends React.Component {
  editBankStore;

  constructor(props) {
    super(props);
    this.editBankStore = new EditBankStore(this.props.navParams);
  }

  render() {
    return (
      <JxPage storeKey={"editBankStore"} storeValue={this.editBankStore}>
        <JxNavBar>
          <FormattedMessage
            id="editBankPage.title"
            defaultMessage={"修改银行卡"}
          />
        </JxNavBar>
        <JxContent>
          <WithdrawFormValidate />
        </JxContent>
      </JxPage>
    );
  }
}

export default hot(injectIntl(EditBankPage));
