import React from "react";
import {hot} from "react-hot-loader/root";
import {inject, observer} from "mobx-react";
import JxModule from "jxComponents/jxModule/JxModule";
import {createForm} from "rc-form";
import JxPage from "jxComponents/jxPage/JxPage";
import JxContent from "jxComponents/jxContent/JxContent";
import JxNavBar from "jxComponents/jxNavBar/JxNavBar";
import {AppButton} from "jxComponents/jxButton";
import {showToast} from "jxUtils/common";
import styles from "./LoginPage.module.less";
import {forOwn} from "lodash";
import UserLoginStore from "../../store/UserLoginStore";
import InputView from "./views/InputView";
import {defineMessages, injectIntl} from "react-intl";

const messages = defineMessages({
  username: {
    id: "user.username",
    defaultMessage: "用户名"
  },
  password: {
    id: "user.password",
    defaultMessage: "密码"
  },
  entryUsername: {
    id: "user.entryUsername",
    defaultMessage: "请输入用户名"
  },
  usernameErr: {
    id: "user.usernameErr",
    defaultMessage: "用户名错误(4-12位数字和字母)"
  },
  entryPassword: {
    id: "user.entryPassword",
    defaultMessage: "请输入密码"
  }
});

@injectIntl
@observer
class LoginForm extends React.Component {
  componentDidMount() {
    this.props.form.setFieldsValue({
      username: this.props.userStore.userName
    });
  }

  //普通登录没有验证码
  baseLoginAction = () => {
    this.props.form.validateFields((error, formData) => {
      if (error === null) {
        this.props.userLoginStore
          .loginAction(formData, this.props.navParams.loginSuccess, () => {})
          .then();
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
      this.baseLoginAction();
    }
  };

  render() {
    const { getFieldProps } = this.props.form;
    const { formatMessage } = this.props.intl;
    return (
      <div className={styles.formContainer}>
        <InputView
          labelNumber={2}
          focus="true"
          placeholder={formatMessage(messages.username)}
          text={formatMessage(messages.username)}
          {...getFieldProps("username", {
            rules: [
              {
                required: true,
                message: formatMessage(messages.entryUsername)
              },
              {
                pattern: /^[0-9a-zA-Z]{4,20}$/,
                message: formatMessage(messages.usernameErr)
              }
            ]
          })}
        />
        <InputView
          type={"password"}
          labelNumber={2}
          text={formatMessage(messages.password)}
          placeholder={formatMessage(messages.password)}
          onKeyPress={this.onKeyPress}
          {...getFieldProps("password", {
            rules: [
              {
                required: true,
                message: formatMessage(messages.entryPassword)
              }
            ]
          })}
        />

        <AppButton
          onClick={this.baseLoginAction}
          className={styles.systemButton}
        >
          LOGIN NOW
        </AppButton>
      </div>
    );
  }
}

const LoginFormValidate = createForm()(injectIntl(LoginForm));

@inject("userStore", "homeStore")
@observer
class LoginPage extends JxModule {
  userLoginStore = new UserLoginStore();

  goService = () => {
    // this.props.userStore.goCUSServicePage();
  };

  render() {
    return (
      <JxPage className={styles.container}>
        <JxNavBar className={styles.navBar} onRightClick={this.goService}>
          LOGIN INFO
        </JxNavBar>
        <JxContent>
          <LoginFormValidate
            {...this.props}
            userLoginStore={this.userLoginStore}
          />
        </JxContent>
      </JxPage>
    );
  }
}

export default hot(LoginPage);
