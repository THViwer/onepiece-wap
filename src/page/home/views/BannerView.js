import React from "react";
import {computed, observable} from "mobx";
import {expr} from "mobx-utils";
import {inject, observer} from "mobx-react";
import {Carousel} from "antd-mobile";
import {TextButton} from "jxComponents/jxButton";
import styles from "./BannerView.module.less";

@inject("userStore")
@observer
class BannerImgView extends React.Component {
  seeInfoPage = info => {
    this.props.userStore.goPromotionPage(info);
  };

  render() {
    const { slideItem, isSelect } = this.props;
    const bannerImageUrl = expr(() => slideItem["icon"]);
    const imgClass = expr(() =>
      isSelect ? `${styles.slideImg} ${styles.slideImgActive}` : styles.slideImg
    );
    return (
      <TextButton
        onTap={() => this.seeInfoPage(slideItem)}
        className={styles.container}
      >
        <div
          className={imgClass}
          style={{ backgroundImage: `url(${bannerImageUrl})` }}
          // theme={"homeBanner"}
        />
      </TextButton>
    );
  }
}

@inject("homeStore")
@observer
export default class BannerView extends React.Component {
  width = "";

  @observable
  selectIndex = 0;

  @computed get bannerList() {
    return this.props.homeStore.bannerList;
  }

  @computed get autoplay() {
    return this.props.homeStore.bannerList.length > 0;
  }

  beforeChange = (fromIndex, toIndex) => {
    this.selectIndex = toIndex;
  };

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.width = window.innerWidth;
  }

  render() {
    return (
      <div className={styles.container} style={{ width: `${this.width}px` }}>
        {this.autoplay ? (
          <Carousel
            autoplay
            infinite
            // frameOverflow="visible"
            // cellSpacing={10}
            // slideWidth={0.872}
            className={styles.slideContainer}
            beforeChange={this.beforeChange}
          >
            {this.bannerList.map((slideItem, index) => {
              const isSelect = index === this.selectIndex;
              return (
                <BannerImgView
                  key={index}
                  slideItem={slideItem}
                  isSelect={isSelect}
                />
              );
            })}
          </Carousel>
        ) : null}
      </div>
    );
  }
}
