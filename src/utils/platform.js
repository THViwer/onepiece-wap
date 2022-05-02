class Platform {
  _isPortrait = null;
  _pw = 0;
  _pH = 0;
  _lW = 0;
  _lH = 0;
  _titleBarHeight;

  setTitleBarHeight(data) {
    this._titleBarHeight = data;
  }

  getTitleBarHeight() {
    return this._titleBarHeight;
  }

  /**
   * 计算系统宽度
   * @return {*}
   */
  width() {
    this._calcDim();
    return this._isPortrait ? this._pW : this._lW;
  }

  /**
   * 计算系统高度
   * @return {number}
   */
  height() {
    this._calcDim();
    return this._isPortrait ? this._pH : this._lH;
  }

  /**
   * 浏览器版本
   * @return {{trident: boolean, presto: boolean, webKit: boolean, gecko: boolean, mobile: boolean, ios: boolean, android: boolean, iPhone: boolean, iPad: boolean, webApp: boolean}}
   */
  version() {
    let u = navigator.userAgent;
    return {
      //移动终端浏览器版本信息
      trident: u.indexOf("Trident") > -1, //IE内核
      presto: u.indexOf("Presto") > -1, //opera内核
      webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
      gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") === -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器
      iPhone: u.indexOf("iPhone") > -1 || u.indexOf("Mac") > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf("iPad") > -1, //是否iPad
      webApp: u.indexOf("Safari") === -1, //是否web应该程序，没有头部与底部
      opera: !!u.match(/Opera|OPR\//),
      chrome: u.indexOf("Chrome") > -1,
      iosChrome: u.indexOf("CriOS") > -1, //ios上面chrome内核
      ucBrowser: u.indexOf("UCBrowser") > -1,
      baiduBrowser: u.indexOf("baidubrowser") > -1
    };
  }

  operaVersion() {
    const re = /(opera|opr).*?([\d.]+)/;
    return this._checkVersion(re);
  }

  chromeVersion() {
    const re = /(chrome).*?([\d.]+)/;
    return this._checkVersion(re);
  }

  _checkVersion(re) {
    let m = navigator.userAgent.toLowerCase().match(re);
    return parseFloat(m[2]);
  }

  _calcDim() {
    if (
      this._isPortrait === null ||
      (this._isPortrait === false &&
        window["innerWidth"] < window["innerHeight"])
    ) {
      let win = window;

      let innerWidth = win["innerWidth"];
      let innerHeight = win["innerHeight"];

      // we're keeping track of portrait and landscape dimensions
      // separately because the virtual keyboard can really mess
      // up accurate values when the keyboard is up
      if (win.screen.width > 0 && win.screen.height > 0) {
        if (innerWidth < innerHeight) {
          // the device is in portrait
          // we have to do fancier checking here
          // because of the virtual keyboard resizing
          // the window
          if (this._pW <= innerWidth) {
            this._isPortrait = true;
            this._pW = innerWidth;
          }

          if (this._pH <= innerHeight) {
            this._isPortrait = true;
            this._pH = innerHeight;
          }
        } else {
          // the device is in landscape
          if (this._lW !== innerWidth) {
            this._isPortrait = false;
            this._lW = innerWidth;
          }

          if (this._lH !== innerHeight) {
            this._isPortrait = false;
            this._lH = innerHeight;
          }
        }
      }
    }
  }

  /**
   * 支持打开浏览器新的页面
   * @return {boolean}
   */
  supportOpenBrowser() {
    const { ucBrowser, ios, baiduBrowser } = platform.version();
    return !(ios && (ucBrowser || baiduBrowser));
  }
}

const platform = new Platform();
export default platform;
