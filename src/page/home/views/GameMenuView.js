import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {computed, observable} from "mobx";
import JxSelect from "jxComponents/jxSelect/JxSelect";
import {TextButton} from "jxComponents/jxButton";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import styles from "./GameMenuView.module.less";
import JxImg from "jxComponents/jxImg/JxImg";
import {defineMessages} from "react-intl";
import JxIntl from "jxComponents/jxIntl/JxIntl";
import {expr} from "mobx-utils";

function GameItem({ onTap, isLast, data }) {
  const { icon, name,hot } = data;
  const newClass = isLast
    ? `${styles.gameInfoItem} ${styles.noLine}`
    : styles.gameInfoItem;
  let iconTip = styles.itemTipIcon;
  if (data["new"]) {
    iconTip = `${styles.itemTipIcon} ${styles.itemNewTip}`;
  }

  if (hot) {
    iconTip = `${styles.itemTipIcon} ${styles.itemHotTip}`;
  }
  return (
    <TextButton className={newClass} onTap={onTap}>
      <JxImg alt={name} src={icon} className={styles.gameInfoLogo} />
      <div className={styles.gameText}>{name}</div>
      <div className={iconTip} />
    </TextButton>
  );
}

@inject("userStore", "homeStore")
@observer
class GameListPanel extends Component {
  @computed get menuGameList() {
    return this.props.homeStore.menuGameList;
  }

  @computed get isCenter() {
    return this.menuGameList.length < 4;
  }

  @computed get removeBorderLineNum() {
    return parseInt(((this.menuGameList.length - 1) / 4).toString()) * 4;
  }

  openHotGame = dataInfo => {
    this.props.userStore.startPlatform(dataInfo);
  };

  render() {
    return (
      <JxFlex
        className={styles.gameListContainer}
        addContentCenter={this.isCenter}
      >
        {this.menuGameList.map((item, index) => {
          return (
            <GameItem
              data={item}
              key={index}
              isLast={this.removeBorderLineNum <= index}
              onTap={() => this.openHotGame(item)}
            />
          );
        })}
      </JxFlex>
    );
  }
}

@observer
class DSfGameItem extends Component {
  menuInfo = defineMessages({
    sport: {
      id: "home.sport",
      defaultMessage: "体育"
    },
    live: {
      id: "home.live",
      defaultMessage: "真人视频"
    },
    slot: {
      id: "home.slot",
      defaultMessage: "老虎机"
    },
    fishing: {
      id: "home.fishing",
      defaultMessage: "捕鱼"
    }
  });

  render() {
    let { data, onTap } = this.props;
    const { text, isSelect } = data;
    let icoClassName = expr(() =>
      isSelect
        ? `${styles.menuLogo} ${styles[text + "On"]} ${styles.menuLogoActive}`
        : `${styles.menuLogo} ${styles[text + "On"]}`
    );
    // let icoClassName = `${styles.menuLogo} ${styles[text + "On"]}`;
    let className = expr(() =>
      isSelect
        ? `${styles.dsfGameItem} ${styles.dsfGameItemActive}`
        : `${styles.dsfGameItem}`
    );
    let lineClassName = expr(() =>
      isSelect
        ? `${styles.bottomLine} ${styles.bottomLineActive}`
        : `${styles.bottomLine}`
    );
    return (
      <div onClick={onTap} className={className}>
        <div className={icoClassName} />
        <JxIntl data={this.menuInfo} id={text} />
        <div className={lineClassName} />
      </div>
    );
  }
}

@inject("homeStore")
@observer
class MenuList extends Component {
  @observable
  listMenu = [
    {
      text: "sport",
      isSelect: true,
      category: "Sport"
    },
    {
      text: "live",
      isSelect: false,
      category: "LiveVideo"
    },
    {
      text: "slot",
      isSelect: false,
      category: "Slot"
    },
    {
      text: "fishing",
      isSelect: false,
      category: "Fishing"
    }
  ];

  changeTypeGame = dataInfo => {
    this.props.homeStore.selectPlatformGame(dataInfo.category);
  };

  render() {
    return (
      <div className={styles.container2}>
        <JxSelect
          className={styles.dsfGameContainer}
          OptionComponent={DSfGameItem}
          listData={this.listMenu}
          onChange={this.changeTypeGame}
        />
        <div className={styles.line2} />
      </div>
    );
  }
}

class GameMenuView extends Component {
  render() {
    return (
      <div className={styles.container}>
        <MenuList />
        <GameListPanel />
      </div>
    );
  }
}

export default GameMenuView;
