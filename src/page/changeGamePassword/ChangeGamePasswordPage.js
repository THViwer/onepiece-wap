import React from "react";
import {inject, observer} from "mobx-react";
import JxPage from "../../components/jxPage/JxPage";
import JxContent from "../../components/jxContent/JxContent";
import JxNavBar from "../../components/jxNavBar/JxNavBar";
import {hot} from "react-hot-loader/root";
import {AppButton} from "jxComponents/jxButton";
import styles from "./ChangeGamePasswordPage.module.less";
import {showToast} from "jxUtils/common";
import {forOwn} from "lodash";
import {createForm} from "rc-form";
import InputView from "../login/views/InputView";
import {computed} from "mobx";
import {defineMessages, FormattedMessage, injectIntl} from "react-intl";

const messages = defineMessages({
  account: {
    id: "user.account",
    defaultMessage: "账号"
  },
  currentPassword: {
    id: "user.currentPassword",
    defaultMessage: "当前密码"
  },
  newPassword: {
    id: "user.newPassword",
    defaultMessage: "新密码"
  },
  entryPassword: {
    id: "user.entryPassword",
    defaultMessage: "请输入密码"
  },
  configPassword: {
    id: "user.configPassword",
    defaultMessage: "确认密码"
  },
  repeatPassword: {
    id: "user.repeatPassword",
    defaultMessage: "请重复输入一样的新密码"
  },
  passwordNoAllNum: {
    id: "user.passwordNoAllNum",
    defaultMessage: "密码不能全部是数字"
  },
  save: {
    id: "user.save",
    defaultMessage: "保存"
  }
});

@inject("accountManageStore")
@observer
class RegisterForm extends React.Component {
  @computed
  get changePlatform() {
    return this.props.accountManageStore.changePlatform;
  }

  //注册综合判断
  goRegister = () => {
    this.props.form.validateFields((error, formData) => {
      if (error === null) {
        if (formData.password !== formData.safetyPassword) {
          const pwdErr = this.props.intl.formatMessage(messages.repeatPassword);
          showToast(pwdErr);
          return;
        }
        this.props.accountManageStore.changePasswordAction(formData).then();
      } else {
        forOwn(error, function(value) {
          showToast(value.errors[0].message);
          return false;
        });
      }
    });
  };

  onKeyPress = a => {
    if (a.charCode === 13) {
      this.goRegister();
    }
  };

  render() {
    const { getFieldProps } = this.props.form;
    const intl = this.props.intl;
    return (
      <div className={styles.formContainer}>
        <InputView
          disabled
          value={this.changePlatform.username}
          text={intl.formatMessage(messages.account)}
        />
        <InputView
          disabled
          value={this.changePlatform.password}
          text={intl.formatMessage(messages.currentPassword)}
        />
        <InputView
          focus="true"
          type={"password"}
          text={intl.formatMessage(messages.newPassword)}
          placeholder={intl.formatMessage(messages.newPassword)}
          onKeyPress={this.onKeyPress}
          {...getFieldProps("password", {
            rules: [
              {
                required: true,
                message: intl.formatMessage(messages.entryPassword)
              },
              {
                pattern: /^.*[a-zA-Z].*$/,
                message: intl.formatMessage(messages.passwordNoAllNum)
              }
            ]
          })}
        />
        <InputView
          type={"password"}
          text={intl.formatMessage(messages.configPassword)}
          placeholder={intl.formatMessage(messages.configPassword)}
          onKeyPress={this.onKeyPress}
          {...getFieldProps("safetyPassword", {
            rules: [
              {
                required: true,
                message: intl.formatMessage(messages.entryPassword)
              },
              {
                pattern: /^.*[a-zA-Z].*$/,
                message: intl.formatMessage(messages.passwordNoAllNum)
              }
            ]
          })}
        />
        <AppButton onClick={this.goRegister} className={styles.systemButton}>
          {intl.formatMessage(messages.save)}
        </AppButton>
      </div>
    );
  }
}

const RegisterFormValidate = createForm()(injectIntl(RegisterForm));

@observer
class ChangeGamePasswordPage extends React.Component {
  accountManageStore = this.props.navParams.accountManageStore;

  render() {
    return (
      <JxPage
        storeKey={"accountManageStore"}
        storeValue={this.accountManageStore}
      >
        <JxNavBar>
          <FormattedMessage
            id="user.changePassword"
            defaultMessage="修改密码"
          />
        </JxNavBar>
        <JxContent>
          <RegisterFormValidate />
        </JxContent>
      </JxPage>
    );
  }
}

export default hot(injectIntl(ChangeGamePasswordPage));
