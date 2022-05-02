import {action} from "mobx";
import appController from "./AppController";
import UserStateInfoStore from "./UserStateInfoStore";
import {
  checkPromotionApi,
  startDemoPlatformSingleGameApi,
  startPlatformApi,
  startPlatformSingleGameApi,
  startTestPlatformApi,
  transferApi
} from "../services/User.service";
import {showToast, urlQueryString} from "jxUtils/common";
import homeStore from "./HomeStore";
import BrowserWindow from "jxUtils/BrowserWindow";
import transferStore from "./TransferStore";
import {webStorageRemoveItem, webStorageSetItem} from "jxUtils/webStorage";
import React from "react";
import {FormattedMessage} from "react-intl";

class UserStore extends UserStateInfoStore {

  constructor(props) {
    super(props);
    const code = urlQueryString("affid");
    if (code) {
      localStorage.setItem("affCode",code);
    }
  }
  willOpenGameUrl;

  checkLogin() {
    if (!this.isLogin) {
      this.goLoginPage();
    }
    return this.isLogin;
  }

  @action
  goLoginPage() {
    appController.navPushPage("LoginPage");
  }

  @action
  goRegisterPage() {
    appController.navPushPage("RegisterPage");
  }

  @action
  startPlatform(platformInfo) {
    const { category, platform, status, demo } = platformInfo;
    if (status === "Stop") {
      showToast(
        <FormattedMessage id="common.appUpdate" defaultMessage="平台维护中" />
      );
      return;
    }

    if (["Kiss918", "Mega", "Pussy888"].includes(platform)) {
      appController.navPushPage("PlatformInfoPage", platformInfo);
      return;
    }

    if (category === "Slot") {
      appController.navPushPage("ElectronicGameListPage", platformInfo);
    } else {
      this.startPlatformGame(platform, demo).then();
    }
  }

  @action
  openHotGame(gameInfo) {
    const { gameId, platform, status, demo = false } = gameInfo;
    if (status === "Stop") {
      showToast(
        <FormattedMessage id="common.appUpdate" defaultMessage="平台维护中" />
      );
      return;
    }
    this.startPlatformSingleGame(platform, gameId, demo);
  }

  /**
   * 启动平台
   * @param platform
   * @param demo
   * @return {Promise<void>}
   */
  @action
  async startPlatformGame(platform, demo) {
    let languageType;
    if (platform === "PlaytechLive") {
      languageType = homeStore.locale === "CN" ? "zh-cn" : "en";
    }
    if (this.isLogin) {
      // const platformBalance = await this.getUserPlatformBalance(platform);
      // if (platformBalance !== null) {
      //   if (platformBalance <= 10) {
      //     homeStore.showRechargeTip = true;
      //   }
      // }
      let browserWindow;
      if (!homeStore.showRechargeTip) {
        browserWindow = new BrowserWindow();
      }
      const responseData = await startPlatformApi(null, {
        loading: true,
        header: {
          platform: platform,
          launch: this.browserSystem
        }
      });
      if (responseData) {
        let { path, username, password, params = {} } = responseData;
        if (platform === "PlaytechLive") {
          webStorageSetItem(
            "Playtech",
            JSON.stringify({
              ...params,
              username,
              password,
              language: languageType,
              game: "7bal"
            })
          );
          path = `/m/playtech_start.html`;
        }
        if (homeStore.showRechargeTip) {
          this.willOpenGameUrl = path;
        } else {
          browserWindow.open(path);
        }
      } else {
        if (!homeStore.showRechargeTip) {
          browserWindow.close();
        }
      }
    } else {
      if (demo) {
        let browserWindow = new BrowserWindow();
        if (platform === "PlaytechLive") {
          let browserWindow = new BrowserWindow();
          browserWindow.open(
            `https://cache.download.banner.fourblessings88.com/casinoclient.html?game=7bal&language=${languageType}`
          );
          return;
        }
        const responseData = await startTestPlatformApi(null, {
          loading: true,
          header: {
            platform: platform,
            launch: this.browserSystem
          }
        });
        if (responseData) {
          const { path } = responseData;
          browserWindow.open(path);
        } else {
          browserWindow.close();
        }
      } else {
        this.goLoginPage();
      }
    }
  }

