import React from "react";
import {inject, observer} from "mobx-react";
import JxPage from "jxComponents/jxPage/JxPage";
import NavView from "./views/NavView";
import BannerView from "./views/BannerView";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import styles from "./HomePage.module.less";
import MarqueeView from "./views/MarqueeView";
import GameMenuView from "./views/GameMenuView";
import RecommendGameView from "./views/RecommendGameView";
import JxContent from "jxComponents/jxContent/JxContent";
import TextDelayButton from "jxComponents/jxButton/TextDelayButton";
import {computed} from "mobx";
import UserInfoView from "./views/UserInfoView";
import TipView from "./views/TipView";
import {FormattedMessage} from "react-intl";
import FootView from "./views/FootView";

@inject("userStore")
@observer
export default class HomePage extends React.Component {
  @computed get isLogin() {
    return this.props.userStore.isLogin;
  }
  constructor(props) {
    super(props);
    this.props.userStore.initLoginData().then();
  }

  goLogin = () => {
    this.props.userStore.goLoginPage();
  };

  goRegister = () => {
    this.props.userStore.goRegisterPage();
  };

  render() {
    return (
      <JxPage>
        <NavView />
        <JxContent>
          <BannerView />
          <MarqueeView />
          {this.isLogin ? (
            <UserInfoView />
          ) : (
            <JxFlex addContentSpaceBetween className={styles.container2}>
              <TextDelayButton
                className={styles.button1}
                onClick={this.goRegister}
              >
                <FormattedMessage id="user.join" defaultMessage={"JOIN"} />
              </TextDelayButton>
              <TextDelayButton
                className={styles.button2}
                onClick={this.goLogin}
              >
                <FormattedMessage id="user.login" defaultMessage={"LOGIN"} />
              </TextDelayButton>
            </JxFlex>
          )}
          <div className={styles.blank} />
          <GameMenuView />
          <RecommendGameView />
          <FootView />
        </JxContent>
        <TipView />
      </JxPage>
    );
  }
}
