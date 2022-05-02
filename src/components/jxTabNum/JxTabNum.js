import React from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import styles from "./JxTabNum.module.less";

@observer
class JxTabNum extends React.Component {
  @action
  onChangeDate = selectInfo => {
    const { PublicClickFn } = this.props;
    PublicClickFn(selectInfo);
  };

  render() {
    const { dataList, startIndex, num = 6, autoWidth = false } = this.props;
    let style = {};
    let className = "";
    if (autoWidth) {
      className = `${styles.dateContainer} ${styles.autoWith}`;
    } else {
      const propsWidth = `${100 / num}%`;
      style = { width: propsWidth };
      className = `${styles.dateContainer} `;
    }

    return (
      <JxFlex className={styles.inputContainer}>
        {dataList.map((item, index) => {
          const { noIndex, text } = item;
          return (
            <div
              className={className}
              style={style}
              onClick={() => {
                this.onChangeDate(item);
              }}
              key={index}
            >
              <span
                className={
                  noIndex === startIndex
                    ? styles.dateTextActive
                    : styles.dateText
                }
              >
                {text}
              </span>
            </div>
          );
        })}
      </JxFlex>
    );
  }
}

export default JxTabNum;
