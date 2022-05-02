import {action, observable} from "mobx";
import {depositListApi, walletListApi, withdrawListApi} from "../services/User.service";
import {dateSubtractDayToString, getDateFormatToString} from "jxUtils/timeUtil";
import appController from "./AppController";
import {FormattedMessage} from "react-intl";
import React from "react";

export default class HistoryStore {
  @observable
  historyDate = [
    {
      text: "date1",
      value: 0,
      isSelect: true
    },
    {
      text: "date2",
      value: 3,
      isSelect: false
    },
    {
      text: "date3",
      value: 7,
      isSelect: false
    },
    {
      text: "date4",
      value: 30,
      isSelect: false
    }
  ];

  //页面加载条数
  currentPage = 0;

  //页面还可以继续加载数据
  @observable
  pageHasLoadData = true;

  @observable
  recordList = [];

  searchType = "Deposit";

  searchStartDate;

  searchEndDate;

  constructor() {
    this.searchStartDate = getDateFormatToString(new Date(), "YYYY-MM-DD");
    this.searchEndDate = getDateFormatToString(new Date(), "YYYY-MM-DD");
    this.loadingPageData();
  }

  /**
   * 下拉刷新
   */
  onRefresh(checkPageHasLoadData = true) {
    this.currentPage = 0;
    if (checkPageHasLoadData) {
      this.loadingPageData(checkPageHasLoadData);
    } else {
      setTimeout(() => {
        this.loadingPageData(checkPageHasLoadData);
      }, 2000);
    }
  }

  /**
   * 上垃加载
   */
  onEndReached() {
    this.loadingPageData();
  }

  @action
  async loadingPageData(checkPageHasLoadData = true) {
    const requestData = {
      current: this.currentPage * 20,
      size: 20
    };
    let responseData = [];
    switch (this.searchType) {
      case "Deposit":
        responseData = await depositListApi(
          {
            endDate: this.searchEndDate,
            startDate: this.searchStartDate
          },
          {
            loading: this.currentPage === 0
          }
        );
        break;
      case "Withdraw":
        responseData = await withdrawListApi(
          {
            ...requestData,
            endDate: this.searchEndDate,
            startDate: this.searchStartDate
          },
          {
            loading: this.currentPage === 0
          }
        );
        break;
      case "Promotion":
        requestData.onlyPromotion = true;
        responseData = await walletListApi(
          {
            ...requestData,
            endDate: this.searchEndDate,
            startDate: this.searchStartDate
          },
          {
            loading: this.currentPage === 0
          }
        );
        break;
      case "Details":
        responseData = await walletListApi(
          {
            ...requestData,
            endDate: this.searchEndDate,
            startDate: this.searchStartDate
          },
          {
            loading: this.currentPage === 0
          }
        );
        break;
      default:
    }

    if (responseData) {
      let listData;
      if (this.searchType === "Details" || this.searchType === "Promotion") {
        listData = responseData.map(item => {
          const { event, createdTime } = item;
          item.state = "Successful";
          item.moneyAdd =
            ["DEPOSIT", "TRANSFER_IN"].includes(event) ||
            this.searchType === "Promotion";
          item.showRemark = ["TRANSFER_OUT", "TRANSFER_IN"].includes(event);
          item.createdTime = getDateFormatToString(
            createdTime,
            "YYYY-MM-DD HH:mm"
          );
          return item;
        });
      } else if (this.searchType === "Deposit") {
        listData = responseData.map(item => {
          item.state = item.state === "Close" ? "Fail" : item.state;
          item.event = item.payType;
          item.moneyAdd = true;
          item.money = item.amount;
          item.createdTime = getDateFormatToString(
            item.createdTime,
            "YYYY-MM-DD HH:mm"
          );
          return item;
        });
      } else {
        listData = responseData["data"].map(item => {
          item.event = this.searchType;
          item.moneyAdd = this.searchType === "Deposit";
          item.createdTime = getDateFormatToString(
            item.createdTime,
            "YYYY-MM-DD HH:mm"
          );
          return item;
        });
      }

      listData.map(item => {
        let eventText;

        const { event, state } = item;
        switch (event) {
          case "TRANSFER_OUT":
            eventText = (
              <FormattedMessage
                id="history.transferOut"
                defaultMessage={"转出"}
              />
            );
            break;
          case "DEPOSIT":
            eventText = (
              <FormattedMessage id="history.deposit" defaultMessage={"充值"} />
            );
            break;
          case "WITHDRAW":
            eventText = (
              <FormattedMessage id="history.withdraw" defaultMessage={"提款"} />
            );
            break;
          case "TRANSFER_IN":
            eventText = (
              <FormattedMessage
                id="history.transferIn"
                defaultMessage={"转入"}
              />
            );
            break;
          case "FREEZE":
            eventText = (
              <FormattedMessage id="history.freeze" defaultMessage={"冻结"} />
            );
            break;
          default:
            eventText = event;
        }
        if (this.searchType === "Promotion") {
          eventText = (
            <FormattedMessage
              id="history.promotionMoney"
              defaultMessage={"优惠"}
            />
          );
        }
        item.eventText = eventText;
        if (state === "Successful") {
          item.stateText = (
            <FormattedMessage id="history.success" defaultMessage={"成功"} />
          );
        } else if (state === "Process") {
          item.stateText = (
            <FormattedMessage id="history.process" defaultMessage={"处理中"} />
          );
        } else {
          item.stateText = (
            <FormattedMessage id="history.fail" defaultMessage={"失败"} />
          );
        }
        return item;
      });
      //识别上下拉
      if (this.currentPage === 0) {
        this.recordList = listData;
      } else {
        this.recordList = this.recordList.concat(listData);
      }
      if (checkPageHasLoadData) {
        this.pageHasLoadData = listData.length === 20;
      }

      if (this.pageHasLoadData) {
        this.currentPage++;
      }
    }
  }

  @action
  changeType(selectInfo) {
    this.searchType = selectInfo.text;
    this.recordList = [];
    this.onRefresh();
  }

  @action
  changeDate(dayDistance) {
    this.searchStartDate = getDateFormatToString(new Date(), "YYYY-MM-DD");
    this.searchEndDate = dateSubtractDayToString(
      new Date(),
      dayDistance,
      "YYYY-MM-DD"
    );
    this.onRefresh();
  }

  /**
   * 去投注详情页面
   * @param orderInfo
   */
  @action
  goDetail(orderInfo) {
    appController.navPushPage("OrderInfoPage", {
      orderInfo: orderInfo,
      orderType: this.searchType
    });
  }
}