  @action
  async startPlatformSingleGame(platform, gameId, demo = false) {
    let languageType;
    if (platform === "PlaytechSlot") {
      languageType = homeStore.locale === "CN" ? "zh-cn" : "en";
    }
    if (this.isLogin) {
      let browserWindow = new BrowserWindow();
      const responseData = await startPlatformSingleGameApi(
        {
          gameId: gameId
        },
        {
          loading: true,
          header: {
            platform: platform,
            launch: this.browserSystem
          }
        }
      );
      if (responseData) {
        let { path, username, password, params = {} } = responseData;
        if (platform === "PlaytechSlot") {
          webStorageSetItem(
            "Playtech",
            JSON.stringify({
              ...params,
              username,
              password,
              language: languageType,
              game: gameId
            })
          );
          path = `/m/playtech_start.html`;
        }

        browserWindow.open(path);
      } else {
        browserWindow.close();
      }
    } else {
      if (platform === "PlaytechSlot" && demo) {
        let browserWindow = new BrowserWindow();
        browserWindow.open(
          `https://cache.download.banner.fourblessings88.com/casinoclient.html?game=${gameId}&language=${languageType}`
        );
        return;
      }

      if (demo) {
        this.startTestPlatformSingleGame(platform, gameId);
        return;
      }
      this.goLoginPage();
    }
  }

  @action
  async startTestPlatformSingleGame(platform, gameId) {
    let browserWindow = new BrowserWindow();
    const responseData = await startDemoPlatformSingleGameApi(
      {
        gameId: gameId
      },
      {
        loading: true,
        header: {
          platform: platform,
          launch: this.browserSystem
        }
      }
    );
    if (responseData) {
      browserWindow.open(responseData.path);
    } else {
      browserWindow.close();
    }
  }

  @action
  goDeposits() {
    appController.navPushPage("DepositsPage");
  }

  @action
  goWithdraw() {
    appController.navPushPage("WithdrawPage");
  }

  @action
  goTransfer() {
    homeStore.goMainTab("foundsTab");
  }

  @action
  goTransferHistory() {
    appController.navPushPage("HistoryPage");
  }

  @action
  goBankManagePage() {
    appController.navPushPage("BankManagePage");
  }

  @action
  goGameManagePage() {
    appController.navPushPage("AccountManagePage");
  }

  @action
  goAboutUsPage() {
    appController.navPushPage("AboutUsPage");
  }

  /**
   * 单个平台转账
   * @param transferInfo
   * @returns {Promise<boolean>}
   */
  @action
  async transferAction(transferInfo, needTip = true, successAction) {
    const { to, amount } = transferInfo;
    if (to !== "Center" && needTip) {
      const checkResponse = await checkPromotionApi(
        { amount, platform: to },
        { loading: true }
      );
      if (checkResponse) {
        const { promotion, promotions } = checkResponse;
        if (promotion) {
          transferStore.showPromotionDialog = true;
          transferStore.promotionDialogList = promotions.map((item, index) => {
            item.isSelect = index === 0;
            return item;
          });
          transferStore.promotionDialogAction = successAction;
          transferStore.promotionDialogFormInfo = transferInfo;
          return false;
        }
      }
    }
    return this.useTransferApiAction(transferInfo, successAction);
  }

  async useTransferApiAction(transferInfo, successAction) {
    if (transferInfo.amount <= 0) {
      showToast(
        <FormattedMessage
          id="funds.amountThanZero"
          defaultMessage="请输入大于0金额"
        />
      );
      return false;
    }
    const responseData = await transferApi(transferInfo);
    if (responseData) {
      successAction();
      return responseData;
    } else {
      return false;
    }
  }

  @action
  goChangePasswordPage() {
    appController.navPushPage("ChangePasswordPage");
  }

  @action
  goLanguagePage() {
    appController.navPushPage("LanguagePage");
  }

  @action
  goContactPage() {
    appController.navPushPage("ContactPage");
  }

  @action
  goHomePage() {
    homeStore.selectedTab = "homeTab";
  }

  @action
  goPromotionPage() {
    homeStore.selectedTab = "promotionTab";
  }

  @action
  goDownPage() {
    appController.navPushPage("DownPage");
  }

  @action
  openWillGame() {
    let browserWindow = new BrowserWindow();
    browserWindow.open(this.willOpenGameUrl);
  }

  @action
  logoutAction() {
    webStorageRemoveItem("userInfo");
    this.isLogin = false;
    window.location.reload();
  }
}

const userStore = new UserStore();
export default userStore;
