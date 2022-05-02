import {
    requestGet,
    requestGetAndToken,
    requestPost,
    requestPostAndToken,
    requestPut,
    requestPutAndToken
} from "jxUtils/request";

/**
 * 登录
 * @param requestData
 * @param option
 * @return {Promise<*>}
 */
export function loginApi(requestData, option) {
  const api = "player/user";
  return requestPost(api, requestData, option);
}

export function loginDetailApi(requestData, option) {
  const api = "player/user/login/detail";
  return requestGetAndToken(api, requestData, option);
}

/**
 * 检测
 * @param requestData
 * @param option
 * @return {Promise<*>}
 */
export function checkUserNameApi(requestData, option) {
  const api = `player/user/check/${option.url.username}`;
  return requestGet(api, requestData, option);
}

export function checkPhoneApi(requestData, option) {
  const api = `player/user/check/phone/${option.url.phone}`;
  return requestGet(api, requestData, option);
}

export function getSupportCountryApi(requestData, option) {
  const api = `player/user/country`;
  return requestGet(api, requestData, option);
}

/**
 * 注册
 * @param requestData
 * @param option
 * @return {Promise<*>}
 */
export function registerApi(requestData, option) {
  const api = "player/user";
  return requestPut(api, requestData, option);
}

/**
 * 修改
 * @param requestData
 * @param option
 * @return {Promise<*>}
 */
export function changePasswordApi(requestData, option) {
  const api = "player/user/password";
  return requestPutAndToken(api, requestData, option);
}

/**
 * 登录
 * @param requestData
 * @param option
 * @return {Promise<*>}
 */
export function currentUserInfoApi(requestData, option) {
  const api = "player/user/current";
  return requestGetAndToken(api, requestData, option);
}

/**
 * 用户单个余额
 * @param requestData
 * @param option
 * @return {Promise<*>}
 */
export function userBalanceApi(requestData, option) {
  const api = "player/cash/balance";
  return requestGetAndToken(api, requestData, option);
}

/**
 * 用户所有平台余额
 * @param requestData
 * @param option
 * @return {Promise<*>}
 */
export function userAllBalanceApi(requestData, option) {
  const api = "player/cash/balances";
  return requestGetAndToken(api, requestData, option);
}

/**
 * 登录
 * @param requestData
 * @param option
 * @return {Promise<*>}
 */
export function startTestPlatformApi(requestData, option) {
  const api = "player/api/demo";
  return requestGetAndToken(api, requestData, option);
}

/**
 * 开启平台游戏
 * @param requestData
 * @param option
 * @return {Promise<*>}
 */
export function startPlatformApi(requestData, option) {
  const api = "player/api/start";
  return requestGetAndToken(api, requestData, option);
}

/**
 * 开启老虎机游戏
 * @param requestData
 * @param option
 * @return {Promise<*>}
 */
export function startPlatformSingleGameApi(requestData, option) {
  const api = "player/api/start/slot";
  return requestGetAndToken(api, requestData, option);
}

/**
 * 开启试玩老虎机游戏
 * @param requestData
 * @param option
 * @return {Promise<*>}
 */
export function startDemoPlatformSingleGameApi(requestData, option) {
  const api = "player/api/start/slot/demo";
  return requestGetAndToken(api, requestData, option);
}

/**
 * 登录
 * @param requestData
 * @param option
 * @return {Promise<*>}
 */
export function downPlatformAppApi(requestData, option) {
  const api = `player/api/down`;
  return requestGet(api, requestData, option);
}

/**
 * 平台账号
 * @param requestData
 * @param option
 * @return {Promise<*>}
 */
export function platformMemberApi(requestData, option) {
  const api = `player/api/platform/member`;
  return requestGetAndToken(api, requestData, option);
}

export function slotMenuApi(requestData, option) {
  const api = "player/api/slots";
  return requestGet(api, requestData, option);
}

export function checkPromotionApi(requestData, option) {
  const api = "player/cash/check/promotion";
  return requestGetAndToken(api, requestData, option);
}

export function transferApi(requestData, option) {
  const api = "player/cash/transfer";
  return requestPutAndToken(api, requestData, option);
}

/**
 * 所有钱回到中心
 * @param requestData
 * @param option
 * @returns {Promise<string|null>}
 */
