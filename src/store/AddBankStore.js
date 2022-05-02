import {addUserBankApi, checkBankApi, userBankApi} from "../services/User.service";
import {action, observable} from "mobx";
import {showToast} from "jxUtils/common";
import appController from "./AppController";
import React from "react";
import {FormattedMessage} from "react-intl";

export default class AddBankStore {
  @observable
  supportBankList = [];

  constructor() {
    this.initData();
  }

  async initData() {
    let responseData = await userBankApi();
    if (responseData) {
      let listData = responseData.filter(item => {
        item.value = item.bank;
        item.label = item.bank;
        return item.id === -1;
      });
      this.supportBankList = [listData];
    }
  }

  @action
  async addBankAction(bankInfo) {
    const checkResponseData = await checkBankApi({
      bankCardNo: bankInfo.bankCardNumber
    });
    if (checkResponseData) {
      const { exist = true } = checkResponseData;
      if (exist) {
        showToast(
          <FormattedMessage
            id="withdraw.errorHasBank"
            defaultMessage="银行卡已存在！"
          />
        );
        return;
      }
    }
    const responseData = await addUserBankApi(bankInfo);
    if (responseData) {
      showToast(
        <FormattedMessage id="withdraw.addSuccess" defaultMessage="添加成功" />
      );
      appController.navBack();
    }
  }
}
