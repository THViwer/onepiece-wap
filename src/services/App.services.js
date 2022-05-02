import {requestGet} from "../utils/request";
import {requestGetJSON} from "jxUtils/request";


/**
 *
 * @param requestData
 * @param option
 * @return {Promise<*>}
 */
export function initHomeApi(requestData, option) {
    const api = "player/api";
    return requestGet(api, requestData, option);
}

export function getAllPlatformsApi(requestData, option) {
    const api = "player/api/index/platforms";
    return requestGet(api, requestData, option);
}

export function getHotGamesApi(requestData, option) {
    const api = "player/api/hotGames";
    return requestGet(api, requestData, option);
}

export function getSeoApi(requestData, option) {
    const api = "player/api/seo";
    return requestGet(api, requestData, option);
}

/**
 * 下载
 * @param requestData
 * @param option
 * @return {Promise<*>}
 */
export function appDownApi(requestData, option) {
    const api = "player/api/down";
    return requestGet(api, requestData, option);
}

/**
 * 优惠活动
 * @param requestData
 * @param option
 * @return {Promise<string|null>}
 */
export function promotionListApi(requestData, option) {
    const api = "player/api/promotion";
    return requestGet(api, requestData, option);
}

/**
 * 联系人
 * @param requestData
 * @param option
 * @return {Promise<string|null>}
 */
export function contactUsListApi(requestData, option) {
    const api = "player/api/contactUs";
    return requestGet(api, requestData, option);
}

export function selectCountryApi(requestData, option) {
    const api = "player/api/select/country";
    return requestGet(api, requestData, option);
}

/**
 * 下载用户信息配置
 * @return {Promise<*>}
 */
export function downJSONApi(path) {
    return requestGetJSON(path);
}
