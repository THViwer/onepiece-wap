import React from "react";
import {inject, observer} from "mobx-react";
import JxNavBar from "jxComponents/jxNavBar/JxNavBar";
import styles from "./NavView.module.less";
import {computed} from "mobx";

@inject("homeStore", "userStore")
@observer
class NavView extends React.Component {
  @computed
  get logo() {
    return this.props.homeStore.logo;
  }

  changeMenu = () => {
    this.props.homeStore.showSlideMenu = true;
  };

  // goLanguage = () => {
  //   this.props.userStore.goLanguagePage();
  // };

  render() {
    return (
      <JxNavBar
        hasBackButton={false}
        leftTextButton={<div className={styles.icoMenu} />}
        // rightTextButton={
        //   <div className={styles.icoRightText} onClick={this.goLanguage}>
        //     Language >
        //   </div>
        // }
        onLeftClick={this.changeMenu}
      >
        <img src={this.logo} alt="" className={styles.logo} />
      </JxNavBar>
    );
  }
}

export default NavView;
