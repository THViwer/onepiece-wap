import React from "react";
import {inject, observer} from "mobx-react";
import JxPage from "../../components/jxPage/JxPage";
import JxContent from "../../components/jxContent/JxContent";
import JxNavBar from "../../components/jxNavBar/JxNavBar";
import JxModule from "../../components/jxModule/JxModule";
import {hot} from "react-hot-loader/root";
import {AppButton} from "jxComponents/jxButton";
import styles from "./ChangePasswordPage.module.less";
import {showToast} from "jxUtils/common";
import {forOwn} from "lodash";
import {createForm} from "rc-form";
import InputView from "../login/views/InputView";
import ChangePasswordStore from "../../store/ChangePasswordStore";
import {defineMessages, injectIntl} from "react-intl";


const messages = defineMessages({
  entryUsername: {
    id: 'user.entryUsername',
    defaultMessage: '请输入账号',
  },
  usernameErr: {
    id: 'user.usernameErr',
    defaultMessage: '用户名错误(4-12位数字和字母)',
  },
  newPassword: {
    id: 'user.newPassword',
    defaultMessage: '新密码',
  },
  currentPassword: {
    id: 'user.currentPassword',
    defaultMessage: '当前密码',
  },
  entryPassword: {
    id: 'user.entryPassword',
    defaultMessage: '请输入密码',
  },
  configPassword: {
    id: 'user.configPassword',
    defaultMessage: '确认密码',
  },

  save: {
    id: 'common.save',
    defaultMessage: '保存',
  }

});

@inject("changePasswordStore")
@observer
class RegisterForm extends React.Component {
  //注册综合判断
  goRegister = () => {
    this.props.form.validateFields((error, formData) => {
      if (error === null) {
        if (formData.password !== formData.safetyPassword) {
          showToast(this.props.intl.formatMessage(messages.repeatPassword));
          return;
        }
        this.props.changePasswordStore.changePasswordAction(formData).then();
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
              type={"password"}
              focus="true"
              text={intl.formatMessage(messages.currentPassword)}
              placeholder={intl.formatMessage(messages.currentPassword)}
              {...getFieldProps("oldPassword", {
                rules: [
                  {
                    required: true,
                    message: intl.formatMessage(messages.entryUsername)
                  },
                  {
                    pattern: /^[0-9a-zA-Z]{4,12}$/,
                    message: intl.formatMessage(messages.usernameErr)
                  }
                ]
              })}
          />
          <InputView
              type={"password"}
              text={intl.formatMessage(messages.newPassword)}
              placeholder={intl.formatMessage(messages.newPassword)}
              onKeyPress={this.onKeyPress}
              {...getFieldProps("password", {
                rules: [
                  {
                    required: true,
                    message: intl.formatMessage(messages.entryPassword)
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
class ChangePasswordPage extends JxModule {
  changePasswordStore = new ChangePasswordStore();

  render() {
    return (
        <JxPage
            storeKey={"changePasswordStore"}
            storeValue={this.changePasswordStore}
        >
          <JxNavBar>Change Password</JxNavBar>
          <JxContent>
            <RegisterFormValidate />
          </JxContent>
        </JxPage>
    );
  }
}

export default hot(ChangePasswordPage);
