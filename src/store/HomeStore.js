import {action, observable} from "mobx";
import throttle from "lodash/throttle";
import appController from "./AppController";
import {apiRequestTool} from "../utils/request";
import userStore from "./UserStore";
import {downJSONApi, getAllPlatformsApi, getHotGamesApi, getSeoApi, initHomeApi} from "../services/App.services";
import {webStorageGetItem, webStorageSetItem} from "jxUtils/webStorage";
import contactStore from "./ContactStore";
import BrowserWindow from "jxUtils/BrowserWindow";
import {urlQueryString} from "jxUtils/common";

/**
 * 首页tab信息管理
 */
class HomeStore {
  @observable
  appName = "";

  @observable
  appKeywords = "";

  @observable
  appDescription = "";

  @observable
  seoTitle = "";

  @observable
  liveChatId;

  @observable
  googleStatisticsId = "";

  @observable
  facebookTr = "";

  @observable
  asgContent = "";

  //因为是预编译的所以先隐藏
  @observable
  liveChatTab = true;

  //浏览器顶部ico图标
  @observable
  icoLogo;

  @observable
  locale = "EN";

  @observable
  localeMessage = {};

  @observable
  antLocaleMessage = {};

  @observable
  logo = "";

  @observable
  showSlideMenu = false;

  @observable
  selectedTab = "homeTab";

  @observable
  bannerList = [];

  @observable
  marqueeList = [];

  platformsList = [];

  @observable
  menuGameList = [];

  @observable
  hotGameList = [];

  @observable
  showRechargeTip = false;

  initBase() {
    this.initConfig().then();
    this.initData().then();
    contactStore.initData().then();
  }

  async initConfig() {
    this.initSiteUrlParams();
    this.locale = webStorageGetItem("local", "EN");
    import(`../i18n/locales/${this.locale}.json`).then(locale => {
      this.localeMessage = locale.default;
    });
    if (this.locale === "CN") {
      this.antLocaleMessage = undefined;
    } else {
      import(`antd-mobile/lib/locale-provider/en_US`).then(locale => {
        this.antLocaleMessage = locale.default;
      });
    }
    import("ua-parser-js").then(responseData => {
      if (responseData) {
        const { UAParser } = responseData.default;
        const parser = new UAParser();
        const browserInfo = parser.getResult();
        if (browserInfo) {
          userStore.browserInfo = browserInfo;
        }
      }
    });
    //http请求工具初始化
    apiRequestTool.status500Function = throttle(() => {}, 5000);
    apiRequestTool.status401Function = () => {
      userStore.isLogin = false;
      webStorageSetItem(
        "userInfo",
        JSON.stringify({
          userName: userStore.userName
        })
      );
      appController.navPopSecondView("LoginPage");
    };
    apiRequestTool.initRequestTool();
  }

  initSiteUrlParams() {
    const token = urlQueryString("token");
    const country = urlQueryString("country");
    const local = urlQueryString("language");
    if (country) {
      webStorageSetItem("region", country);
    }
    if (local) {
      webStorageSetItem("local", local);
    }
    if (token) {
      userStore.access_token = token;
    }
  }

  @action
  async initData() {
    let allPlatforms = webStorageGetItem("allPlatforms", null);
    if (allPlatforms) {
      this.initMenu(JSON.parse(allPlatforms));
    }
    getAllPlatformsApi().then(platforms => {
      if (platforms) {
        let newPlatforms = JSON.stringify(platforms);
        if (allPlatforms !== newPlatforms) {
          this.initMenu(platforms);
          webStorageSetItem("allPlatforms", newPlatforms);
        }
        this.initMenu(platforms);
      }
    });
    getHotGamesApi().then(hotGames => {
      if (hotGames) {
        this.hotGameList = hotGames;
      }
    });
    getSeoApi().then(seoInfo => {
      if (seoInfo) {
        const {
          keywords,
          description,
          title,
          liveChatId,
          googleStatisticsId = "",
          facebookTr = "",
          liveChatTab,
          asgContent = ""
        } = seoInfo;
        this.appKeywords = keywords;
        this.appDescription = description;
        this.seoTitle = title;
        this.liveChatId = liveChatId;
        this.googleStatisticsId = googleStatisticsId;
        this.facebookTr = facebookTr;
        this.liveChatTab = liveChatTab;
        this.asgContent = asgContent;
      }
    });
    const responseData = await initHomeApi(null, {
      header: {
        launch: userStore.browserSystem
      }
    });
    if (responseData) {
      const { url } = responseData;
      const baseConfigInfo = await downJSONApi(url);
      if (baseConfigInfo) {
        const {
          banners = [],
          announcement = {},
          logo,
          name,
          shortcutLogo
        } = baseConfigInfo;
        this.bannerList = banners;
        this.logo = logo;
        this.appName = name;
        this.marqueeList = [announcement];
        this.icoLogo = shortcutLogo;
      }
    }
  }

  initMenu(platforms) {
    this.platformsList = platforms;
    this.selectPlatformGame("Sport");
  }

  selectPlatformGame(category) {
    this.menuGameList = this.platformsList.filter(item => {
      return category === item.category;
    });
  }

  goMainTab(selectedTab) {
    this.selectedTab = selectedTab;
  }

  openLiveChat() {
    const browserWindow = new BrowserWindow();
    browserWindow.open(
      `https://secure.livechatinc.com/licence/${this.liveChatId}/v2/open_chat.cgi`
    );
  }
}

const homeStore = new HomeStore();
export default homeStore;
