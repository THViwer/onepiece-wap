import React from "react";
import {inject, observer} from "mobx-react";
import {TextButton} from "jxComponents/jxButton";
import styles from "./FastActionView.module.less";
import {defineMessages} from "react-intl";
import {computed} from "mobx";
import JxIntl from "jxComponents/jxIntl/JxIntl";

@inject("homeStore", "userStore")
@observer
class FastActionView extends React.Component {
  @computed get showSlideMenu() {
    return this.props.homeStore.showSlideMenu;
  }

  @computed get containerStyle() {
    return this.showSlideMenu
      ? `${styles.container} ${styles.uiOpen}`
      : `${styles.container} ${styles.uiClose}`;
  }

  @computed get isLogin() {
    return this.props.userStore.isLogin;
  }

  menuInfo = defineMessages({
    home: {
      id: 'home.home',
      defaultMessage: '首页',
    },
    promotion: {
      id: 'home.promotion',
      defaultMessage: '优惠活动',
    },
    contact: {
      id: 'home.contact',
      defaultMessage: '联系我们',
    },
    language: {
      id: 'home.language',
      defaultMessage: '语言',
    },
    desktop: {
      id: 'home.desktop',
      defaultMessage: 'pc版',
    },
    download: {
      id: 'home.download',
      defaultMessage: '下载',
    },
    about: {
      id: 'home.about',
      defaultMessage: '关于我们',
    },
    logout: {
      id: 'home.logout',
      defaultMessage: '退出',
    },
  });
  menuList = [
    {
      text: 'home',
      onTap: () => {
        this.props.userStore.goHomePage();
        this.closePanel();
      },
    },
    {
      text: 'promotion',
      onTap: () => {
        this.props.userStore.goPromotionPage();
        this.closePanel();
      },
    },
    {
      text: 'contact',
      onTap: () => {
        this.props.userStore.goContactPage();
        this.closePanel();
      },
    },
    {
      text: 'language',
      onTap: () => {
        this.props.userStore.goLanguagePage();
        this.closePanel();
      },
    },
    {
      text: 'about',
      onTap: () => {
        this.props.userStore.goAboutUsPage();
      },
    },
    {
      text: 'download',
      onTap: () => {
        this.props.userStore.goDownPage();
        this.closePanel();
      },
    },
    {
      text: 'logout',
      onTap: () => {
        this.props.userStore.logoutAction();
      },
    }
  ];

  closePanel = () => {
    this.props.homeStore.showSlideMenu = false;
  };

  sidebar = () => {
    return this.menuList.map((item, index) => {
      const { text, onTap } = item;
      if (text !== "logout" || this.isLogin) {
        return (
          <TextButton key={index} className={styles.menuItem} onTap={onTap}>
            <div className={styles[text]} />
            <div className={styles.title}>
              <JxIntl data={this.menuInfo} id={text} />
            </div>
          </TextButton>
        );
      } else {
        return null;
      }
    });
  };

  render() {
    return (
      <>
        {this.showSlideMenu ? (
          <TextButton className={styles.mask} onTap={this.closePanel} />
        ) : null}
        <div className={this.containerStyle}>{this.sidebar()}</div>
      </>
    );
  }
}
export default FastActionView;
