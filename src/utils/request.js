import {create} from "apisauce";
import {Toast} from "antd-mobile";
import {showToast} from "./common";
import userStore from "../store/UserStore";
import get from "lodash/get";
import homeStore from "../store/HomeStore";
import ErrorMessage from "jxUtils/errorMessage";
import {FormattedMessage} from "react-intl";
import React from "react";
import {showLoading} from "jxUtils/common";

let api;

//api请求工具基本配置处理
class ApiRequestTool {
  //401状态处理
  status401Function;

  //500状态处理
  status500Function;

  //初始请求工具基本参数
  initRequestTool() {
    api = create({
      baseURL: "/api/v1/",
      headers: {
        language: homeStore.locale,
        launch: "Wap"
      },
      timeout: 60000
    });
  }
}

export const apiRequestTool = new ApiRequestTool();

/**
 * 获取其它文件、或者外网接口请求
 * @param requestUrl
 * @return {Promise<null>}
 */
export async function requestGetJSON(
  requestUrl,
  requestData = {},
  option = {}
) {
  const toolApi = create({
    baseURL: "",
    timeout: 60000
  });
  let newOption = Object.assign(
    {
      loading: false
    },
    option
  );
  if (newOption.loading) {
    showLoading(
      <FormattedMessage id={"common.loading"} defaultMessage={"加载中"} />
    );
  }
  const responseData = await toolApi.get(requestUrl, requestData);
  if (newOption.loading) {
    Toast.hide();
  }
  return responseData.ok ? responseData.data : null;
}

export async function requestGet(requestUrl, requestData = {}, option = {}) {
  let newOption = Object.assign(
    {
      toast: false,
      loading: false
    },
    option
  );
  if (newOption.loading) {
    showLoading(
        <FormattedMessage id={"common.loading"} defaultMessage={"加载中"} />
    );
  }

  let httpConfig = {
    headers: {}
  };

  if (option.header) {
    httpConfig.headers = { ...httpConfig.headers, ...option.header };
  }
  const responseData = await api.get(requestUrl, requestData, httpConfig);
  return httpDealAction(newOption, responseData);
}

export async function requestGetAndToken(
  requestUrl,
  requestData = {},
  option = {}
) {
  let newOption = Object.assign(
    {
      toast: false,
      loading: false
    },
    option
  );
  if (newOption.loading) {
    showLoading(
        <FormattedMessage id={"common.loading"} defaultMessage={"加载中"} />
    );
  }
  let httpConfig = {
    headers: { Authorization: "Bearer " + userStore.access_token }
  };
  if (option.header) {
    httpConfig.headers = { ...httpConfig.headers, ...option.header };
  }
  const responseData = await api.get(requestUrl, requestData, httpConfig);
  return httpDealAction(newOption, responseData);
}

export async function requestPost(requestUrl, requestData = {}, option = {}) {
  let newOption = Object.assign(
    {
      toast: true,
      loading: true
    },
    option
  );
  if (newOption.loading) {
    showLoading(
        <FormattedMessage id={"common.loading"} defaultMessage={"加载中"} />
    );
  }
  let httpConfig = {
    headers: {}
  };

  if (option.header) {
    httpConfig.headers = { ...httpConfig.headers, ...option.header };
  }
  const responseData = await api.post(requestUrl, requestData, httpConfig);
  return httpDealAction(newOption, responseData);
}

export async function requestPostAndToken(
  requestUrl,
  requestData = {},
  option = {}
) {
  let newOption = Object.assign(
    {
      toast: true,
      loading: true
    },
    option
  );
  if (newOption.loading) {
    showLoading(
        <FormattedMessage id={"common.loading"} defaultMessage={"加载中"} />
    );
  }
  const httpConfig = {
    headers: { authorization: "Bearer " + userStore.access_token }
  };
  if (option.header) {
    httpConfig.headers = { ...httpConfig.headers, ...option.header };
  }
  if (option.params) {
    httpConfig.params = option.params;
  }
  const responseData = await api.post(requestUrl, requestData, httpConfig);
  return httpDealAction(newOption, responseData);
}

export async function requestDeleteAndToken(
  requestUrl,
  requestData = {},
  option = {}
) {
  let newOption = Object.assign(
    {
      toast: true,
      loading: true
    },
    option
  );
  if (newOption.loading) {
    showLoading(
        <FormattedMessage id={"common.loading"} defaultMessage={"加载中"} />
    );
  }
  const httpConfig = {
    headers: { authorization: "Bearer " + userStore.access_token },
    data: requestData
  };
  const responseData = await api.delete(requestUrl, requestData, httpConfig);
  return httpDealAction(newOption, responseData);
}

export async function requestPut(requestUrl, requestData = {}, option = {}) {
  let newOption = Object.assign(
    {
      toast: true,
      loading: true
    },
    option
  );
  if (newOption.loading) {
    showLoading(
        <FormattedMessage id={"common.loading"} defaultMessage={"加载中"} />
    );
  }
  let httpConfig = {
    headers: {}
  };

  if (option.header) {
    httpConfig.headers = { ...httpConfig.headers, ...option.header };
  }
  const responseData = await api.put(requestUrl, requestData, httpConfig);
  return httpDealAction(newOption, responseData);
}

export async function requestPutAndToken(
  requestUrl,
  requestData = {},
  option = {}
) {
  let newOption = Object.assign(
    {
      toast: true,
      loading: true
    },
    option
  );
  if (newOption.loading) {
    showLoading(
        <FormattedMessage id={"common.loading"} defaultMessage={"加载中"} />
    );
  }
  const httpConfig = {
    headers: { authorization: "Bearer " + userStore.access_token }
  };
  if (option.header) {
    httpConfig.headers = { ...httpConfig.headers, ...option.header };
  }
  const responseData = await api.put(requestUrl, requestData, httpConfig);
  return httpDealAction(newOption, responseData);
}

function httpDealAction(option = {}, responseData) {
  let { toast, loading, errorMessage, failFn } = Object.assign(
    {
      toast: true,
      loading: true,
      errorMessage: null,
      failFn: () => {}
    },
    option
  );
  if (loading) {
    Toast.hide();
  }

  //没有登录权限
  if (responseData.status === 401) {
    if (apiRequestTool.status401Function) {
      apiRequestTool.status401Function();
    }
  }

  if (responseData.status === 204) {
    return "请求成功";
  }

  if (responseData.status === 500) {
    if (apiRequestTool.status500Function) {
      apiRequestTool.status500Function();
    }
    const messageState = get(responseData, "data.message", "6004");
    if (messageState) {
      if (ErrorMessage.hasOwnProperty(messageState)) {
        showToast(ErrorMessage[messageState]);
      } else {
        showToast(
          <FormattedMessage
            id={"common.errorServer"}
            defaultMessage={"服务器异常"}
          />
        );
      }
    }

    // // if (toast) {
    // //   showToast(
    // //     errorMessage || get(responseData, "data.message", "服务器异常")
    // //   );
    // // }
    // showToast("");
    failFn();
    // showToast("服务器异常");
    return null;
  }

  if (!responseData.ok) {
    if (toast) {
      showToast(
        errorMessage || get(responseData, "data.message", "服务器异常")
      );
    }
    failFn();
    return null;
  }

  if (responseData.status === 200 && responseData.data === null) {
    return "请求成功";
  }

  return responseData.data;
}
