import React from "react";
import {observer} from "mobx-react";
import JxPage from "jxComponents/jxPage/JxPage";
import JxContent from "jxComponents/jxContent/JxContent";
import JxNavBar from "jxComponents/jxNavBar/JxNavBar";
import {hot} from "react-hot-loader/root";
import AccountManageStore from "../../store/AccountManageStore";
import AllAccountView from "./views/AllAccountView";
import {computed} from "mobx";
import {FormattedMessage} from "react-intl";

@observer
class AccountManagePage extends React.Component {
  accountManageStore = new AccountManageStore();

  @computed
  get accountList() {
    return this.accountManageStore.showList;
  }

  render() {
    return (
      <JxPage
        storeKey={"accountManageStore"}
        storeValue={this.accountManageStore}
      >
        <JxNavBar><FormattedMessage id='user.changePlatformPassword' defaultMessage='修改游戏密码' /></JxNavBar>
        <JxContent>{this.accountList ? <AllAccountView /> : null}</JxContent>
      </JxPage>
    );
  }
}

export default hot(AccountManagePage);
