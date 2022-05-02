import {action, computed, observable} from "mobx";
import {webStorageGetItem, webStorageSetItem} from "jxUtils/webStorage";
import {nowAndTimeDiff} from "jxUtils/timeUtil";
import {
  changeConfigApi,
  loginDetailApi,
  transferAllInApi,
  userAllBalanceApi,
  userBalanceApi
} from "../services/User.service";

/**
 * 用户状态信息
 */
export default class UserStateInfoStore {
  @observable
  browserInfo;

  //是否需要服务端渲染
  @computed get needSSR() {
    return navigator.userAgent === "ReactSnap";
  }

  @computed get browserSystem() {
    return "Wap";
  }

  @computed get deviceSystem() {
    if (this.browserInfo && this.browserInfo.os.name === "Android") {
      return "Android";
    } else {
      return "Ios";
    }
  }

  @computed get isIos() {
    return this.deviceSystem === "Ios";
  }

  @observable
  isLogin = false;

  //用户姓名
  @observable
  userName = "";

  //用户真实姓名
  @observable
  realName = "";

  @observable
  access_token;

  role;

  @observable
  centerBalance;

  @observable
  autoTransfer;

  @action
  async initLoginData() {
    //如果token存在信息，说明是其它国家url带过来的
    if (this.access_token) {
      this.byTokenGetCurrentUserInfo().then();
    }

    //缓存数据解密，反序列化用户数据
    let userInfo = JSON.parse(webStorageGetItem("userInfo", "{}"));
    const { loginTime, token, userName = "" } = userInfo;
    if (loginTime && token) {
      let isLogin = nowAndTimeDiff(loginTime) < 6 * 3600;
      this.access_token = token;
      this.userName = userName;
      if (isLogin) {
        this.loadInfo(userInfo);
        this.updateCurrentInfo();
      }
    }
  }

  async updateCurrentInfo() {
    // const responseData = await currentUserInfoApi();
    // if (responseData) {
    //   const { musername, name } = responseData;
    //   this.userName = musername;
    //   this.realName = name;
    // }
  }

  async byTokenGetCurrentUserInfo() {
    const responseData = await loginDetailApi();
    if (responseData) {
      this.loadInfo(responseData);
    }
  }

  selectCountryUserInfo(userInfo) {
    const { country, domain, token, successful } = userInfo;
    if (process.env.NODE_ENV !== "development" && successful === false) {
      window.location.href = `${domain}?country=${country}&token=${token}`;
    }
    this.loadInfo(userInfo);
  }

  loadInfo(userInfo) {
    const { role, token, username, name, autoTransfer } = userInfo;
    userInfo.loginTime = new Date().toString();
    this.userName = username;
    this.realName = name;
    this.role = role;
    this.access_token = token;
    this.isLogin = true;
    this.autoTransfer = autoTransfer;
    this.refreshUserBalance();
    webStorageSetItem("userInfo", JSON.stringify(userInfo));
  }

  /**
   * 刷新用户余额
   */
  refreshUserBalance() {
    this.getUserPlatformBalance("Center").then();
  }

  async getUserPlatformBalance(platform, needAllInfo = false) {
    const responseData = await userBalanceApi(null, {
      header: {
        platform: platform
      }
    });
    if (responseData) {
      let { balance, centerBalance } = responseData;
      this.centerBalance = centerBalance;
      if (balance === -1) {
        balance = "-";
        responseData.balance = balance;
      }
      return needAllInfo ? responseData : balance;
    }
    return null;
  }

  @action
  async getAllPlatformBalance(category = "") {
    let responseData = await userAllBalanceApi({
      category: category
    });
    if (responseData) {
      const centerBalance = responseData.pop();
      this.centerBalance = centerBalance.balance;
      responseData.map(item => {
        const { balance, weekBet } = item;
        item.isSelect = false;
        item.balance = balance === -1 ? "-" : balance;
        item.weekBet = weekBet === -1 ? "-" : weekBet;
        return item;
      });
      return responseData;
    }
    return [];
  }

  async allMoneyToCenter() {
    const responseData = await transferAllInApi();
    if (responseData) {
      const centerBalance = responseData.pop();
      this.centerBalance = centerBalance.balance;
      responseData.map(item => {
        const { balance } = item;
        item.balance = balance === -1 ? "-" : balance;
        return item;
      });
    }
    return responseData;
  }

  @action
  async changeAutoTransfer(autoTransfer) {
    const responseData = await changeConfigApi({ autoTransfer });
    if (responseData) {
      let userInfo = JSON.parse(webStorageGetItem("userInfo", "{}"));
      this.loadInfo({ ...userInfo, autoTransfer });
    }
  }
}
