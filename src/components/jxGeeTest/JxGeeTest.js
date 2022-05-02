import React from "react";
import { action } from "mobx";
import "../../utils/gt";
import { initGeeTestApi } from "../../services/JxApp.services";
import PropTypes from "prop-types";
import { showToast } from "../../utils/common";

export default class JxGeeTest extends React.Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.initTool();
  }

  geeTestDom;

  componentWillUnmount() {
    if (this.geeTestDom) {
      this.geeTestDom.destroy();
    }
  }

  @action async initTool() {
    const { successFunction, initAction } = this.props;
    const responseData = await initGeeTestApi();
    if (responseData) {
      const { gt, challenge, success } = responseData;
      /*global initGeetest:true*/
      initGeetest(
        {
          gt: gt,
          challenge: challenge,
          offline: !success,
          new_captcha: true,
          product: "bind"
        },
        captchaObj => {
          // captchaObj.appendTo(this.domView);
          this.geeTestDom = captchaObj;
          captchaObj
            .onReady(function() {
              //验证码ready之后才能调用verify方法显示验证码
              initAction(() => {
                captchaObj.verify();
              });
            })
            .onSuccess(function(data) {
              const resultInfo = captchaObj.getValidate();
              successFunction(resultInfo, () => {
                captchaObj.reset();
              });
            })
            .onError(function() {
              //your code
              showToast("验证失败");
            });
        }
      );
    }
  }

  render() {
    return <React.Fragment />;
  }
}

JxGeeTest.propTypes = {
  successFunction: PropTypes.func
};
