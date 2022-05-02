import {action, observable} from "mobx";
import userStore from "./UserStore";
import React from "react";
import {convertArrayToObject, showToast} from "jxUtils/common";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import keyBy from "lodash/keyBy";
import {FormattedMessage} from "react-intl";

class TransferStore {
  @observable
  menuInfo = [
    {
      id: "slot",
      category: "Slot",
      text: "老虎机",
      list: []
    },
    {
      id: "live",
      category: "LiveVideo",
      text: "真人视频",
      list: []
    },
    {
      id: "sport",
      category: "Sport",
      text: "体育",
      list: []
    },
    {
      id: "fishing",
      category: "Fishing",
      text: "捕鱼",
      list: []
    }
  ];

  selectIndex;

  @observable
  formCategory;

  @observable
  fromPlatform = {};

  @observable
  showTransferDialog = false;

  cacheAllPlatformList = [];

  @observable
  allPlatformList = [];

  //是否展示参加活动的弹出框
  @observable
  showPromotionDialog = false;

  @observable
  promotionDialogList = [];

  promotionDialogAction;

  //弹出框表单信息
  promotionDialogFormInfo = {};

  @action
  updateMenuInfo(index) {
    if (index) {
      this.selectIndex = index;
      let menuItem = this.menuInfo[index];
      userStore.getAllPlatformBalance(menuItem.category).then(data => {
        menuItem.list = data;
      });
    }
  }

  @action
  openTransferDialog(platformInfo, category) {
    this.formCategory = category;
    this.fromPlatform = platformInfo;
    this.showTransferDialog = true;
    this.allPlatformList = [
      this.cacheAllPlatformList.filter(item => {
        const { platform } = item;
        return platform !== platformInfo.platform;
      })
    ];
  }

  async searchAllPlatformBalance(needInit = null) {
    let allPlatformList = await userStore.getAllPlatformBalance();
    if (allPlatformList) {
      if (needInit) {
        this.selectIndex = needInit;
        let selectMenuItem = this.menuInfo[needInit];
        let category = selectMenuItem.category;

        allPlatformList.map(item => {
          item.isSelect = false;
          return item;
        });

        selectMenuItem.list = allPlatformList.filter(item => {
          return category === item.category;
        });
      }
      allPlatformList = allPlatformList.filter((item, index) => {
        const { platform, balance,pname } = item;
        item.label = (
          <JxFlex
            key={index}
            style={{ width: "15rem", margin: "0 auto", color: "#333333" }}
            addContentSpaceBetween
          >
            <div key={"a"}>{pname}</div>
            <div key={"b"}>{balance}</div>
          </JxFlex>
        );
        item.value = platform;
        return item.transfer;
      });
      this.cacheAllPlatformList = allPlatformList;
      this.allPlatformList = [allPlatformList];
    }
  }

  @action
  async transferAction(transferInfo) {
    await userStore
      .transferAction(transferInfo, true, () => {
        showToast(<FormattedMessage
            id="funds.transferSuccessful"
            defaultMessage={"转账成功"}
        />);
      })
      .then(responseData => {
        const platformObject = keyBy(responseData, "platform");
        this.menuInfo.map(menuItem => {
          menuItem.list.map(platformItem => {
            const { platform } = platformItem;
            if (platformObject.hasOwnProperty(platform)) {
              const { transfer, balance, tips } = platformObject[platform];
              platformItem.transfer = transfer;
              platformItem.balance = balance;
              platformItem.tips = tips;
            }
            return platformItem;
          });
          return menuItem;
        });
      });
  }

  @action
  async promotionAction(promotionId) {
    const requestData = { ...promotionId, ...this.promotionDialogFormInfo };
    await userStore.useTransferApiAction(
      requestData,
      this.promotionDialogAction
    );
  }

  @action
  updatePlatformInfo(platformInfoList) {
    let list = this.menuInfo[this.selectIndex].list;
    let platformInfo = convertArrayToObject(platformInfoList, "platform");

    list.map(item => {
      if (platformInfo.hasOwnProperty(item.platform)) {
        item.balance = platformInfo[item.platform].balance;
      }

      return item;
    });
  }
}

const transferStore = new TransferStore();
export default transferStore;
