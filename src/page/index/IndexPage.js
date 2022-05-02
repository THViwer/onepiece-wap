import React from "react";
import {inject, observer} from "mobx-react";
import {hot} from "react-hot-loader/root";
import JxNavigation from "../../components/jxNavigation/JxNavigation";
import NavController from "../../components/jxNavigation/NavController";
import MainTabsPage from "../mainTabs/MainTabsPage";
import {IntlProvider} from "react-intl";
import {computed} from "mobx";
import {LocaleProvider} from "antd-mobile";
import SeoView from "./views/SeoView";
import appRouter from "jxUtils/appRouter";

@inject("appController", "homeStore","userStore")
@observer
class IndexPage extends React.Component {
  @computed get locale() {
    return this.props.homeStore.locale;
  }

  @computed get localeMessage() {
    return this.props.homeStore.localeMessage;
  }

  @computed get antLocaleMessage() {
    return this.props.homeStore.antLocaleMessage;
  }

  navController = new NavController();

  navViews = [{ page: MainTabsPage, pageName: "MainTabsPage" }];

  constructor(props) {
    super(props);
    props.appController.navController = this.navController;
    appRouter(this);
  }

  /**
   * 初始化所有的页面导航组
   * @param viewPages
   */
  initViewPages(viewPages) {
    this.navViews = viewPages;
  }

  /**
   * 添加新的页面
   * @param viewPage
   */
  pushView(viewPage) {
    this.navViews.push(viewPage);
  }

  render() {
    return (
      <LocaleProvider locale={this.antLocaleMessage}>
        <IntlProvider
          defaultLocale={"EN"}
          locale={this.locale}
          key={this.locale}
          messages={this.localeMessage}
        >
          <JxNavigation
            navController={this.navController}
            views={this.navViews}
            openForApp={this.openForApp}
          />
          <SeoView/>
        </IntlProvider>
      </LocaleProvider>
    );
  }
}

export default hot(IndexPage);