export function transferAllInApi(requestData, option) {
  const api = "player/cash/transfer/in/all";
  return requestPutAndToken(api, requestData, option);
}

/**
 * 客戶銀行卡
 * @param requestData
 * @param option
 * @return {Promise<string|null>}
 */
export function clientBankApi(requestData, option) {
  const api = "player/cash/bank/client";
  return requestGetAndToken(api, requestData, option);
}

/**
 * 客戶銀行卡
 * @param requestData
 * @param option
 * @return {Promise<string|null>}
 */
export function userBankApi(requestData, option) {
  const api = "player/cash/bank/my";
  return requestGetAndToken(api, requestData, option);
}

/**
 * 添加客戶銀行卡
 * @param requestData
 * @param option
 * @return {Promise<string|null>}
 */
export function addUserBankApi(requestData, option) {
  const api = "player/cash/bank/my";
  return requestPostAndToken(api, requestData, option);
}

export function editUserBankApi(requestData, option) {
  const api = "player/cash/bank/my";
  return requestPutAndToken(api, requestData, option);
}

/**
 * 检测打码量
 * @param requestData
 * @param option
 * @return {Promise<string|null>}
 */
export function checkBetApi(requestData, option) {
  const api = "player/cash/checkBet";
  return requestGetAndToken(api, requestData, option);
}

/**
 * 提款
 * @param requestData
 * @param option
 * @return {Promise<string|null>}
 */
export function withdrawApi(requestData, option) {
  const api = "player/cash/withdraw";
  return requestPostAndToken(api, requestData, option);
}

/**
 * 支持客戶銀行卡
 * @param requestData
 * @param option
 * @return {Promise<string|null>}
 */
export function supportBankApi(requestData, option) {
  const api = "player/cash/bank";
  return requestGetAndToken(api, requestData, option);
}

/**
 * 充值
 * @param requestData
 * @param option
 * @return {Promise<string|null>}
 */
export function depositApi(requestData, option) {
  const api = "player/cash/deposit";
  return requestPostAndToken(api, requestData, option);
}

/**
 * 充值
 * @param requestData
 * @param option
 * @return {Promise<string|null>}
 */
export function uploadImgApi(requestData, option) {
  const api = "player/cash/upload/proof";
  return requestPostAndToken(api, requestData, option);
}

export function checkBankApi(requestData, option) {
  const api = "player/cash/bank/check";
  return requestGetAndToken(api, requestData, option);
}

export function clientThirdPayApi(requestData, option) {
  const api = "player/cash/pays";
  return requestGetAndToken(api, requestData, option);
}

export function clientThirdPayDealApi(requestData, option) {
  const api = "player/cash/thirdpay/select";
  return requestPostAndToken(api, requestData, option);
}

/**
 * 充值列表
 * @param requestData
 * @param option
 * @return {Promise<string|null>}
 */
export function depositListApi(requestData, option) {
  const api = "player/cash/topup";
  return requestGetAndToken(api, requestData, option);
}

/**
 * 取款列表
 * @param requestData
 * @param option
 * @return {Promise<string|null>}
 */
export function withdrawListApi(requestData, option) {
  const api = "player/cash/withdraw";
  return requestGetAndToken(api, requestData, option);
}

/**
 * 钱包列表
 * @param requestData
 * @param option
 * @return {Promise<string|null>}
 */
export function walletListApi(requestData, option) {
  const api = "player/cash/wallet/note";
  return requestGetAndToken(api, requestData, option);
}

export function thirdPayHistoryListApi(requestData, option) {
  const api = "player/cash/thirdpay/order";
  return requestGetAndToken(api, requestData, option);
}

/**
 * 平台用户列表
 * @param requestData
 * @param option
 * @return {Promise<string|null>}
 */
export function platformAccountListApi(requestData, option) {
  const api = "player/user/platform";
  return requestGetAndToken(api, requestData, option);
}

/**
 * 修改平台用户
 * @param requestData
 * @param option
 * @return {Promise<string|null>}
 */
export function editPlatformAccountApi(requestData, option) {
  const api = "player/user/platform";
  return requestPutAndToken(api, requestData, option);
}

export function changeConfigApi(requestData, option) {
  const api = `player/user/config?autoTransfer=${requestData.autoTransfer}`;
  return requestPutAndToken(api, null, option);
}
