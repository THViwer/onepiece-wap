/**
 * postMessage消息管理中心
 * @param navigationComponent 导航组建
 */
export default function appPostMessage(navigationComponent) {
  //XXX 因与其它页面通信，如果放在index，会导致无法热更新（通信中使用LoginPage组建）
  window.addEventListener("message", e =>
    handleIFrameAction(e, navigationComponent)
  );
}

function handleIFrameAction(e, navigationComponent) {
  if (
    typeof e.data !== "string" ||
    e.data.indexOf("setImmediate$") > -1 ||
    e.data.indexOf("{") !== 0
  ) {
    return;
  }
  if (e.data) {
    const data = JSON.parse(e.data);
    let { appController, userStore } = navigationComponent.props;
    const { action, payload } = data;
    switch (action) {
      case "to_login":
        appController.navPushPage("LoginPage");
        break;
      case "game_back":
        appController.navBack();
        break;
      case "trend_back":
        appController.navBack();
        break;
      case "game_recharge":
        appController.navPushPage("RechargeManagePage");
        break;
      case "game_redraw":
        userStore.goWithdrawPage();
        break;
      case "game_custom":
        userStore.goCUSServicePage();
        break;
      case "game_account":
        appController.navPushPage("UserInfoPage");
        break;
      case "game_open_game":
        appController.navPushPage(
          "GameViewFramePage",
          {
            src: payload
          },
          {
            pageId: "game_open_game"
          }
        );
        break;
      default:
        console.log("action 不存在");
    }
  }
}
