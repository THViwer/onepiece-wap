import React from "react";
import {inject, observer} from "mobx-react";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import TextButton from "jxComponents/jxButton/TextButton";
import styles from "./ElectronicMainView.module.less";
import JxImg from "jxComponents/jxImg/JxImg";

const GameItemView = observer(function GameItemView({ data, onTap }) {
  const { icon, gameName } = data;
  let newClassName = `${styles.imgBg}`;
  return (
    <TextButton onTap={onTap} className={styles.gameItem}>
      <JxImg className={newClassName} src={icon} />
      <div className={styles.gameText}>{gameName}</div>
    </TextButton>
  );
});

@inject("userStore", "electronicGameListStore")
@observer
class ElectronicMainView extends React.Component {
  goGame = gameInfo => {
    const { userStore, electronicGameListStore } = this.props;
    userStore.startPlatformSingleGame(
      electronicGameListStore.gamePlatform,
      gameInfo.gameId,
      electronicGameListStore.demo
    );
  };

  render() {
    return (
      <JxFlex className={styles.gameContainer}>
        {this.props.data.map(item => {
          return (
            <GameItemView
              key={item.gameId}
              data={item}
              gamePlatformLogo={this.gamePlatformLogo}
              onTap={() => this.goGame(item)}
            />
          );
        })}
      </JxFlex>
    );
  }
}

export default inject("electronicGameListStore")(ElectronicMainView);
