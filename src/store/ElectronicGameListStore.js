import {action, observable} from "mobx";
import {slotMenuApi} from "../services/User.service";
import userStore from "./UserStore";

export default class ElectronicGameListStore {
  gamePlatform;

  @observable
  platformMenuList = [];

  @observable
  gameList = [];

  @observable
  demo = false;

  constructor(platformInfo) {
    const { platform, demo } = platformInfo;
    this.demo = demo;
    this.gamePlatform = platform;
    this.initGame().then();
  }

  @action
  async initGame() {
    const responseData = await slotMenuApi(
      {
        platform: this.gamePlatform
      },
      {
        header: {
          launch: userStore.browserSystem
        }
      }
    );
    if (responseData) {
      //  const { url } = responseData;
      //  const listData = await downJSONApi(url);
      // if (listData) {
      this.platformMenuList = responseData;
      // }
    }
  }
}
