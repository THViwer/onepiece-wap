/**
 * 系统操作快捷控制器
 */
class AppController {
  /*
    导航控制器
 */
  navController;

  /**
   * 导航后台
   * @param navParams {*=}
   */
  navBack(navParams) {
    this.navController.myJxNavigation.popView(navParams);
  }

  /**
   * 导航插入页面
   * @param pageName {string}
   * @param navParams {*=}
   * @param navOptions {NavOptions=}
   */
  navPushPage(pageName, navParams, navOptions) {
    this.navController.myJxNavigation.pushView(pageName, navParams, navOptions);
  }

  /**
   * 返回到首页
   * @param navOptions {*=}
   */
  navPopToRootView(navOptions) {
    this.navController.myJxNavigation.popToRoot(navOptions);
  }

  /**
   * 移除除首页的所有界面
   * @param pageName {string}
   * @param navParams {*=}
   * @param navOptions {NavOptions=}
   */
  navPopSecondView(pageName, navParams, navOptions) {
    this.navController.myJxNavigation.popSecondView(
      pageName,
      navParams,
      navOptions
    );
  }

  /**
   * 先移除部分页面，然后添加新的页面
   * @param pageName 页面名称
   * @param navParams {*=} 传参
   * @param removePageNum {number} 移除的页面数
   * @param navOptions {NavOptions=}
   */
  navPopAndPushView(pageName, navParams, removePageNum, navOptions) {
    this.navController.myJxNavigation.popAndPushView(
      pageName,
      navParams,
      removePageNum,
      navOptions
    );
  }

  /**
   * 发送消息
   * @param pageName 页面名称
   * @param messageInfo 消息信息
   */
  navPostMessage(pageName, messageInfo) {
    this.navController.myJxNavigation.postMessage(pageName, messageInfo);
  }
}

const appController = new AppController();
export default appController;
