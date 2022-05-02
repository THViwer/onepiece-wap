import {action} from "mobx";
import {loginApi} from "../services/User.service";
import userStore from "./UserStore";
import appController from "./AppController";

/**
 * 用户登录操作集合
 */
export default class UserLoginStore {
  @action
  async loginAction(requestData, successFn, failFn) {
    const responseData = await loginApi(requestData);
    if (responseData) {
      userStore.selectCountryUserInfo(responseData);
      appController.navBack();
    }
  }
}
