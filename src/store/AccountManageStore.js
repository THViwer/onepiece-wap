import {editPlatformAccountApi, platformAccountListApi} from "../services/User.service";
import {action, observable} from "mobx";
import appController from "./AppController";
import {showToast} from "jxUtils/common";
import React from "react";
import {FormattedMessage} from "react-intl";

export default class AccountManageStore {
  @observable
  menuInfo = [
    {
      id: "slot",
      category: "Slot",
      list: []
    }
    // {
    //   id: "live",
    //   category: "LiveVideo",
    //   list: []
    // },
    // {
    //   id: "sport",
    //   category: "Sport",
    //   list: []
    // },
    // {
    //   id: "fishing",
    //   category: "Fishing",
    //   list: []
    // }
  ];

  @observable
  accountList = [];

  @observable
  showList = false;

  @observable
  changePlatform;

  constructor() {
    this.initData().then();
  }

  @action
  async initData() {
    const responseData = await platformAccountListApi();
    if (responseData) {
      this.accountList = responseData;
      this.updateMenuInfo("0");
      this.showList = true;
    }
  }

  @action
  updateMenuInfo(index) {
    if (index) {
      let menuItem = this.menuInfo[index];
      menuItem.list = this.accountList.filter(item => {
        return item.password !== "-";
      });
      // userStore.getAllPlatformBalance(menuItem.category).then(data => {
      //
      // });
    }
  }

  @action
  goChangePasswordPage(info) {
    this.changePlatform = info;
    appController.navPushPage("ChangeGamePasswordPage", {
      accountManageStore: this
    });
  }

  async changePasswordAction(info) {
    info.platform = this.changePlatform.platform;
    const response = await editPlatformAccountApi(info);
    if (response) {
      showToast(
        <FormattedMessage id="common.changeSuccess" defaultMessage="修改完毕" />
      );
      appController.navPopToRootView();
    }
  }
}
