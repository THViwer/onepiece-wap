import {action, observable} from "mobx";
import {checkBankApi, editUserBankApi} from "../services/User.service";
import {showToast} from "jxUtils/common";
import {FormattedMessage} from "react-intl";
import appController from "./AppController";
import React from "react";

export default class EditBankStore {
  @observable
  bankInfo = {};

  constructor(bankInfo) {
    this.bankInfo = bankInfo;
  }

  @action
  async editBankAction(bankInfo) {
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
    const responseData = await editUserBankApi({
      ...bankInfo,
      id: this.bankInfo.id,
      status: "Normal"
    });
    if (responseData) {
      showToast(
        <FormattedMessage id="withdraw.EditSuccess" defaultMessage="修改成功" />
      );
      appController.navBack();
    }
  }
}
