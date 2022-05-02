import React from "react";
import { Popover } from "antd-mobile";
import { uniqueId } from "../../utils/common";
import platform from "../../utils/platform";

//XXX Popover的点击元素只支持div,不支持其它的
class JxPopover extends React.Component {
  compId = "";
  onVisibleChange = visible => {
    const { onVisibleChange } = this.props;
    if (onVisibleChange) {
      onVisibleChange(visible);
    }

    //标记Popover的dom的id，方便后续销毁
    if (this.compId === "") {
      let maskDoms = document.querySelectorAll(".am-popover-mask");
      if (maskDoms.length > 0) {
        setTimeout(() => {
          maskDoms = document.querySelectorAll(".am-popover-mask");
          const popoverDom =
            maskDoms[maskDoms.length - 1].parentNode.parentNode;
          this.compId = uniqueId();
          popoverDom.id = this.compId;
        }, 500);
      }
    }
  };

  componentDidMount() {
    /**
     * XXX IOS的mask点击无法关闭
     */
    if (platform.version().ios && this.props.visible) {
      setTimeout(() => {
        let maskDoms = document.querySelectorAll(".am-popover-mask");
        if (maskDoms.length > 0) {
          maskDoms[maskDoms.length - 1].onclick = () => {
            this.onVisibleChange(false);
          };
        }
      }, 500);
    }
  }

  componentWillUnmount() {
    if (this.compId) {
      const findDom = document.querySelector(`div[id="${this.compId}"]`);
      if (findDom !== null) {
        findDom.remove();
      }
    }
  }

  render() {
    return (
      <Popover
        {...this.props}
        onVisibleChange={this.onVisibleChange}
        destroyTooltipOnHide={true}
      />
    );
  }
}

export default JxPopover;
