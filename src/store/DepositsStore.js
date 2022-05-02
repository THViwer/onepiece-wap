import {
  checkBankApi,
  clientThirdPayApi,
  clientThirdPayDealApi,
  depositApi,
  uploadImgApi,
  userBankApi
} from "../services/User.service";
import {action, observable} from "mobx";
import appController from "./AppController";
import {imgImport, showLoading, showToast, siteUrlPath} from "jxUtils/common";
import FormData from "form-data";
import React from "react";
import {FormattedMessage} from "react-intl";
import {webStorageSetItem} from "jxUtils/webStorage";
import BrowserWindow from "jxUtils/BrowserWindow";

export default class DepositsStore {
  @observable
  payId;

  @observable
  payType = 1;

  @observable
  depositOptionsList = [];

  @observable
  moneyList = [
    {
      value: 50,
      isSelect: false
    },
    {
      value: 100,
      isSelect: false
    },
    {
      value: 300,
      isSelect: false
    },
    {
      value: 500,
      isSelect: false
    }
  ];

  @observable
  clientBankInfo = {};

  @observable
  clientBankList = [];

  @observable
  thirdClientBankList = [];

  @observable
  supportBankList = [];

  @observable
  depositChannelList = [
    [
      {
        label: "ATM",
        value: "ATM"
      },
      {
        label: "ONLINE BANK",
        value: "ONLINE_BANK"
      },
      {
        label: "CASH DEPOSIT",
        value: "CASH_DEPOSIT_MACHINE"
      }
    ]
  ];

  //第一部分充值信息
  depositInfo1;

  @observable
  minAmount = 0;

  @observable
  maxAmount = 0;

  async initData() {
    clientThirdPayApi().then(responseData => {
      if (responseData) {
        const { thirdPays = [], banks = [] } = responseData;
        thirdPays.push({
          payType: "Bank",
          logo: imgImport("img/bank_transfer_ori.png"),
          greyLogo: imgImport("img/bank_transfer_gray.png"),
          payId: 0
        });
        thirdPays.map(item => {
          item.isSelect = false;
          return item;
        });
        this.changeDepositOption(thirdPays[0]);
        thirdPays[0].isSelect = true;
        this.depositOptionsList = thirdPays;
        banks.map((item, index) => {
          item.isSelect = index === 0;
          return item;
        });
        this.clientBankList = banks;
      }
    });

    const supportData = await userBankApi().then();
    if (supportData) {
      supportData.map(item => {
        item.value = item.bank;
        item.label = item.bank;
        return item;
      });
      if (supportData.length > 0) {
        this.supportBankList = [supportData];
      }
    }
  }

  changeDepositOption(payInfo) {
    const { payId, payType, banks } = payInfo;
    if (payId !== 0) {
      this.maxAmount = payInfo.maxAmount;
      this.minAmount = payInfo.minAmount;
      if (payType === "SurePay"|| payType === "FPX") {
        this.thirdClientBankList = banks.map((item, index) => {
          item.isSelect = index === 0;
          return item;
        });
      }
    }
    this.payId = payId;
    this.payType = payType;
  }

  goDeposit2Page(depositInfo1, files) {
    this.depositInfo1 = depositInfo1;

    this.depositInfo(files.length > 0 ? files[0] : null);
    // appController.navPushPage("Deposits2Page", {
    //   depositsStore: this
    // });
  }

  async depositInfo(file) {
    let formInfo = this.depositInfo1;
    showLoading(
      <FormattedMessage id={"common.loading"} defaultMessage={"加载中"} />
    );
    const { memberBankId, memberBankCardNumber } = this.depositInfo1;
    if (memberBankId === undefined) {
      const checkResponseData = await checkBankApi({
        bankCardNo: memberBankCardNumber
      });
      if (checkResponseData) {
        const { exist = true } = checkResponseData;
        if (exist) {
          showToast(
            <FormattedMessage
              id="withdraw.errorHasBank"
              defaultMessage="银行卡已存在！"
            />
          );
          return;
        }
      }
    }
    if (file) {
      const formData = new FormData();
      formData.append(
        "file",
        new Blob([file], { type: file.type }),
        file.name || "file"
      );
      const uploadResponse = await uploadImgApi(formData, { loading: false });
      if (uploadResponse) {
        const { path } = uploadResponse;
        formInfo.imgPath = path;
      }
    }
    const responseData = await depositApi(formInfo, { loading: false });
    if (responseData) {
      showToast(
        <FormattedMessage
          id="deposit.success"
          defaultMessage="申请存款提交成功"
        />
      );
      appController.navPopToRootView();
    }
  }

  @action
  async goThirdPage(info) {
    let browserWindow = new BrowserWindow();
    const responseData = await clientThirdPayDealApi(null, {
      params: {
        ...info,
        responseUrl: siteUrlPath("paySuccess.html")
      }
    });

    if (responseData) {
      webStorageSetItem("thirdPay", JSON.stringify(responseData.data));
      switch (this.payType) {
        case "M3Pay":
          browserWindow.open("/m/m3pay.html");
          break;
        case "SurePay":
          browserWindow.open("/m/surepay.html");
          break;
        default:
          const {payUrl} = responseData.data;
          browserWindow.open(payUrl);
      }

      showToast(
        <FormattedMessage
          id="deposit.success"
          defaultMessage="申请存款提交成功"
        />
      );
    }else{
      browserWindow.close();
    }
  }
}
