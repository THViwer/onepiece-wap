import React from "react";
import {inject, observer} from "mobx-react";
import {computed} from "mobx";
import {hot} from "react-hot-loader";
import JxPage from "jxComponents/jxPage/JxPage";
import JxNavBar from "jxComponents/jxNavBar/JxNavBar";
import JxContent from "jxComponents/jxContent/JxContent";
import PromotionInfoStore from "../../store/PromotionInfoStore";
import JxImg from "jxComponents/jxImg/JxImg";
import styles from "./PromotionInfoPage.module.less";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import {getDateFormatToString} from "jxUtils/timeUtil";
import Transter from "./views/Transter";
import JxDomText from "jxComponents/jxDomText/JxDomText";
import {FormattedMessage} from "react-intl";

@inject("userStore", "promotionInfoStore")
@observer
class BalanceInfo extends React.Component {
  @computed get centerBalance() {
    return this.props.userStore.centerBalance;
  }

  @computed get platformBalance() {
    return this.props.promotionInfoStore.platformBalance;
  }

  @computed get platform() {
    return this.props.promotionInfoStore.platform;
  }

  render() {
    return (
      <>
        <JxFlex className={styles.container} addAlignCenter>
          <JxFlex className={styles.infoItem} isColumn addContentCenter>
            <div className={styles.title}>Main Wallet</div>
            <div className={styles.balance}>{this.centerBalance}</div>
          </JxFlex>
          <div className={styles.line} />
          <JxFlex className={styles.infoItem} isColumn addContentCenter>
            <div className={styles.title}>{this.platform} Wallet</div>
            <div className={styles.balance}>{this.platformBalance}</div>
          </JxFlex>
        </JxFlex>
        <div className={styles.line3} />
      </>
    );
  }
}

@inject("userStore")
@observer
class PromotionInfoPage extends React.Component {
  promotionInfoStore;

  @computed get showPlatform() {
    return this.props.userStore.isLogin && this.promotionInfoStore.platform;
  }

  constructor(props) {
    super(props);
    this.promotionInfoStore = new PromotionInfoStore(this.props.navParams);
  }

  render() {
    let { title, icon, content, precautions, stopTime } = this.props.navParams;
    stopTime = stopTime
      ? getDateFormatToString(stopTime, "YYYY/MM/DD HH:mm")
      : stopTime;
    return (
      <JxPage
        storeValue={this.promotionInfoStore}
        storeKey={"promotionInfoStore"}
      >
        <JxNavBar>
          <FormattedMessage
            id={"promotion.detail"}
            defaultMessage={"Promotion detail"}
          />
        </JxNavBar>
        <JxContent className={styles.page}>
          <JxImg src={icon} className={styles.icon} />
          {this.showPlatform ? <BalanceInfo /> : null}
          <div className={styles.container1}>
            <div className={styles.title1}>{title}</div>
            <JxDomText className={styles.content1} content={content} />
            <JxFlex className={styles.stopTime}>
              <div />
              <div>Deadline</div>
              <div>{stopTime}</div>
            </JxFlex>
          </div>
          <div className={styles.container3}>
            <div className={styles.title2}>IMPORTANT NOTICE</div>
            <div className={styles.content2}>{precautions}</div>
            {this.showPlatform ? <Transter /> : null}
          </div>
        </JxContent>
      </JxPage>
    );
  }
}

export default hot(module)(PromotionInfoPage);
