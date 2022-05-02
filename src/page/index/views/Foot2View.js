import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {computed, observable} from "mobx";
import screenfull from "screenfull";
import {webStorageGetItem, webStorageSetItem} from "jxUtils/webStorage";
import styles from "./Foot2View.module.less";

@inject("userStore")
@observer
class Foot2View extends Component {
  @observable
  isShowClickFull = false;

  @computed get isIos() {
    return this.props.userStore.isIos;
  }

  clickFull = () => {
    if (screenfull.isEnabled) {
      screenfull.request();
      this.isShowClickFull = false;
      setTimeout(() => {
        webStorageSetItem("clientMaxHeight", window.innerHeight);
      }, 1000);
    }
  };

  constructor(props) {
    super(props);
    if (screenfull.isEnabled) {
      screenfull.on("change", () => {
        if (!screenfull.isFullscreen) {
          this.checkMaxHeight();
        }
      });
      this.checkMaxHeight();
    } else {
      setTimeout(() => {
        this.checkIosSafari();
      }, 2000);
    }
  }

  checkMaxHeight = () => {
    let maxShowHeight = webStorageGetItem("clientMaxHeight");
    if (maxShowHeight) {
      this.isShowClickFull = parseInt(maxShowHeight) > window.innerHeight;
    } else {
      this.isShowClickFull = true;
    }
  };

  checkIosSafari = () => {
    if (this.isIos) {
      const { browserInfo } = this.props.userStore;
      if (browserInfo) {
        if (browserInfo.browser.name === "Mobile Safari") {
          this.checkMaxHeight();
          window.addEventListener("resize", function(event) {
            // this.checkMaxHeight();
          });
        }
      }
    }
  };

  render() {
    return (
      <>
        <style>
          {`
           
             
                .navigationContainer {
                display:none;
                }
                html,
                body{
                height:900px;
              
                }
                #root{
                height:1500px;
                overflow:hidden;
                }
                
                `}
        </style>
        {this.isShowClickFull ? (
          <div className={styles.fullMode}>
            {/*<style>*/}
            {/*  {`*/}
            {/*  html,*/}
            {/*    body,*/}
            {/*    #root,*/}
            {/*    .ReactNavigationControllerView,*/}
            {/*    .ReactNavigationController {*/}
            {/*      height: 1100px !important;*/}
            {/*      overflow: scroll;*/}
            {/*    }*/}
            {/*    html,*/}
            {/*    body{*/}
            {/*     */}
            {/*     */}
            {/*    }*/}
            {/*    */}
            {/*    `}*/}
            {/*</style>*/}

            <div
              onClick={this.clickFull}
              className={styles.upScrollFull}
            >
              全屏
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default Foot2View;
