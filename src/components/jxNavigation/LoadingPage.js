import React from "react";
import JxContent from "../jxContent/JxContent";
import JxPage from "../jxPage/JxPage";
import JxNavBar from "../jxNavBar/JxNavBar";
import {Toast} from "antd-mobile";
import {showLoading} from "jxUtils/common";
import {FormattedMessage} from "react-intl";

//添加页面加载提示，如果网络不好时
export default class LoadingPage extends React.Component {
  componentDidMount() {
    showLoading(
      <FormattedMessage id={"common.loading"} defaultMessage={"加载中"} />
    );
  }

  componentWillUnmount() {
    Toast.hide();
  }

  render() {
    return (
      <JxPage>
        <JxNavBar />
        <JxContent />
      </JxPage>
    );
  }
}
