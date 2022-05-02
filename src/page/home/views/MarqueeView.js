import React from "react";
import {computed, observable} from "mobx";
import ReactResizeDetector from "react-resize-detector";
import {inject, observer} from "mobx-react";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import styles from "./MarqueeView.module.less";

@inject("homeStore")
@observer
class MarqueeList extends React.Component {
  @observable
  animationPlayState = true;

  @computed
  get scrollClass() {
    return true ? styles.scrollContainer : "";
  }

  //TODO IOS从其他地方调到此页面，页面计算没有生效，默认给一个大的初始值
  @observable animationTime = "10s";

  onResize = width => {
    this.animationPlayState = false;
    this.animationTime = width / 65 + "s";
    setTimeout(() => {
      this.animationPlayState = true;
    }, 500);
  };

  initView = () => {
    return this.props.homeStore.marqueeList.map((item, index) => {
      return <span key={index}>{item.content}</span>;
    });
  };

  render() {
    return (
      <ReactResizeDetector handleWidth handleHeight onResize={this.onResize}>
        <div
          className={this.scrollClass}
          style={{
            animationDuration: this.animationTime,
            paddingLeft: window.innerWidth - 150,
            animationPlayState: this.animationPlayState ? "running" : "paused"
          }}
        >
          {this.initView()}
        </div>
      </ReactResizeDetector>
    );
  }
}

@observer
class MarqueeView extends React.Component {
  render() {
    return (
      <JxFlex className={styles.marquee} addAlignCenter={true}>
        <div className={styles.marqueeBg} />
        <JxFlex className={styles.marqueeContent} addAlignCenter>
          <div className={styles.title}>
            <div className={styles.dot} />
          </div>
          <div className={styles.contentBody}>
            <JxFlex className={styles.contentText}>
              <MarqueeList />
            </JxFlex>
          </div>
        </JxFlex>
      </JxFlex>
    );
  }
}

export default inject("appController")(MarqueeView);
