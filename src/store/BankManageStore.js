import {userBankApi} from "../services/User.service";
import {action, observable} from "mobx";
import appController from "./AppController";

export default class BankManageStore {
  @observable
  supportAddBank = true;

  @observable
  listData = [];

  constructor() {
    this.initData().then();
  }

  async initData() {
    let responseData = await userBankApi();
    if (responseData) {
      let startLength = responseData.length;
      this.listData = responseData.filter(item => {
        const { bankCardNumber } = item;
        if (bankCardNumber) {
          item.bankStr = `**** **** **** ${bankCardNumber.substr(-4)}`;
        }
        return item;
      });
      this.supportAddBank = startLength === this.listData.length;
    }
  }

  @action
  goAddBankPage() {
    appController.navPushPage("AddBankPage");
  }

  @action
  goEditBankPage(bankInfo) {
    appController.navPushPage("EditBankPage", bankInfo);
  }
}
