import {urlQueryString} from "./common";

/**
 * 系统路由配置
 * @param navigationComponent 导航组建
 */
export default function appRouter(navigationComponent) {
  let { userStore} = navigationComponent.props;
  let action = urlQueryString("action");

  switch (action) {
    case "register":
      navigationComponent.pushView({page:"RegisterPage"});
      break;
    case "promotion":
      userStore.goPromotionPage()
      break;

    default:

  }
}
