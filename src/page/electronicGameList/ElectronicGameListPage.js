import React from "react";
import {observer} from "mobx-react";
import {computed} from "mobx";
import {hot} from "react-hot-loader";
import JxPage from "jxComponents/jxPage/JxPage";
import JxNavBar from "jxComponents/jxNavBar/JxNavBar";
import JxContent from "jxComponents/jxContent/JxContent";
import ElectronicGameListStore from "../../store/ElectronicGameListStore";
import ElectronicMainView from "./views/ElectronicMainView";
import JxTabsPanel from "jxComponents/jxTabsPanel/JxTabsPanel";

@observer
class ElectronicGameListPage extends React.Component {
  electronicGameListStore;

  // 构造
  constructor(props) {
    super(props);
    this.electronicGameListStore = new ElectronicGameListStore(props.navParams);
  }

  @computed get gameTypeList() {
    return this.electronicGameListStore.platformMenuList;
  }

  renderContent = tabs => {
    const { games } = tabs;
    return <ElectronicMainView data={games} />;
  };

  render() {
    return (
      <JxPage
        storeValue={this.electronicGameListStore}
        storeKey={"electronicGameListStore"}
      >
        <JxNavBar>{this.props.navParams.name}</JxNavBar>
        <JxContent>
          <JxTabsPanel
            autoWidth={this.gameTypeList.length > 6}
            tabs={this.gameTypeList}
            defaultTitle={"gameCategory"}
            renderContent={this.renderContent}
            destroyInactiveTab={true}
          />
        </JxContent>
      </JxPage>
    );
  }
}

export default hot(module)(ElectronicGameListPage);
