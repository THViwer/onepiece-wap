import userStore from "./UserStore";
import {action, observable} from "mobx";
import {checkPromotionApi} from "../services/User.service";
import {showToast} from "jxUtils/common";
import React from "react";
import {FormattedMessage} from "react-intl";

export default class PromotionInfoStore {
  @observable
  moneyList = [
    {
      value: 50,
      isSelect: false
    },
    {
      value: 100,
      isSelect: false
    },
    {
      value: 300,
      isSelect: false
    },
    {
      value: 500,
      isSelect: false
    }
  ];

  @observable
  platformBalance = 0;

  @observable
  platform;

  @observable
  supportTransfer = true;

  @observable
  tips;

  @observable
  promotionInfo;

  constructor(info) {
    this.promotionInfo = info;
    this.initData(info).then();
  }

  async initData(info) {
    const { platforms = [], category } = info;

    if (userStore.isLogin && platforms.length === 1) {
      this.platform = platforms[0];
      const balanceInfo = await userStore.getUserPlatformBalance(
        this.platform,
        true
      );
      if (balanceInfo) {
        const { transfer, tips } = balanceInfo;
        this.supportTransfer = transfer;
        this.tips = tips;
        this.platformBalance = balanceInfo.balance;
      }
    }
    if (category === "BackWater") {
      this.supportTransfer = false;
    }
  }

  async transferInfo(info) {
    info.platform = this.platform;
    info.promotionId = info.id;
    // const {maxAmount,minAmount,maxPromotionAmount,promotionProportion,transferMultiplied} = this.platformInfo.rule;
    // if(){
    //
    // }
    const response = await checkPromotionApi(info);
    if (response) {
      const { promotion, promotionId } = response;
      if (promotion) {
        await userStore.transferAction(
          {
            amount: info.amount,
            from: "Center",
            promotionId: promotionId,
            to: this.platform
          },
          false,
          () => {
            userStore.getUserPlatformBalance(this.platform).then(balance => {
              this.platformBalance = balance;
            });
            showToast(
              <FormattedMessage
                id="transfer.success"
                defaultMessage={"转帐成功"}
              />
            );
          }
        );
      }
    }
  }

  @action
  startGame() {
    userStore.startPlatformGame(this.platform, false);
  }
}
