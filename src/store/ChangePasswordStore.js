import {action} from "mobx";
import {changePasswordApi} from "../services/User.service";
import appController from "./AppController";
import {showToast} from "jxUtils/common";
import React from "react";
import {FormattedMessage} from "react-intl";

/**
 * 用户登录操作集合
 */
export default class ChangePasswordStore {
  @action
  async changePasswordAction(requestData) {
    const responseData = await changePasswordApi(requestData);
    if (responseData) {
      showToast(
        <FormattedMessage
          id="changePassword.success"
          defaultMessage="修改密码成功"
        />
      );
      appController.navBack();
    }
  }
}
