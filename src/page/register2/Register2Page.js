import React from "react";
import {inject, observer} from "mobx-react";
import JxPage from "../../components/jxPage/JxPage";
import JxContent from "../../components/jxContent/JxContent";
import JxNavBar from "../../components/jxNavBar/JxNavBar";
import JxModule from "../../components/jxModule/JxModule";
import {hot} from "react-hot-loader/root";
import {AppButton} from "jxComponents/jxButton";
import styles from "./Register2Page.module.less";
import {computed} from "mobx";
import {showToast} from "jxUtils/common";
import {forOwn} from "lodash";
import {createForm} from "rc-form";
import InputView from "../login/views/InputView";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import {defineMessages, FormattedMessage, injectIntl} from "react-intl";
import {InputItem} from "antd-mobile";
import SelectCountryView, {CountryPrefixSelector} from "./views/SelectCountryView";

const messages = defineMessages({
  phone: {
    id: "user.phone",
    defaultMessage: "手机号"
  },
  entryPhone: {
    id: "user.entryPhone",
    defaultMessage: "请输入手机号"
  },
  name: {
    id: "user.name",
    defaultMessage: "姓名"
  },
  entryName: {
    id: "user.entryName",
    defaultMessage: "请输入姓名"
  },
  phoneGuidError: {
    id: "user.phoneGuidError",
    defaultMessage: "手机号错误(10-13位数字)"
  },
  errorHasPhone: {
    id: "register.errorHasPhone",
    defaultMessage: "手机号已存在！"
  }
});

@inject("registerStore", "homeStore", "userStore")
@observer
class RegisterForm extends React.Component {
  @computed
  get userInfoParams() {
    return this.props.registerStore.userInfoParams;
  }

  @computed get countryIconList() {
    const { countryList } = this.props.registerStore;
    let countryNumList = [
      {
        value: "60",
        country: "Malaysia",
        label: (
          <JxFlex className={styles.pickItem}>
            <div className={styles.malaysia} /> 60
          </JxFlex>
        )
      },
      {
        value: "62",
        country: "Indonesia",
        label: (
          <JxFlex className={styles.pickItem}>
            <div className={styles.indonesia} /> 62
          </JxFlex>
        )
      },
      {
        value: "65",
        country: "Singapore",
        label: (
          <JxFlex className={styles.pickItem}>
            <div className={styles.singapore} /> 65
          </JxFlex>
        )
      },
      {
        value: "66",
        country: "Thailand",
        label: (
          <JxFlex className={styles.pickItem}>
            <div className={styles.thailand} /> 66
          </JxFlex>
        )
      },
      {
        value: "84",
        country: "Vietnam",
        label: (
          <JxFlex className={styles.pickItem}>
            <div className={styles.vietnam} /> 84
          </JxFlex>
        )
      }
    ];
    return [
      countryNumList.filter(item => {
        return countryList.includes(item.country);
      })
    ];
  }

  @computed get countryNameList() {
    let countryName = [];
    this.props.registerStore.countryList.forEach(item => {
      countryName.push({
        value: item,
        label: item
      });
    });
    return [countryName];
  }

  //注册综合判断
  goRegister = () => {
    this.props.form.validateFields((error, formData) => {
      if (error === null) {
        formData.country = formData.country[0];
        formData.phone =
          formData["phonePrefix"][0] + formData.phone.replace(/ /g, "");
        this.props.registerStore.submitRegisterInfo(formData, () => {}).then();
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

  checkPhone = (rule, value, callback) => {
    const { form } = this.props;
    const phonePrefixValue = form.getFieldValue("phonePrefix")[0];
    this.props.registerStore
      .checkPhone(phonePrefixValue + value.replace(/ /g, ""))
      .then(state => {
        if (state) {
          callback();
        } else {
          const { formatMessage } = this.props.intl;
          callback(formatMessage(messages.errorHasPhone));
        }
      });
  };

  changeCountryNo = countryInfo => {
    const selectCountryItem = this.countryIconList[0].find(item => {
      return item.value === countryInfo[0];
    });
    const { form } = this.props;
    form.setFieldsValue({ country: [selectCountryItem.country] });
  };

  render() {
    const { getFieldProps, getFieldError, getFieldDecorator } = this.props.form;
    const { formatMessage } = this.props.intl;
    return (
      <div className={styles.formContainer}>
        <div className={styles.tipContainer}>
          <JxFlex addAlignCenter className={styles.qiuLine}>
            <div className={styles.line} />
            <div className={styles.qiu} />
          </JxFlex>
          <div className={styles.text1}>
            <FormattedMessage id="common.step2" defaultMessage="第二步" />
          </div>
          <div className={styles.text2}>
            <FormattedMessage id="user.name" defaultMessage="姓名" />
          </div>
        </div>
        <div className={styles.formContainer2}>
          <div className={styles.title}>
            {formatMessage(messages.phone)}
            <span>*</span>
          </div>
          <JxFlex>
            {this.countryIconList[0].length > 0
              ? getFieldDecorator("phonePrefix", {
                  initialValue: [this.countryIconList[0][0].value]
                })(
                  <CountryPrefixSelector
                    countryList={this.countryIconList}
                    onChange={this.changeCountryNo}
                  />
                )
              : null}
            <InputItem
              focus="true"
              text={formatMessage(messages.phone)}
              placeholder={formatMessage(messages.phone)}
              error={getFieldError("phone")}
              onErrorClick={() => this.onErrorClick("phone")}
              {...getFieldProps("phone", {
                validateTrigger: "onBlur",
                validateFirst: true,
                rules: [
                  {
                    required: true,
                    message: formatMessage(messages.entryPhone)
                  },
                  {
                    validator: (rule, value) => {
                      return /^\d{8,11}$/.test(value.replace(/ /g, ""));
                    },
                    message: formatMessage(messages.phoneGuidError)
                  },
                  {
                    validator: this.checkPhone
                  }
                ]
              })}
              className={styles.input}
            />
          </JxFlex>
          <div className={styles.title}>
            <FormattedMessage id="user.country" defaultMessage="Country" />
            <span>*</span>
          </div>
          {this.countryNameList[0].length > 0
            ? getFieldDecorator("country", {
                initialValue: [this.countryNameList[0][0].value]
              })(<SelectCountryView countryNameList={this.countryNameList} />)
            : null}
          <InputView
            onKeyPress={this.onKeyPress}
            text={formatMessage(messages.name)}
            placeholder={formatMessage(messages.name)}
            error={getFieldError("name")}
            onErrorClick={() => this.onErrorClick("name")}
            {...getFieldProps("name", {
              rules: [
                {
                  required: true,
                  message: formatMessage(messages.entryName)
                }
              ]
            })}
          />
          <AppButton onClick={this.goRegister} className={styles.systemButton}>
            JOIN NOW
          </AppButton>
        </div>
      </div>
    );
  }
}

const RegisterFormValidate = createForm()(injectIntl(RegisterForm));

@observer
class Register2Page extends JxModule {
  render() {
    return (
      <JxPage
        storeKey={"registerStore"}
        storeValue={this.props.navParams.registerStore}
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

export default hot(Register2Page);
