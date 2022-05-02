import React from "react";
import ReactDOM from "react-dom";
import {Modal} from "antd-mobile";

export default function JxAlert(
  title,
  message,
  actions = [{ text: "确定" }],
  platform = "ios"
) {
  let closed = false;

  if (!title && !message) {
    // console.log('Must specify either an alert title, or message, or both');
    return {
      close: () => {}
    };
  }

  const div = document.createElement("div");
  document.body.appendChild(div);

  function close() {
    ReactDOM.unmountComponentAtNode(div);
    if (div && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  const footer = actions.map(button => {
    // tslint:disable-next-line:only-arrow-functions
    const orginPress = button.onPress || function() {};
    button.onPress = () => {
      if (closed) {
        return;
      }

      const res = orginPress();
      if (res && res.then) {
        res
          .then(() => {
            closed = true;
            close();
          })
          .catch(() => {});
      } else {
        closed = true;
        close();
      }
    };
    return button;
  });

  const prefixCls = "am-modal";

  // function onWrapTouchStart(e) {
  //   if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
  //     return;
  //   }
  //   const pNode = closest(e.currentTarget, `.${prefixCls}-footer`);
  //   if (!pNode) {
  //     e.preventDefault();
  //   }
  // }

  ReactDOM.render(
    <Modal
      visible
      transparent
      title={title}
      transitionName="am-zoom"
      maskTransitionName="am-fade"
      closable={false}
      maskClosable={false}
      footer={footer}
      platform={platform}
      // wrapProps={{ onTouchStart: onWrapTouchStart }}
    >
      <div className={`${prefixCls}-alert-content`}>{message}</div>
    </Modal>,
    div
  );
  return {
    close
  };
}
