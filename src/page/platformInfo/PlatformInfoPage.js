import {inject, observer} from "mobx-react";
import JxModule from "jxComponents/jxModule/JxModule";
import JxPage from "jxComponents/jxPage/JxPage";
import JxNavBar from "jxComponents/jxNavBar/JxNavBar";
import JxContent from "jxComponents/jxContent/JxContent";
import React from "react";
import {hot} from "react-hot-loader/root";
import AppButton from "jxComponents/jxButton/AppButton";
import PlatformInfoStore from "../../store/PlatformInfoStore";
import {defineMessages, FormattedMessage, injectIntl} from "react-intl";
import {computed} from "mobx";
import styles from "./PlatformInfoPage.module.less";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import JxCopy from "jxComponents/jxCopy/JxCopy";

const messages = defineMessages({
  easyStep: {
    id: "launch.easyStep",
    defaultMessage: "轻松逐步在您的手机上玩{name}"
  },
  transferStep: {
    id: "launch.transferStep",
    defaultMessage: "转账到{name},并使用用户名和密码开始游戏"
  },
  downloadStep: {
    id: "launch.downloadStep",
    defaultMessage: "从链接下载{name}"
  }
});

@inject("userStore")
@observer
class PlatformInfoPage extends JxModule {
  platformInfoStore;

  @computed get supportDownApp() {
    return this.platformInfoStore.supportDownApp;
  }

  @computed get supportStartApp() {
    return this.platformInfoStore.supportStartApp;
  }

  @computed get userName() {
    return this.platformInfoStore.userName;
  }

  @computed get passWord() {
    return this.platformInfoStore.passWord;
  }

  @computed get imgUrl() {
    return this.platformInfoStore.imgUrl;
  }

  constructor(props) {
    super(props);
    this.platformInfoStore = new PlatformInfoStore(this.props.navParams);
  }

  downApp = () => {
    this.platformInfoStore.downPlatformApp();
  };

  startGame = () => {
    this.platformInfoStore.startGame();
  };

  render() {
    const { name } = this.props.navParams;
    return (
      <JxPage>
        <JxNavBar>{name}</JxNavBar>
        <JxContent>
          <div className={styles.ico}  style={{ backgroundImage: `url(${this.imgUrl})` }} />
          <div className={styles.container1}>
            <div className={styles.title}>
              {this.props.intl.formatMessage(messages.easyStep, { name: name })}
            </div>
            <div>
              <JxFlex className={styles.text} addAlignCenter>
                <FormattedMessage id="user.username" defaultMessage="用户名" />:
                <div className={styles.text2}>{this.userName}</div>
                <JxCopy text={this.userName} />
              </JxFlex>
              <JxFlex className={styles.text} addAlignCenter>
                <FormattedMessage id="user.password" defaultMessage="密码" />:
                <div className={styles.text2}>{this.passWord}</div>
                <JxCopy text={this.passWord} />
              </JxFlex>
            </div>
          </div>
          <div className={styles.container3}>
            <div className={styles.stepTitle}>
              <FormattedMessage id="launch.step1" defaultMessage="第一步" />
            </div>
            <div className={styles.stepText}>
              {this.props.intl.formatMessage(messages.transferStep, {
                name: name
              })}
            </div>
            <div className={styles.stepTitle}>
              <FormattedMessage id="launch.step2" defaultMessage="第二步" />
            </div>
            <div className={styles.stepText}>
              {this.props.intl.formatMessage(messages.downloadStep, {
                name: name
              })}
            </div>
            <div className={styles.stepTitle}>
              <FormattedMessage id="launch.step3" defaultMessage="第三步" />
            </div>
            <div className={styles.stepText}>
              <FormattedMessage
                id="launch.detail"
                defaultMessage="在您的手机中启动应用程序，并使用ID和密码登录"
              />
            </div>
          </div>
          <div className={styles.container}>
            {this.supportDownApp ? (
              <AppButton
                onClick={this.downApp}
                theme={"color1"}
                className={styles.container}
              >
                <FormattedMessage
                  id={"PlatformInfoPage.down"}
                  defaultMessage={"下载"}
                />
              </AppButton>
            ) : null}
            {this.supportStartApp ? (
              <AppButton
                onClick={this.startGame}
                theme={"color1"}
                className={styles.container}
              >
                <FormattedMessage
                  id={"PlatformInfoPage.play"}
                  defaultMessage={"开始"}
                />
              </AppButton>
            ) : null}
          </div>
        </JxContent>
      </JxPage>
    );
  }
}

export default hot(injectIntl(PlatformInfoPage));
