import React from "react";
import PropTypes from "prop-types";
import { expr } from "mobx-utils";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { ListView, PullToRefresh } from "antd-mobile";
import styles from "./JxListView.module.less";

const separator = (sectionID, rowID) => (
  <div key={`${sectionID}-${rowID}`} className={styles.separator} />
);

//TODO item高度不够的时候，下拉加载可能失效，后续修改
@observer
export default class JxListView extends React.Component {
  @observable refreshing = false;

  @observable iosStyle = styles.listContainer;

  @action.bound
  async onListRefresh() {
    const { onRefresh } = this.props;
    this.refreshing = true;
    await onRefresh();
    this.refreshing = false;
  }

  onEndReached = () => {
    const { onEndReached, hasLoadData } = this.props;
    if (onEndReached && hasLoadData) {
      onEndReached();
    }
  };

  // componentDidMount() {
  //   //XXX 解决部分IOS不能滚动问题,opera不能展示问题
  //   const version = platform.version();
  //   if (
  //     version.ios ||
  //     version.opera ||
  //     (version.chrome && platform.chromeVersion() < 52)
  //   ) {
  //     jxTimeout(() => {
  //       this.iosStyle = styles.listContainerIOS;
  //     }, 1000);
  //   }
  // }

  render() {
    let {
      dataSource,
      renderRow,
      pullToRefresh,
      infiniteScroll,
      onEndReached,
      hasLoadData,
      noDataTip,
      renderSeparator,
      className,
      bodyClassName
    } = this.props;
    let comProp = {};
    if (pullToRefresh) {
      comProp["pullToRefresh"] = (
        <PullToRefresh
          onRefresh={this.onListRefresh}
          refreshing={this.refreshing}
        />
      );
    }
    if (infiniteScroll && hasLoadData) {
      comProp["onEndReached"] = onEndReached;
      comProp["onEndReachedThreshold"] = 10;
      comProp["renderFooter"] = () =>
        hasLoadData ? <div className={styles.load}>加载中...</div> : "加载完毕";
    }

    const hasNoDataDom = expr(
      () => noDataTip && dataSource.getRowCount() === 0
    );

    return (
      <React.Fragment>
        {hasNoDataDom ? (
          noDataTip
        ) : (
          <div className={className || this.iosStyle}>
            <ListView
              style={{
                height: "100%"
              }}
              renderBodyComponent={() => (
                <div className={`${styles.container} ${bodyClassName}`} />
              )}
              renderSeparator={renderSeparator}
              dataSource={dataSource}
              pageSize={20}
              renderRow={renderRow}
              initialListSize={20}
              // scrollRenderAheadDistance={1500}
              // onEndReachedThreshold={300}
              {...comProp}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

JxListView.defaultProps = {
  infiniteScroll: false,
  pullToRefresh: false,
  renderSeparator: separator,
  bodyClassName: ""
};

JxListView.propTypes = {
  dataSource: PropTypes.any,
  infiniteScroll: PropTypes.bool,
  renderRow: PropTypes.func,
  pullToRefresh: PropTypes.bool,
  onRefresh: PropTypes.func,
  onEndReached: PropTypes.func,
  hasLoadData: PropTypes.bool,
  noDataTip: PropTypes.node,
  renderSeparator: PropTypes.func,
  bodyClassName: PropTypes.string
};
