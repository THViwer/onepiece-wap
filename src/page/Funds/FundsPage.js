import React from "react";
import {computed} from "mobx";
import {inject, observer} from "mobx-react";
import JxPage from "jxComponents/jxPage/JxPage";
import JxContent from "jxComponents/jxContent/JxContent";
import JxNavBar from "jxComponents/jxNavBar/JxNavBar";
import {FormattedMessage} from "react-intl";
import WalletView from "./views/WalletView";
import FastActionView from "./views/FastActionView";
import AllBalanceView from "./views/AllBalanceView";
import TransferView from "./views/TransferView";
import PromotionDialog from "./views/PromotionDialog";
import {hot} from "react-hot-loader/root";

@inject("userStore", "transferStore")
@observer
class FundsPage extends React.Component {
  @computed
  get isLogin() {
    return this.props.userStore.isLogin;
  }

  onAllBack = platformInfoList => {
    this.props.transferStore.updatePlatformInfo(platformInfoList);
  };

  render() {
    return (
      <JxPage>
        <JxNavBar hasBackButton={false}>
          <FormattedMessage id="home.founds" defaultMessage={"资金"} />
        </JxNavBar>
        <JxContent>
          <WalletView onSuccess={this.onAllBack} />
          <FastActionView />
          {this.isLogin ? <AllBalanceView /> : null}
          <TransferView />
          <PromotionDialog />
        </JxContent>
      </JxPage>
    );
  }
}

export default hot(FundsPage);
