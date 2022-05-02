import {action, observable} from "mobx";
import userStore from "./UserStore";
import appController from "./AppController";
import {checkPhoneApi, checkUserNameApi, getSupportCountryApi, registerApi} from "../services/User.service";
// import {urlQueryString} from "jxUtils/common";

export default class RegisterStore {
  userInfo1;

  @observable
  promoteCode;

  @observable
  countryList = [];

  constructor(props) {
    this.promoteCode = localStorage.getItem("affCode");
    this.initRegisterInfo().then();
  }

  async initRegisterInfo() {
    const responseData = await getSupportCountryApi();
    if (responseData) {
      this.countryList = responseData;
    }
  }

  @action
  async checkUserName(username) {
    const checkData = await checkUserNameApi(null, {
      url: {
        username: username
      }
    });
    if (checkData) {
      return !checkData.exist;
    } else {
      return false;
    }
  }

  @action
  async checkPhone(phone) {
    const checkData = await checkPhoneApi(null, {
      url: {
        phone: phone
      }
    });
    return !checkData.exist;
  }

  baseRegister(userInfo) {
    this.userInfo1 = userInfo;
    appController.navPushPage("Register2Page", {
      registerStore: this
    });
  }

  @action
  async submitRegisterInfo(userInfo) {
    userInfo = { ...this.userInfo1, ...userInfo };
    const responseData = await registerApi(userInfo);
    if (responseData) {
      userStore.selectCountryUserInfo(responseData);
      appController.navPopToRootView();
      window.history.replaceState(null, "", "/");
    }
  }
}
