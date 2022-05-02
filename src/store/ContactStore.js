import {action, observable} from "mobx";
import {contactUsListApi} from "../services/App.services";
import BrowserWindow from "jxUtils/BrowserWindow";

/**
 * 用户登录操作集合
 */
class ContactStore {
  @observable
  wechatContact = {};

  @observable
  whatsappContact = {};

  @observable
  facebook = "123";

  @observable
  youtube = "123";

  @observable
  instagram = "123";

  @action
  async initData() {
    const responseData = await contactUsListApi();
    if (responseData) {
      const {
        wechatContact = {},
        whatsappContact = {},
        facebook = {},
        youtube = {},
        instagram = {}
      } = responseData;
      this.wechatContact = wechatContact;
      this.whatsappContact = whatsappContact;
      this.facebook = facebook.qrCode;
      this.instagram = instagram.qrCode;
      this.youtube = youtube.qrCode;
    }
  }

  @action openFacebook(){
    const browser = new BrowserWindow();
    browser.open(this.facebook);
  }

  @action openInstagram(){
    const browser = new BrowserWindow();
    browser.open(this.instagram);
  }

  @action openYoutube(){
    const browser = new BrowserWindow();
    browser.open(this.youtube);
  }
}

const contactStore = new ContactStore();

export default contactStore;
