import React from "react";
import PropTypes from "prop-types";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import Loadable from "react-loadable";
import history from "history-events";
import findIndex from "lodash/findIndex";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { uniqueId } from "../../utils/common";
import LoadingPage from "./LoadingPage";
import styles from "./JxNavigation.module.less";

const SlideInOut = observer(function SlideInOut({ ...props }) {
  let { zIndex, domNode } = props.data;
  return (
    <CSSTransition timeout={400} classNames={"SlideInOut"} {...props}>
      <div className={styles.navigationPage} style={{ zIndex: zIndex }}>
        {domNode}
      </div>
    </CSSTransition>
  );
});

//XXX 导航组建后续主入口优化（主入口没办法自由选择，如果自由选择所有的页面小组件会单独打包）
@observer
export default class JxNavigation extends React.Component {
  /**
   * 相关面板信息
   * @type {Array}
   */
  @observable
  listViews = [];

  /**
   * 是否是返回键行为
   * @type {boolean}
   */
  isBackAction = true;

  /**
   * 浏览器窗口是否打开
   * @type {boolean}
   */
  windowPageVisibility = true;

  constructor(props) {
    super(props);
    this.props.navController.init(this);
    this.initComponent();
    this.initHistory();
    this.initEvent();
  }

  initHistory() {
    if (history.isHistorySupported()) {
      window.addEventListener("popstate", e => {
        if (this.isBackAction) {
          if (this.listViews.length > 1) {
            if (this._triggerPageBackKeyEvent()) {
              this.listViews.pop();
              this._triggerViewBackEvent();
            }
          }
        } else {
          this.isBackAction = true;
        }
      });
    }
  }

  initEvent() {
    document.addEventListener("visibilitychange", e => {
      this.windowPageVisibility = !this.windowPageVisibility;
      if (this.windowPageVisibility) {
        this._triggerWindowShow();
      } else {
        this._triggerWindowHide();
      }
    });
  }

  /**
   * 得到组建的ref
   * @param component
   */
  addModule = component => {
    this.listViews[this.listViews.length - 1].viewRef = component;
  };

  initComponent() {
    this.props.views.forEach((page, index) => {
      if (index === 0) {
        if (typeof page.page === "string") {
          this.pushView(page.page, page.navParams, { animate: false });
          return;
        }
        let viewItem = {};
        const key = uniqueId();
        const zIndex = 100 + index;
        viewItem.pageName = page.pageName;

        const Page = page.page;

        viewItem.domNode = <Page moduleToList={this.addModule} />;
        viewItem.zIndex = zIndex;
        viewItem.key = key;
        viewItem.animate = false;

        this.listViews.push(viewItem);
      } else {
        this.pushView(page.page, page.navParams, { animate: false });
      }
    });
  }

  loadComponent(pageName) {
    let pathName =
      pageName.substring(0, 1).toLocaleLowerCase() +
      pageName.substring(1, pageName.length - 4);
    let firstPageName = pageName.substring(0, pageName.length - 4);
    const LazyComponent = Loadable({
      loader: () => import(`../../page/${pathName}/${firstPageName}Page.js`), //自带模糊搜索压缩合并js
      loading() {
        return <LoadingPage />;
      }
    });
    return LazyComponent;
  }

  /**
   * 添加页面
   * @param pageName {string} 页面
   * @param navParams {object} 页面传递参数
   * @param navOptions {NavOptions}  页面配置
   */
  @action
  pushView(pageName, navParams = {}, navOptions = {}) {
    const key = uniqueId();
    let index = this.listViews.length;
    const zIndex = 100 + index;
    const isFirstPage = index === 0; //是否是首页
    const { animate = true, pageId = pageName, fixPage = false } = navOptions;

    let findViewIndex = findIndex(this.listViews, {
      pageName: pageId
    });

    //考虑首页加载
    if (index !== 0 && index === findViewIndex + 1) {
      return;
    }

    if (findViewIndex !== -1) {
      this.backNumPage(findViewIndex, navParams);
      return;
    }

    // this.isBackAction = false;
    //window.location.hash = `${pageName}`;
    window.history.pushState(null, null, `#${pageName}`);

    const LazyComponent = this.loadComponent(pageName);
    let finalXmlNode; //最终生成的XML节点

    finalXmlNode = (
      <LazyComponent
        navParams={navParams}
        moduleToList={this.addModule}
        isFirstPage={isFirstPage}
      />
    );

    let viewItem = {
      pageName: pageId,
      fixPage: fixPage,
      animate: animate,
      zIndex: zIndex,
      domNode: finalXmlNode,
      key: key
    };

    //考虑首页加载
    if (index !== 0) {
      this._triggerPageHideEvent();
    }

    this.listViews.push(viewItem);
  }

