import React from "react";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import styles from "./JxInputSelect.module.less";
import JxPopover from "../jxPopover/JxPopover";
import PropTypes from "prop-types";

const SelectItem = ({ data, onTap }) => {
  const { text } = data;
  return (
    <div tappable="true" className={styles.selectItem} onClick={onTap}>
      {text}
    </div>
  );
};

const SelectDropBodyView = ({ listData, selectEvent }) => {
  return (
    <div className={styles.selectList}>
      {listData.map((item, index) => {
        return (
          <SelectItem key={index} data={item} onTap={() => selectEvent(item)} />
        );
      })}
    </div>
  );
};

@observer
export default class JxInputSelect extends React.Component {
  @observable defaultValue = "";

  @observable defaultText = "";

  @observable visible = false;

  constructor(props) {
    super(props);
    this._checkValue(props);
  }

  componentDidMount() {
    this._checkValue(this.props);
  }

  componentDidUpdate(prevProps) {
    this._checkValue(this.props);
  }

  _checkValue(prevProps) {
    const {
      defaultValue,
      listData,
      onChange,
      triggerFirstChange = true
    } = prevProps;
    if (
      (defaultValue && defaultValue !== this.defaultValue) ||
      this.defaultText === ""
    ) {
      listData.forEach(item => {
        if (item.value === defaultValue) {
          this.defaultText = item.text;
          this.defaultValue = defaultValue;
          if (onChange && triggerFirstChange) {
            onChange(item);
          }
        }
      });
    }
  }

  @action
  selectEvent = item => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(item);
    }
    this.defaultText = item.text;
    this.visible = false;
  };

  @action
  handleVisibleChange = visible => {
    this.visible = visible;
  };

  render() {
    const { listData } = this.props;
    return (
      <JxPopover
        visible={this.visible}
        placement={"bottomLeft"}
        overlay={
          <SelectDropBodyView
            listData={listData}
            selectEvent={this.selectEvent}
          />
        }
        onVisibleChange={this.handleVisibleChange}
      >
        <div className={styles.selectContainer}>
          <div className={styles.selectText}>{this.defaultText}</div>
        </div>
      </JxPopover>
    );
  }
}

JxInputSelect.defaultProps = {
  listData: []
};

JxInputSelect.propTypes = {
  defaultValue: PropTypes.string, //默认值
  listData: PropTypes.any //数组值
};
