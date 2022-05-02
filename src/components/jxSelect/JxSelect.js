import React from "react";
import {action, observable} from "mobx";
import {observer} from "mobx-react";
import PropTypes from "prop-types";

/**
 * 简单的js单选结构
 */
@observer
class JxSelect extends React.Component {
  @observable selectIndex;

  // 构造
  constructor(props) {
    super(props);
    const { defaultIndex, listData, autoFirstEvent } = this.props;
    this.selectIndex = defaultIndex;

    if (listData && listData.length > 0) {
      listData.forEach((item, index) => {
        if (item.isSelect) {
          this.selectIndex = index;
          if (autoFirstEvent) {
            this._onTap(item, index);
          }
        }
      });
      if (this.selectIndex === 0) {
        listData[0].isSelect = true;
        if (autoFirstEvent) {
          this._onTap(listData[0], 0);
        }
      }
    }
  }

  @action
  _onTap = (item, index) => {
    const { onChange, listData } = this.props;
    let oldItem;
    if (this.selectIndex !== undefined) {
      oldItem = listData[this.selectIndex];
      //TODO 可能外部随意修改组件的默认选择
      listData.map((item, itemIndex) => {
        if (item.isSelect) {
          oldItem = item;
        }
        item.isSelect = index === itemIndex;
        return item;
      });
    }
    this.selectIndex = index;
    item.isSelect = true;
    if (onChange) {
      onChange(item, index, oldItem);
    }
  };

  render() {
    let { className, listData, OptionComponent } = this.props;
    return (
      <div className={className}>
        {listData.map((item, index) => {
          return (
            <OptionComponent
              key={index}
              data={item}
              onTap={() => this._onTap(item, index)}
            />
          );
        })}
      </div>
    );
  }
}

JxSelect.defaultProps = {
  listData: [],
  defaultIndex: 0,
  autoFirstEvent: false
};

JxSelect.propTypes = {
  defaultIndex: PropTypes.number,
  className: PropTypes.string,
  listData: PropTypes.any,
  OptionComponent: PropTypes.any,
  onChange: PropTypes.func,
  autoFirstEvent: PropTypes.bool
};

export default JxSelect;
