import {action, observable} from "mobx";
import {downPlatformAppApi, platformMemberApi} from "../services/User.service";
import userStore from "./UserStore";

export default class PlatformInfoStore {
  @observable
  supportDownApp = false;

  @observable
  supportStartApp = false;

  platformId;

  category;

  @observable
  appUrl;

  @observable
  userName;

  @observable
  imgUrl;

  @observable
  passWord;

  demo;

  constructor(platformInfo) {
    const { category, platform, demo, icon } = platformInfo;
    this.platformId = platform;
    this.category = category;
    this.demo = demo;
    this.imgUrl = icon;
    this.supportDownApp = true;
    this.initPlatformInfo().then();

    if (userStore.isLogin && ["Kiss918", "Pussy888"].includes(platform)) {
      this.supportStartApp = true;
    }
  }

  async initPlatformInfo() {
    const responseData = await downPlatformAppApi(null, {
      header: {
        platform: this.platformId
      }
    });
    if (responseData) {
      const { androidPath, icon, iosPath } = responseData[0];
      this.appUrl = userStore.isIos ? iosPath : androidPath;
      this.imgUrl = icon;
    }

    if (userStore.isLogin) {
      const platformMemberData = await platformMemberApi(null, {
        header: {
          platform: this.platformId
        }
      });
      if (platformMemberData) {
        const { password, username } = platformMemberData;
        this.passWord = password;
        this.userName = username;
      }
    }
  }

  @action
  downPlatformApp() {
    window.location.href = this.appUrl;
  }

  @action
  startGame() {
    let isoUrl, androidUrl;
    if (this.platformId === "Kiss918") {
      androidUrl = `lobbykissandroid://lobbykissandroid?account=${this.userName}&password=${this.passWord}`;
      isoUrl = `LobbyKiss64://?account=${this.userName}&password=${this.passWord}`;
    }
    if (this.platformId === "Pussy888") {
      isoUrl = androidUrl = `pussy888://pussy888.com/user=${this.userName}&password=${this.passWord}`;
    }
    window.open(userStore.isIos ? isoUrl : androidUrl);
  }
}
