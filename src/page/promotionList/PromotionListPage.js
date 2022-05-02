import React from "react";
import {computed} from "mobx";
import {inject, observer} from "mobx-react";
import JxPage from "../../components/jxPage/JxPage";
import JxNavBar from "../../components/jxNavBar/JxNavBar";
import JxContent from "../../components/jxContent/JxContent";
import TextButton from "../../components/jxButton/TextButton";
import PromotionListStore from "../../store/PromotionListStore";
import styles from "./PromotionListPage.module.less";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import JxTabsPanel from "jxComponents/jxTabsPanel/JxTabsPanel";
import {FormattedMessage} from "react-intl";

const GameItemView = observer(function GameItemView({ data, onTap }) {
  const { icon, title, synopsis } = data;
  let newClassName = `${styles.imgBg}`;
  return (
    <TextButton onTap={onTap} className={styles.gameItem}>
      <div
        style={{ backgroundImage: `url(${icon})` }}
        className={newClassName}
      />
      <div className={styles.itemText}>
        <div className={styles.gameText}>{title}</div>
        <div className={styles.synopsis}>{synopsis}</div>
      </div>
    </TextButton>
  );
});

@inject("promotionListStore")
@observer
class MainView extends React.Component {
  goPromotionInfoPage = info => {
    this.props.promotionListStore.goPromotionInfoPage(info);
  };

  render() {
    return (
      <JxFlex isColumn className={styles.gameContainer} addAlignCenter>
        {this.props.data.map(item => {
          return (
            <GameItemView
              key={item.id}
              data={item}
              gamePlatformLogo={this.gamePlatformLogo}
              onTap={() => this.goPromotionInfoPage(item)}
            />
          );
        })}
      </JxFlex>
    );
  }
}

@inject("homeStore")
@observer
export default class PromotionListPage extends React.Component {
  promotionListStore = new PromotionListStore();
  @computed get listData() {
    return this.promotionListStore.listData;
  }

  renderContent = tabs => {
    const { list } = tabs;
    return <MainView data={list} />;
  };

  changeMenu = () => {
    this.props.homeStore.showSlideMenu = true;
  };

  render() {
    return (
      <JxPage
        storeValue={this.promotionListStore}
        storeKey={"promotionListStore"}
      >
        <JxNavBar
          hasBackButton={false}
          leftTextButton={<div className={styles.icoMenu} />}
          onLeftClick={this.changeMenu}
        >
          <FormattedMessage id="common.promotion" defaultMessage="优惠" />
        </JxNavBar>
        <JxContent>
          <JxTabsPanel
            autoWidth={true}
            tabs={this.listData}
            defaultTitle={"text"}
            renderContent={this.renderContent}
            destroyInactiveTab={true}
          />
        </JxContent>
      </JxPage>
    );
  }
}
