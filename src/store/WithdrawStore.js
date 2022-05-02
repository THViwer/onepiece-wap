import {action, observable} from "mobx";
import {checkBankApi, checkBetApi, userBankApi, withdrawApi} from "../services/User.service";
import {showToast} from "jxUtils/common";
import appController from "./AppController";
import {defineMessages, FormattedMessage} from "react-intl";
import React from "react";

const messages = defineMessages({
  errorNeedBet: {
    id: "withdraw.errorNeedBet",
    defaultMessage: "打码量不足，还需打码量{value}"
  }
});

export default class WithdrawStore {
  @observable
  supportBankList = [];

  @observable
  supportWithdraw = true;

  showErrorMessage = ()=>{};

  async initData(formatMessage) {
    checkBetApi().then(resultData => {
      if (resultData) {
        const { currentBet, needBet, overBet } = resultData;
        if (currentBet < needBet) {
          this.showErrorMessage = () => {
            showToast(formatMessage(messages.errorNeedBet, { value: overBet }));
          };
          this.supportWithdraw = false;
        }
      }
    });

    let responseData = await userBankApi();
    if (responseData) {
      responseData.map(item => {
        item.value = item.bank;
        item.label = item.bank;
        return item;
      });
      this.supportBankList = [responseData];
    }
  }

  @action
  async goWithdraw(userInfo, formatMessage) {
    const { memberBankId, bankCardNumber } = userInfo;
    if (memberBankId === undefined) {
      const checkResponseData = await checkBankApi({
        bankCardNo: bankCardNumber
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
    }

    const responseData = await checkBetApi();
    if (responseData) {
      const { currentBet, needBet, overBet } = responseData;
      if (currentBet < needBet) {
        showToast(formatMessage(messages.errorNeedBet, { value: overBet }));
        return false;
      }
    }

    const withdrawResponse = await withdrawApi(userInfo);
    if (withdrawResponse) {
      showToast(
        <FormattedMessage id="withdraw.success" defaultMessage="提款申请中" />
      );
      appController.navBack();
    }
  }
}
