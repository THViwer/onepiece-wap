import React from "react";
import {inject, observer} from "mobx-react";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import styles from "./RecommendGameView.module.less";
import {FormattedMessage} from "react-intl";
import {computed} from "mobx";
import {TextButton} from "jxComponents/jxButton";

const RecommendItem = observer(({ data, onTap }) => {
  const { img1, name, introduce } = data;
  return (
    <div className={styles.listItem}>
      <div className={styles.listItem2}>
        <div
          className={styles.imgLogo}
          style={{ backgroundImage: `url(${img1})` }}
        />
        <div className={styles.title}>{name}</div>
        <div className={styles.describe}>{introduce}</div>
        <TextButton className={styles.play} onTap={onTap}>
          <FormattedMessage id={"user.playNow"} defaultMessage={"PLAY NOW"} />
        </TextButton>
      </div>
    </div>
  );
});

@inject("homeStore", "userStore")
@observer
class RecommendLotteryList extends React.Component {
  @computed get hotGameList() {
    return this.props.homeStore.hotGameList;
  }

  @computed get autoplay() {
    return this.hotGameList.length > 0;
  }

  goGame = lotteryInfo => {
    this.props.userStore.openHotGame(lotteryInfo);
  };

  render() {
    return (
      <div className={styles.moreGameContainer}>
        <JxFlex className={styles.recommendLotteryList}>
          {this.hotGameList.map(item => {
            return (
              <RecommendItem
                key={item.gameId}
                data={item}
                onTap={() => this.goGame(item)}
              />
            );
          })}
        </JxFlex>
      </div>
    );
  }
}

export default function RecommendGameView() {
  return (
    <JxFlex isColumn className={styles.container}>
      <div className={styles.hotTitle}>
        <FormattedMessage
          id="home.hotGame"
          defaultMessage={"Most played of the month"}
        />
      </div>
      <RecommendLotteryList />
    </JxFlex>
  );
}
