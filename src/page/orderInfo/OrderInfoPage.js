import React from "react";
import {hot} from "react-hot-loader/root";
import {observer} from "mobx-react";
import JxPage from "jxComponents/jxPage/JxPage";
import JxNavBar from "jxComponents/jxNavBar/JxNavBar";
import JxContent from "jxComponents/jxContent/JxContent";
import styles from "./OrderInfoPage.module.less";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import {FormattedMessage} from "react-intl";

const ItemView = observer(function ItemView({ label, value }) {
  return (
    <JxFlex addContentSpaceBetween className={styles.container3}>
      <div>{label}</div>
      <div>{value}</div>
    </JxFlex>
  );
});

@observer
class OrderInfoPage extends React.Component {
  render() {
    const { orderInfo, orderType } = this.props.navParams;
    const {
      money,
      state,
      stateText,
      orderId,
      createdTime,
      eventId,
      promotionMoney,
      remarks,
      showRemark
    } = orderInfo;
    let title;
    let domInfo;
    switch (orderType) {
      case "Deposit":
        title = (
          <FormattedMessage
            id="funds.depositDetails"
            defaultMessage="转账详情"
          />
        );
        domInfo = (
          <>
            <ItemView label={"ID"} value={orderId} />
            <ItemView
              label={
                <FormattedMessage id="funds.amount" defaultMessage="金额" />
              }
              value={money}
            />
            <ItemView
              label={
                <FormattedMessage
                  id="funds.depositTime"
                  defaultMessage="充值时间"
                />
              }
              value={createdTime}
            />
          </>
        );
        break;
        case "ThreeDeposit":
            title = (
                <FormattedMessage
                    id="funds.depositDetails"
                    defaultMessage="转账详情"
                />
            );
            domInfo = (
                <>
                    <ItemView label={"ID"} value={orderId} />
                    <ItemView
                        label={
                            <FormattedMessage id="funds.amount" defaultMessage="金额" />
                        }
                        value={money}
                    />
                    <ItemView
                        label={
                            <FormattedMessage
                                id="funds.depositTime"
                                defaultMessage="充值时间"
                            />
                        }
                        value={createdTime}
                    />
                </>
            );
            break;
      case "Withdraw":
        title = (
          <FormattedMessage
            id="funds.withdrawDetails"
            defaultMessage="取款详情"
          />
        );
        domInfo = (
          <>
            <ItemView label={"ID"} value={orderId} />
            <ItemView
              label={
                <FormattedMessage id="funds.amount" defaultMessage="金额" />
              }
              value={money}
            />
            <ItemView
              label={
                <FormattedMessage
                  id="funds.withdrawTime"
                  defaultMessage="取款时间"
                />
              }
              value={createdTime}
            />
          </>
        );
        break;
      default:
        title = (
          <FormattedMessage
            id="funds.promotionDetails"
            defaultMessage="优惠详情"
          />
        );
        domInfo = (
          <>
            <ItemView label={"ID"} value={eventId} />
            <ItemView
              label={
                <FormattedMessage id="funds.amount" defaultMessage="金额" />
              }
              value={money}
            />
            {promotionMoney ? (
              <ItemView
                label={
                  <FormattedMessage
                    id="funds.promotionAmount"
                    defaultMessage="优惠金额"
                  />
                }
                value={promotionMoney}
              />
            ) : null}
            <ItemView
              label={
                <FormattedMessage
                  id="funds.operatorTime"
                  defaultMessage="操作时间"
                />
              }
              value={createdTime}
            />
            {showRemark ? (
              <ItemView
                label={
                  <FormattedMessage id="fund.remarks" defaultMessage="备注" />
                }
                value={remarks}
              />
            ) : null}
          </>
        );
    }
    return (
      <JxPage>
        <JxNavBar>{title}</JxNavBar>
        <JxContent>
          <JxFlex addAlignCenter isColumn className={styles.container}>
              {state === "Successful" ? (
                  <>
                      <div className={styles.success} />
                      <div className={styles.money}>{money}</div>
                      <div>{state}</div>
                  </>
              ) : null}
              {state === "Process" ? (
                  <>
                      <div className={styles.process} />
                      <div className={styles.money}>{money}</div>
                      <div className={styles.processText}>{stateText}</div>
                  </>
              ) : null}
              {state === "Fail" ? (
                  <>
                      <div className={styles.fail} />
                      <div className={styles.money}>{money}</div>
                      <div className={styles.failText}>{stateText}</div>
                  </>
              ) : null}

            <div />
            <div className={styles.container2}>{domInfo}</div>
          </JxFlex>
        </JxContent>
      </JxPage>
    );
  }
}

export default hot(OrderInfoPage);
