import {action, observable} from "mobx";
import {appDownApi} from "../services/App.services";

/**
 * 用户登录操作集合
 */
export default class DownStore {
  @observable
  listData = [];

  constructor() {
    this.initData().then();
  }

  @action
  async initData() {
    const responseData = await appDownApi();
    if (responseData) {
      this.listData = responseData;
    }
  }
}
