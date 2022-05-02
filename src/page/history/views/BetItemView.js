import React from "react";
import {observer} from "mobx-react";
import JxFlex from "../../../components/jxFlex/JxFlex";
import TextDelayButton from "jxComponents/jxButton/TextDelayButton";
import styles from "./BetItemView.module.less";

const BetItemView = observer(function BetItemView({ data, onTap }) {
  const { money, createdTime, state, eventText, moneyAdd, stateText } = data;
  let moneyStr = moneyAdd ? "+" : "";
  let moneyClass = moneyAdd ? `${styles.money} ${styles.add}` : styles.money;
  return (
    <div className={styles.container}>
      <TextDelayButton className={styles.itemContainer} onClick={onTap}>
        <div className={styles.item1}>
          <div className={styles.event}>{eventText}</div>
          <div className={styles.createdTime}>{createdTime}</div>
        </div>
        <JxFlex className={styles.item2} addAlignCenter>
          <div>MYR</div>
          <div className={moneyClass}>
            {moneyStr}
            {money}
          </div>
        </JxFlex>
        <JxFlex addAlignCenter isColumn className={styles.item3}>
          {state === "Successful" ? (
            <>
              <div className={styles.success} />
              <div>{stateText}</div>
            </>
          ) : null}
          {state === "Process" ? (
            <>
              <div className={styles.process} />
              <div className={styles.processText}>{stateText}</div>
            </>
          ) : null}
          {state === "Fail" ? (
            <>
              <div className={styles.fail} />
              <div className={styles.failText}>{stateText}</div>
            </>
          ) : null}
        </JxFlex>
      </TextDelayButton>
    </div>
  );
});

export default BetItemView;
