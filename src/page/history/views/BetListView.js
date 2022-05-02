import React from "react";
import { computed, observable } from "mobx";
import { observer, inject } from "mobx-react";
import JxListView from "../../../components/jxListView/JxListView";
import { ListView } from "antd-mobile";
import BetItemView from "./BetItemView";

@inject("historyStore")
@observer
class BetListView extends React.Component {
  @observable
  dataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2
  });

  @computed
  get listDataSource() {
    return this.dataSource.cloneWithRows(
      this.props.historyStore.recordList.slice()
    );
  }

  goDetail = betInfo => {
    this.props.historyStore.goDetail(betInfo);
  };

  rowRender = rowData => {
    const { orderId } = rowData;
    return (
      <BetItemView
        key={orderId}
        data={rowData}
        onTap={() => this.goDetail(rowData)}
      />
    );
  };

  @computed
  get hasLoadData() {
    return this.props.historyStore.pageHasLoadData;
  }

  onRefresh = () => {
    this.props.historyStore.onRefresh();
  };

  onEndReached = () => {
    this.props.historyStore.onEndReached();
  };

  render() {
    return (
      <JxListView
        dataSource={this.listDataSource}
        infiniteScroll={true}
        onRefresh={this.onRefresh}
        pullToRefresh={true}
        renderRow={this.rowRender}
        hasLoadData={this.hasLoadData}
        onEndReached={this.onEndReached}
        noDataTip={""}
      />
    );
  }
}

export default BetListView;
