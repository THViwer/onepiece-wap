import React, {Component} from "react";
import JxPopover from "jxComponents/jxPopover/JxPopover";
import {Popover} from "antd-mobile";
import {computed, observable} from "mobx";
import {inject, observer} from "mobx-react";
import {defineMessages, injectIntl} from "react-intl";
import styles from "./DatePopover.module.less";

const messages = defineMessages({
  date1: {
    id: "history.date1",
    defaultMessage: "今天"
  },
  date2: {
    id: "history.date2",
    defaultMessage: "3天以内"
  },
  date3: {
    id: "history.date3",
    defaultMessage: "一星期内"
  },
  date4: {
    id: "history.date4",
    defaultMessage: "一个月内"
  }
});

@injectIntl
@inject("historyStore")
@observer
class DatePopover extends Component {
  @observable visible = false;
  @observable selected = "";

  @computed get historyDate() {
    return this.props.historyStore.historyDate;
  }

  handleVisibleChange = visible => {
    this.visible = visible;
  };

  onSelect = opt => {
    this.visible = false;
    this.props.historyStore.changeDate(opt.props.value);
  };

  render() {
    const {
      intl: { formatMessage }
    } = this.props;
    return (
      <JxPopover
        // overlayClassName={styles.container}
        mask={true}
        visible={this.visible}
        overlay={this.historyDate.map(item => {
          const { value, text } = item;
          return (
            <Popover.Item key={value} value={value}>
              {formatMessage(messages[text])}
            </Popover.Item>
          );
        })}
        align={{
          overflow: { adjustY: 0, adjustX: 0 },
          offset: [-10, 0]
        }}
        onVisibleChange={this.handleVisibleChange}
        onSelect={this.onSelect}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "8rem"
          }}
        >
          <div className={styles.historyIcon} />
        </div>
      </JxPopover>
    );
  }
}

export default DatePopover;
