import React from "react";
import {inject, observer} from "mobx-react";
import {computed} from "mobx";
import {hot} from "react-hot-loader";
import JxPage from "jxComponents/jxPage/JxPage";
import JxNavBar from "jxComponents/jxNavBar/JxNavBar";
import JxContent from "jxComponents/jxContent/JxContent";
import styles from "./DownPage.module.less";
import DownStore from "../../store/DownStore";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import TextDelayButton from "jxComponents/jxButton/TextDelayButton";
import {FormattedMessage} from "react-intl";

const GameItemView = observer(function GameItemView({ data, onTap, isIos }) {
  const { icon, androidPath = "", iosPath = "", pname } = data;
  let newClassName = `${styles.imgBg}`;
  let downClass = isIos
    ? `${styles.ico} ${styles.ios}`
    : `${styles.ico} ${styles.android}`;
  let path = isIos ? iosPath : androidPath;
  // itms-services://?action=download-manifest&url=https://s3-ap-southeast-1.amazonaws.com/app918kiss/ios/918Kiss.plist
  return (
    <>
      {path !== "" ? (
        <TextDelayButton
          onClick={() => onTap(path)}
          className={styles.gameItem}
        >
          <div
            style={{ backgroundImage: `url(${icon})` }}
            className={newClassName}
          />
          <JxFlex
            addAlignCenter
            addContentSpaceBetween
            className={styles.gameText}
          >
            <div>{pname}</div>
            <div className={downClass} />
          </JxFlex>
        </TextDelayButton>
      ) : null}
    </>
  );
});

@inject("userStore","homeStore")
@observer
class DownPage extends React.Component {
  downStore = new DownStore();

  @computed get listData() {
    return this.downStore.listData;
  }

  @computed get isIos() {
    return this.props.userStore.isIos;
  }

  changeMenu = () => {
    this.props.homeStore.showSlideMenu = true;
  };

  down = href => {
    window.location.href = href;
  };

  render() {
    return (
      <JxPage storeValue={this.downStore} storeKey={"downStore"}>
        <JxNavBar
          // hasBackButton={false}
          // leftTextButton={<div className={styles.icoMenu} />}
          // onLeftClick={this.changeMenu}
        >
          <FormattedMessage id="common.download" defaultMessage="下载" />
        </JxNavBar>
        <JxContent>
          <JxFlex className={styles.container}>
            {this.listData.map(item => {
              return (
                <GameItemView
                  data={item}
                  key={item.platform}
                  onTap={this.down}
                  isIos={this.isIos}
                />
              );
            })}
          </JxFlex>
        </JxContent>
      </JxPage>
    );
  }
}

export default hot(module)(DownPage);
