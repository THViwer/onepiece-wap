import React from "react";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { PullToRefresh } from "antd-mobile";
import ScrollView from "rmc-list-view/lib/ScrollView";
import styles from "./JxRefresh.module.less";

@observer
class JxRefresh extends React.Component {
  @observable refreshing = false;

  @action
  onListRefresh = () => {
    const { onRefresh } = this.props;
    this.refreshing = true;
    onRefresh();
    this.refreshing = false;
  };

  render() {
    const { children, onScroll } = this.props;
    return (
      <div className={styles.jxRefreshContainer} onScroll={onScroll}>
        <ScrollView
          style={{ height: "100%" }}
          pullToRefresh={
            <PullToRefresh
              onRefresh={this.onListRefresh}
              refreshing={this.refreshing}
            />
          }
        >
          {children}
        </ScrollView>
      </div>
    );
  }
}

export default JxRefresh;
