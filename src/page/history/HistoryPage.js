import React from "react";
import {observer} from "mobx-react";
import {hot} from "react-hot-loader";
import JxPage from "../../components/jxPage/JxPage";
import JxContent from "../../components/jxContent/JxContent";
import JxModule from "../../components/jxModule/JxModule";
import HistoryStore from "../../store/HistoryStore";
import JxNavBar from "jxComponents/jxNavBar/JxNavBar";
import JxTabsPanel from "jxComponents/jxTabsPanel/JxTabsPanel";
import BetListView from "./views/BetListView";
import {FormattedMessage} from "react-intl";
import DatePopover from "./views/DatePopover";

@observer
class HistoryPage extends JxModule {
  historyStore = new HistoryStore();

  gameTypeList = [
    {
      id: "Deposit",
      text: "Deposit",
      textDom: <FormattedMessage id="history.deposit" defaultMessage={"充值"} />
    },
    {
      id: "Withdraw",
      text: "Withdraw",
      textDom: (
        <FormattedMessage id="history.withdraw" defaultMessage={"提款"} />
      )
    },
    {
      id: "Promotion",
      text: "Promotion",
      textDom: (
        <FormattedMessage id="history.promotion" defaultMessage={"活动"} />
      )
    },
    {
      id: "Details",
      text: "Details",
      textDom: <FormattedMessage id="history.details" defaultMessage={"明细"} />
    }
  ];

  onTabClick = selectInfo => {
    this.historyStore.changeType(selectInfo);
  };

  renderContent = () => {
    return <BetListView />;
  };

  render() {
    return (
      <JxPage storeValue={this.historyStore} storeKey={"historyStore"}>
        <JxNavBar rightTextButton={<DatePopover />}>
          <FormattedMessage id="funds.history" defaultMessage="历史" />
        </JxNavBar>
        <JxContent>
          <JxTabsPanel
            tabs={this.gameTypeList}
            defaultId={"id"}
            defaultTitle={"textDom"}
            renderContent={this.renderContent}
            destroyInactiveTab={true}
            onTabClick={this.onTabClick}
          />
        </JxContent>
      </JxPage>
    );
  }
}

export default hot(module)(HistoryPage);