  /**
   * 先移除部分页面，然后添加新的页面
   * @param pageName
   * @param navParams
   * @param removePageNum
   * @param navOptions {NavOptions}  页面配置
   */
  @action
  popAndPushView(pageName, navParams = {}, removePageNum, navOptions = {}) {
    const key = uniqueId();
    const index = this.listViews.length - removePageNum;
    const zIndex = 100 + index;
    const { animate = true, pageId = pageName, fixPage = false } = navOptions;
    let finalXmlNode;

    let findViewIndex = findIndex(this.listViews, { pageName: pageId });
    //如果要添加的页面已经存在返回的页面中，默认返回,方便查看历史，目前只有popView有历史
    if (index === findViewIndex + 1 && removePageNum === 1) {
      this.popView();
      return;
    }

    if (findViewIndex !== -1) {
      this.backNumPage(findViewIndex, navParams);
      return;
    }

    const LazyComponent = this.loadComponent(pageName);
    // this.isBackAction = false;
    // let historyLength = -removePageNum;
    // this._historyBack(historyLength);

    //快速倒退后，hash添加不起作用
    // setTimeout(() => {
    // this.isBackAction = false;
    // window.location.hash = `${pageName}`;
    // }, 1000);
    window.history.pushState(null, null, `${pageName}`);

    finalXmlNode = (
      <LazyComponent navParams={navParams} moduleToList={this.addModule} />
    );

    let viewItem = {
      pageName: pageId,
      fixPage: fixPage,
      animate: animate,
      zIndex: zIndex,
      domNode: finalXmlNode,
      key: key
    };

    //关闭销毁页面动画
    this.listViews.map((item, itemIndex) => {
      if (index <= itemIndex) {
        item.animate = false;
      }
      return item;
    });

    setTimeout(
      () => this.listViews.splice(-removePageNum, removePageNum, viewItem),
      100
    );
  }

  /**
   * 插入到倒数第二个页面，方便快速操作返回首页
   * @param pageName
   * @param navParams
   * @param navOptions {NavOptions}  页面配置
   */
  @action
  popSecondView(pageName, navParams = {}, navOptions = {}) {
    const key = uniqueId();
    let zIndex;
    const listLength = this.listViews.length;
    const { animate = false, pageId = pageName, fixPage = false } = navOptions;
    let finalXmlNode;

    let findViewIndex = findIndex(this.listViews, {
      pageName: pageName,
      pageId: pageId
    });

    if (listLength === findViewIndex + 1) {
      return;
    }

    if (listLength === 1) {
      this.pushView(pageName, navParams);
      return;
    }

    if (findViewIndex !== -1) {
      this.backNumPage(findViewIndex, navParams);
      return;
    }

    const LazyComponent = this.loadComponent(pageName);
    // this.isBackAction = false;
    // let historyLength = -this.listViews.length + 1;
    // this._historyBack(historyLength);
    //快速倒退后，hash添加不起作用
    // setTimeout(() => {
    //   this.isBackAction = false;
    window.location.hash = `${pageName}`;
    // }, 1000);
    // window.history.pushState(null,null,`${pageName}`);

    //寻找固定保护的页面，如果没有固定保护的页面直接返回
    let findFixViewIndex = findIndex(this.listViews, {
      fixPage: true
    });
    if (findFixViewIndex !== -1) {
      findFixViewIndex = findFixViewIndex + 1;
    } else {
      findFixViewIndex = 1;
    }
    zIndex = 100 + findFixViewIndex;

    finalXmlNode = (
      <LazyComponent navParams={navParams} moduleToList={this.addModule} />
    );

    let viewItem = {
      pageName: pageId,
      fixPage: fixPage,
      animate: animate,
      zIndex: zIndex,
      domNode: finalXmlNode,
      key: key
    };

    this.listViews.splice(
      findFixViewIndex,
      this.listViews.length - findFixViewIndex,
      viewItem
    );
  }

