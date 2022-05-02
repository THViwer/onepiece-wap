import React, { Component } from "react";
import { Accordion } from "antd-mobile";
import { computed } from "mobx";
import { inject, observer } from "mobx-react";
import styles from "./AllAccountView.module.less";
import TextDelayButton from "jxComponents/jxButton/TextDelayButton";
import {FormattedMessage} from "react-intl";

@inject("accountManageStore")
@observer
class PlatformItemView extends React.Component {
  onChange = () => {
    this.props.accountManageStore.goChangePasswordPage(this.props.data);
  };

  render() {
    let { data } = this.props;
    let { platform } = data;
    return (
      <TextDelayButton className={styles.item1} onClick={this.onChange}>
        <div>{platform}</div>
        <div className={styles.item2} />
      </TextDelayButton>
    );
  }
}

@inject("accountManageStore")
@observer
class AllAccountView extends Component {
  @computed get menuInfo() {
    return this.props.accountManageStore.menuInfo;
  }

  onChange = index => {
    this.props.accountManageStore.updateMenuInfo(index);
  };

  render() {
    return (
      <Accordion
        accordion
        defaultActiveKey={"0"}
        openAnimation={{}}
        onChange={this.onChange}
        className={styles.accordion}
      >
        <Accordion.Panel key={0} header={<FormattedMessage id='user.platforms' defaultMessage='平台列表' />}>
          {this.menuInfo[0].list.map(item => {
            return (
              <PlatformItemView
                category={this.menuInfo[0].category}
                data={item}
                key={item.platform}
              />
            );
          })}
        </Accordion.Panel>
      </Accordion>
    );
  }
}

export default AllAccountView;
