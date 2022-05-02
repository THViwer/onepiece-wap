import React from "react";
import PropTypes from "prop-types";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import JxPopover from "../jxPopover/JxPopover";
import JxSelect from "../jxSelect/JxSelect";
import styles from "./JxDropSelect.module.less";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const SelectItem = observer(({ data, onTap }) => {
  const { text, isSelect } = data;
  const className = cx({
    selectItem: true,
    selectItemActive: isSelect
  });
  return (
    <div onClick={onTap} className={className}>
      {text}
      <div className="radioInner" />
    </div>
  );
});

@observer
export default class JxDropSelect extends React.Component {
  @observable selectText = "";
  @observable visible = false;
  @observable selectIndex = 0;

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    const { defaultText } = this.props;
    this.selectText = defaultText;
  }

  @action
  onVisibleChange = visible => {
    this.visible = visible;
  };

  @action
  _onChange = (selectInfo, index) => {
    const { onChange } = this.props;
    this.selectText = selectInfo.text;
    if (onChange) {
      onChange(selectInfo, index);
    }
    this.selectIndex = index;
    this.visible = false;
  };

  render() {
    const { listData } = this.props;
    return (
      <JxPopover
        visible={this.visible}
        onVisibleChange={this.onVisibleChange}
        overlay={
          <JxSelect
            defaultIndex={this.selectIndex}
            listData={listData}
            onChange={this._onChange}
            className={styles.selectContainer}
            OptionComponent={SelectItem}
          />
        }
      >
        <div className={styles.selectContent}>
          {this.selectText}
          <div className={styles.iconStart} />
        </div>
      </JxPopover>
    );
  }
}

JxDropSelect.propTypes = {
  listData: PropTypes.any,
  onChange: PropTypes.func,
  defaultText: PropTypes.string
};
