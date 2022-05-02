import React, {Component} from "react";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import styles from "./FootView.module.less";
import {inject, observer} from "mobx-react";
import {computed} from "mobx";
import TextDelayButton from "jxComponents/jxButton/TextDelayButton";
import clientConfig from "clientTheme/config";

@inject("contactStore")
@observer
class FootView extends Component {
  @computed get facebook() {
    return this.props.contactStore.facebook;
  }

  @computed get youtube() {
    return this.props.contactStore.youtube;
  }

  @computed get instagram() {
    return this.props.contactStore.instagram;
  }

  openFaceBook = () => {
    this.props.contactStore.openFacebook();
  };

  openInstagram = () => {
    this.props.contactStore.openInstagram();
  };

  openYoutube = () => {
    this.props.contactStore.openYoutube();
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.text1}>Gaming License</div>
        <JxFlex>
          <div className={styles.gcLogo} />
          <div className={styles.text2}>
            {clientConfig.name} is a Registered Trade Mark, brand and registered
            business 30, Ghar Id-Dud Street Sliema SLM1572, Malta. Regulated &
            Licensed by the Government of Curacao and operates under the Master
            License of Gaming Services Provider, N.V. #365/JAZ
          </div>
        </JxFlex>
        <div className={styles.text3}>Affiliate Program</div>
        <div className={styles.text4}>
          {clientConfig.name} uses cookies to enhance your website experience.
          By staying on the website, you agree to the use of these cookies.
        </div>
        <JxFlex className={styles.logoContainer}>
          {this.facebook ? (
            <TextDelayButton
              className={styles.fbLogo}
              onClick={this.openFaceBook}
            />
          ) : null}
          {this.instagram ? (
            <TextDelayButton
              className={styles.instaLogo}
              onClick={this.openInstagram}
            />
          ) : null}
          {this.youtube ? (
            <TextDelayButton
              className={styles.ybLogo}
              onClick={this.openYoutube}
            />
          ) : null}
        </JxFlex>
      </div>
    );
  }
}

export default FootView;
