import React from "react";
import {computed} from "mobx";
import {inject, observer} from "mobx-react";
import JxModule from "../../components/jxModule/JxModule";
import {TabBar} from "antd-mobile";
import HomePage from "../home/HomePage";
import styles from "./MainTabsPage.module.less";
import {FormattedMessage} from "react-intl";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import FundsPage from "../Funds/FundsPage";
import UserPage from "../user/UserPage";
import PromotionListPage from "../promotionList/PromotionListPage";
import DownPage from "../down/DownPage";
import FastActionView from "../home/views/FastActionView";
import LiveChatView from "../home/views/LiveChatView";
import config from "clientTheme/config.json";

const IconView = ({ className, isActive = false }) => {
  const iconBgClass = isActive
    ? `${styles.iconBgItem} ${styles.iconBgItemActive}`
    : styles.iconBgItem;
  const iconClass = `${styles.iconItem} ${className}`;
  return (
    <JxFlex addAlignCenter addContentCenter className={iconBgClass}>
      <div className={iconClass} />
    </JxFlex>
  );
};

@inject("userStore", "homeStore")
@observer
class MainTabsPage extends JxModule {
  @computed get isLogin() {
    return !this.props.userStore.isLogin;
  }

  @computed get needRender() {
    return this.props.userStore.needSSR;
  }

  @computed get selectedTab() {
    return this.props.homeStore.selectedTab;
  }

  setSelectTab = selectedTab => {
    this.props.homeStore.selectedTab = selectedTab;
  };

  //tab文本选中样式
  tintColor = config.tintColor;

  unselectedTintColor = config.unselectedTintColor;

  checkLogin = tab => {
    if (this.props.userStore.checkLogin()) {
      this.setSelectTab(tab);
    }
  };

  openLiveChat = () => {
    this.props.homeStore.openLiveChat();
  };

  constructor(props) {
    super(props);
    this.state = {
      hidden: false
    };
  }

  initView = () => {
    if (!this.isLogin) {
      return [
        <TabBar.Item
          title={<FormattedMessage id="home.home" defaultMessage={"首页"} />}
          key="home"
          icon={<IconView className={styles.iconHome} />}
          selectedIcon={
            <IconView className={styles.iconHomeActive} isActive={true} />
          }
          selected={this.selectedTab === "homeTab"}
          onPress={() => {
            this.setSelectTab("homeTab");
          }}
        >
          <HomePage />
        </TabBar.Item>,
        <TabBar.Item
          icon={<IconView className={styles.iconClassify} />}
          selectedIcon={
            <IconView className={styles.iconClassifyActive} isActive={true} />
          }
          title={<FormattedMessage id="home.founds" defaultMessage={"资金"} />}
          key="founds"
          selected={this.selectedTab === "foundsTab"}
          onPress={() => {
            this.checkLogin("foundsTab");
          }}
        >
          <FundsPage />
        </TabBar.Item>,
        <TabBar.Item
          icon={<IconView className={styles.iconFind} />}
          selectedIcon={
            <IconView className={styles.iconFindActive} isActive={true} />
          }
          title={
            <FormattedMessage id="home.promotion" defaultMessage={"优惠"} />
          }
          key="findTab"
          selected={this.selectedTab === "promotionTab"}
          onPress={() => {
            this.setSelectTab("promotionTab");
          }}
        >
          <PromotionListPage />
        </TabBar.Item>,
        <TabBar.Item
          title={
            <FormattedMessage id="home.myAccount" defaultMessage={"账号中心"} />
          }
          key="us"
          icon={<IconView className={styles.iconMine} />}
          selectedIcon={
            <IconView className={styles.iconMineActive} isActive={true} />
          }
          selected={this.selectedTab === "usTab"}
          onPress={() => {
            this.checkLogin("usTab");
          }}
        >
          <UserPage />
        </TabBar.Item>,
        <TabBar.Item
          title={
            <FormattedMessage id="home.liveChat" defaultMessage={"LiveChat"} />
          }
          key="down"
          icon={<IconView className={styles.iconLive} />}
          selectedIcon={
            <IconView className={styles.iconDownActive} isActive={true} />
          }
          selected={this.selectedTab === "downTab"}
          onPress={() => {
            this.openLiveChat();
          }}
        ></TabBar.Item>
      ];
    } else {
      return [
        <TabBar.Item
          title={<FormattedMessage id="home.home" defaultMessage={"首页"} />}
          key="home"
          icon={<IconView className={styles.iconHome} />}
          selectedIcon={
            <IconView className={styles.iconHomeActive} isActive={true} />
          }
          selected={this.selectedTab === "homeTab"}
          onPress={() => {
            this.setSelectTab("homeTab");
          }}
        >
          <HomePage />
        </TabBar.Item>,
        <TabBar.Item
          icon={<IconView className={styles.iconClassify} />}
          selectedIcon={
            <IconView className={styles.iconClassifyActive} isActive={true} />
          }
          title={<FormattedMessage id="home.founds" defaultMessage={"资金"} />}
          key="founds"
          selected={this.selectedTab === "foundsTab"}
          onPress={() => {
            this.checkLogin("foundsTab");
          }}
        >
          <FundsPage />
        </TabBar.Item>,
        <TabBar.Item
          icon={<IconView className={styles.iconFind} />}
          selectedIcon={
            <IconView className={styles.iconFindActive} isActive={true} />
          }
          title={
            <FormattedMessage id="home.promotion" defaultMessage={"优惠"} />
          }
          key="findTab"
          selected={this.selectedTab === "promotionTab"}
          onPress={() => {
            this.setSelectTab("promotionTab");
          }}
        >
          <PromotionListPage />
        </TabBar.Item>,
        <TabBar.Item
          title={<FormattedMessage id="home.down" defaultMessage={"下载"} />}
          key="down"
          icon={<IconView className={styles.iconDown} />}
          selectedIcon={
            <IconView className={styles.iconDownActive} isActive={true} />
          }
          selected={this.selectedTab === "downTab"}
          onPress={() => {
            this.setSelectTab("downTab");
          }}
        >
          <DownPage />
        </TabBar.Item>,
        <TabBar.Item
          title={
            <FormattedMessage id="home.myAccount" defaultMessage={"账号中心"} />
          }
          key="us"
          icon={<IconView className={styles.iconMine} />}
          selectedIcon={
            <IconView className={styles.iconMineActive} isActive={true} />
          }
          selected={this.selectedTab === "usTab"}
          onPress={() => {
            this.checkLogin("usTab");
          }}
        >
          <UserPage />
        </TabBar.Item>
      ];
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <FastActionView />
        {this.needRender ? null : <LiveChatView />}
        <TabBar
          unselectedTintColor={this.unselectedTintColor}
          tintColor={this.tintColor}
          hidden={this.isLogin}
        >
          {this.initView()}
        </TabBar>
      </div>
    );
  }
}

export default MainTabsPage;
