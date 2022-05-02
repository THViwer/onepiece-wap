import React from "react";

//为了解决hot加载 寻找不到ref组建
export default class JxModule extends React.Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    const { moduleToList } = props;
    moduleToList(this);
  }

  /**
   * 点击返回键触发事件
   */
  navPageBackKeyEvent() {
    return true;
  }

  /**
   * 返回后展示事件
   */
  navBackShowEvent(navParam) {}

  /**
   * 页面销毁事件
   */
  navPageHideEvent() {}

  /**
   * 窗体关闭事件
   */
  navWindowHideEvent() {}

  /**
   * 窗体展开事件
   */
  navWindowShowEvent() {}

  /**
   * 发送消息
   */
  navPostMessage(messageInfo) {}
}