  /**
   * 后退
   * @param navParams
   */
  @action
  popView(navParams) {
    if (this.listViews.length > 1) {
      this.listViews.pop();
      this._triggerViewBackEvent(navParams);
      this.isBackAction = false;
      window.history.back();
    } else {
      window.postMessage(JSON.stringify({ action: "wap_back" }), "*");
    }
  }

  /**
   * 返回首页
   * @param navParams {*=}
   */
  @action
  popToRoot(navParams) {
    this.backNumPage(0, navParams);
  }

  /**
   * 返回到某一页
   * @param numPlace 返回页面的页码，数组里面的位置（最小为0）
   * @param navParams 返回携带的参数
   */
  @action
  backNumPage(numPlace, navParams) {
    //清除浏览器记录
    // this.isBackAction = false;
    const indexPlace = numPlace + 1;
    let historyLength = -this.listViews.length + indexPlace;
    this._historyBack(historyLength);
    this.listViews = this.listViews.slice(0, indexPlace);
    this._triggerViewBackEvent(navParams);
  }

  /**
   * 接收post信息
   * @param pageName
   * @param messageInfo
   * @return {*}
   */
  @action
  postMessage(pageName, messageInfo) {
    let findViewIndex = findIndex(this.listViews, {
      pageName: pageName
    });
    let lastRef = this.listViews[findViewIndex].viewRef;
    if (lastRef) {
      return lastRef.navPostMessage(messageInfo);
    }
  }

  /**
   * 页面后退
   * @param pageNum 后退页码数量
   * @private
   */
  _historyBack(pageNum) {
    /**
     * TODO  浏览器历史如果一次返回过多，可能出现混乱，目前屏蔽浏览器多次后退
     */
    // if (!platform.version().iosChrome) {
    //   window.history.go(pageNum);
    // }
  }

  /**
   * 触发页面返回事件
   * @private
   */
  _triggerViewBackEvent(navParams) {
    let lastRef = this.listViews.slice(-1)[0].viewRef;
    if (lastRef) {
      lastRef.navBackShowEvent(navParams);
    }
  }

  /**
   * 触发页面隐藏事件
   * @private
   */
  _triggerPageHideEvent() {
    let lastRef = this.listViews.slice(-1)[0].viewRef;
    if (lastRef) {
      lastRef.navPageHideEvent();
    }
  }

  /**
   * 触发android返回事件
   * @private
   */
  _triggerPageBackKeyEvent() {
    let lastRef = this.listViews.slice(-1)[0].viewRef;
    if (lastRef) {
      return lastRef.navPageBackKeyEvent();
    }
    return true;
  }

  /**
   * 当前窗体展开
   * @private
   */
  _triggerWindowShow() {
    this.listViews.forEach(pageView => {
      const { viewRef } = pageView;
      if (viewRef) {
        return viewRef.navWindowShowEvent();
      }
    });
  }

  /**
   * 当前窗体关闭
   * @private
   */
  _triggerWindowHide() {
    this.listViews.forEach(pageView => {
      const { viewRef } = pageView;
      if (viewRef) {
        return viewRef.navWindowHideEvent();
      }
    });
  }

  render() {
    return (
      <TransitionGroup className={styles.navigationContainer}>
        {this.listViews.map(item => {
          let { animate, key } = item;
          return (
            <SlideInOut key={key} in={animate} exit={animate} data={item} />
          );
        })}
      </TransitionGroup>
    );
  }
}

JxNavigation.defaultProps = {
  views: [],
  openForApp: false
};

JxNavigation.propTypes = {
  views: PropTypes.array,
  navController: PropTypes.any,
  openForApp: PropTypes.bool
};
