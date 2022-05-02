import React from "react";
import {inject, observer} from "mobx-react";
import JxPage from "../../components/jxPage/JxPage";
import JxContent from "../../components/jxContent/JxContent";
import JxNavBar from "../../components/jxNavBar/JxNavBar";
import JxModule from "../../components/jxModule/JxModule";
import {hot} from "react-hot-loader/root";
import RegisterStore from "../../store/RegisterStore";
import {AppButton} from "jxComponents/jxButton";
import styles from "./RegisterPage.module.less";
import {computed} from "mobx";
import {showToast} from "jxUtils/common";
import {forOwn} from "lodash";
import {createForm} from "rc-form";
import InputView from "../login/views/InputView";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import {defineMessages, FormattedMessage, injectIntl} from "react-intl";

const messages = defineMessages({
  username: {
    id: "user.username",
    defaultMessage: "用户名"
  },
  password: {
    id: "user.password",
    defaultMessage: "密码"
  },
  promoteCode: {
    id: "user.promoteCode",
    defaultMessage: "邀请码"
  },
  entryUsername: {
    id: "user.entryUsername",
    defaultMessage: "请输入用户名"
  },
  usernameErr: {
    id: "user.usernameErr",
    defaultMessage: "用户名错误(4-20位数字和字母)"
  },
  entryPassword: {
    id: "user.entryPassword",
    defaultMessage: "请输入密码"
  },
  configPassword: {
    id: "user.configPassword",
    defaultMessage: "确认密码"
  },
  errorHasName: {
    id: "register.errorHasName",
    defaultMessage: "用户名已存在！"
  }
});

@inject("registerStore", "homeStore", "userStore")
@observer
class RegisterForm extends React.Component {
  @computed
  get userInfoParams() {
    return this.props.registerStore.userInfoParams;
  }

  @computed
  get promoteCode() {
    return this.props.registerStore.promoteCode;
  }

  checkUserName = (rule, value, callback) => {
    this.props.registerStore.checkUserName(value).then(state => {
      if (state) {
        callback();
      } else {
        const { formatMessage } = this.props.intl;
        callback(formatMessage(messages.errorHasName));
      }
    });
  };

  //注册综合判断
  goRegister = () => {
    this.props.form.validateFields((error, formData) => {
      if (error === null) {
        if (formData.password !== formData.safetyPassword) {
          showToast(
            <FormattedMessage
              id="user.entrySamePassword"
              defaultMessage="请重复输入一样的密码"
            />
          );
          return;
        }
        this.props.registerStore.baseRegister(formData);
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

  onErrorClick = field => {
    const { getFieldError } = this.props.form;
    showToast(getFieldError(field).join(","));
  };

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    const { formatMessage } = this.props.intl;
    return (
      <div className={styles.formContainer}>
        <div className={styles.tipContainer}>
          <JxFlex addAlignCenter className={styles.qiuLine}>
            <div className={styles.qiu} />
            <div className={styles.line} />
          </JxFlex>
          <div className={styles.text1}>
            <FormattedMessage id="common.step1" defaultMessage="第一步" />
          </div>
          <div className={styles.text2}>
            <FormattedMessage id="user.basicInfo" defaultMessage="基础信息" />
          </div>
        </div>
        <div className={styles.formContainer2}>
          <InputView
            focus="true"
            placeholder={formatMessage(messages.username)}
            text={formatMessage(messages.username)}
            error={getFieldError("username")}
            onErrorClick={() => this.onErrorClick("username")}
            {...getFieldProps("username", {
              validateTrigger: "onBlur",
              validateFirst: true,
              rules: [
                {
                  required: true,
                  message: formatMessage(messages.entryUsername)
                },
                {
                  pattern: /^[0-9a-zA-Z]{5,20}$/,
                  message: formatMessage(messages.usernameErr)
                },
                {
                  validator: this.checkUserName
                }
              ]
            })}
          />
          <InputView
            type={"password"}
            text={formatMessage(messages.password)}
            placeholder={formatMessage(messages.password)}
            onKeyPress={this.onKeyPress}
            error={getFieldError("password")}
            onErrorClick={() => this.onErrorClick("password")}
            {...getFieldProps("password", {
              rules: [
                {
                  required: true,
                  message: formatMessage(messages.entryPassword)
                }
              ]
            })}
          />
          <InputView
            type={"password"}
            text={formatMessage(messages.configPassword)}
            placeholder={formatMessage(messages.configPassword)}
            error={getFieldError("safetyPassword")}
            onErrorClick={() => this.onErrorClick("safetyPassword")}
            onKeyPress={this.onKeyPress}
            {...getFieldProps("safetyPassword", {
              rules: [
                {
                  required: true,
                  message: formatMessage(messages.entryPassword)
                }
              ]
            })}
          />
          <InputView
            disabled={this.promoteCode}
            onKeyPress={this.onKeyPress}
            required={false}
            text={formatMessage(messages.promoteCode)}
            value={this.promoteCode}
            placeholder={formatMessage(messages.promoteCode)}
            {...getFieldProps("promoteCode", {})}
          />
          <AppButton onClick={this.goRegister} className={styles.systemButton}>
            <FormattedMessage id="user.next" defaultMessage="下一步" />
          </AppButton>
        </div>
      </div>
    );
  }
}

const RegisterFormValidate = createForm()(injectIntl(RegisterForm));

@observer
class RegisterPage extends JxModule {
  registerStore = new RegisterStore();

  render() {
    return (
      <JxPage
        storeKey={"registerStore"}
        storeValue={this.registerStore}
        className={styles.container}
      >
        <JxNavBar className={styles.navBar}>
          <FormattedMessage id="user.registerInfo" defaultMessage="注册信息" />
        </JxNavBar>
        <JxContent>
          <RegisterFormValidate />
        </JxContent>
      </JxPage>
    );
  }
}

export default hot(RegisterPage);
