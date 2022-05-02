import React from "react";
import {inject, observer} from "mobx-react";
import {AppButton} from "jxComponents/jxButton";
import {createForm} from "rc-form";
import styles from "./Transter.module.less";
import JxSupKeyBoard from "jxComponents/jxSuperKeyBoard/JxSupKeyBoard";
import {forOwn} from "lodash";
import {showToast} from "jxUtils/common";
import JxSelect from "jxComponents/jxSelect/JxSelect";
import TextDelayButton from "jxComponents/jxButton/TextDelayButton";
import {expr} from "mobx-utils";
import {computed, observable} from "mobx";
import * as NP from "number-precision";
import {FormattedMessage} from "react-intl";

const MoneyItem = observer(function MoneyItem({ data, onTap }) {
  const { value, isSelect } = data;
  let className = expr(() =>
    isSelect
      ? `${styles.moneyItem} ${styles.moneyItemActive}`
      : `${styles.moneyItem}`
  );
  return (
    <TextDelayButton className={className} onClick={onTap}>
      {value}
    </TextDelayButton>
  );
});

@inject("promotionInfoStore")
@observer
class DepositsForm extends React.Component {
  @computed get moneyList() {
    return this.props.promotionInfoStore.moneyList;
  }

  @computed get platformBalance() {
    return this.props.promotionInfoStore.platformBalance;
  }

  @computed get supportTransfer() {
    return !this.props.promotionInfoStore.supportTransfer;
  }

  @computed get rules() {
    return this.props.promotionInfoStore.promotionInfo.rule;
  }

  @observable
  promotionAmount = 0;

  onDisable = () => {
    showToast(this.props.promotionInfoStore.tips);
  };

  submitAction = () => {
    this.props.form.validateFields((error, formData) => {
      if (error === null) {
        this.props.promotionInfoStore.transferInfo(formData).then();
      } else {
        forOwn(error, function(value) {
          showToast(value.errors[0].message);
          return false;
        });
      }
    });
  };

  selectMoney = moneyInfo => {
    this.props.form.setFieldsValue({
      amount: moneyInfo.value
    });
  };

  changeMoney = value => {
    const {
      maxPromotionAmount,
      promotionProportion
    } = this.props.promotionInfoStore.promotionInfo.rule;
    let promotionAmount = NP.strip(
      (this.platformBalance + value) * promotionProportion
    );
    this.promotionAmount = Math.min(maxPromotionAmount, promotionAmount);
    this.props.form.setFieldsValue({
      amount: value
    });
    this.props.promotionInfoStore.moneyList.map(item => {
      item.isSelect = item.value === value;
      return item;
    });
  };

  playAction = () => {
    this.props.promotionInfoStore.startGame();
  };

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className={styles.formContainer}>
        <div className={styles.title}>
          Amount
          <span>*</span>
        </div>
        <JxSupKeyBoard
          type={"float"}
          maxValue={this.rules.maxAmount}
          {...getFieldProps("amount", {
            rules: [
              {
                required: true,
                message: "Please write Amount"
              },
              {
                validator: (rule, value) => this.rules.minAmount <= value,
                message: `最小金额${this.rules.minAmount}`
              },
              {
                validator: (rule, value) => value <= this.rules.maxAmount,
                message: `最大转账金额${this.rules.maxAmount}`
              },
              {
                validator: (rule, value) => 0 < value,
                message: `请输入大于0金额`
              }
            ]
          })}
          onChange={this.changeMoney}
          className={`${styles.input} ${styles.numInput}`}
        >
          <JxSelect
            className={styles.select}
            listData={this.moneyList}
            OptionComponent={MoneyItem}
            onChange={this.selectMoney}
          />
        </JxSupKeyBoard>
        <div className={styles.promotionAmount}>
          <FormattedMessage
            id="funds.promotionAmount"
            defaultMessage="优惠金额"
          />
          ：{this.promotionAmount}
        </div>
        <AppButton
          theme="color1"
          disabled={this.supportTransfer}
          onDisable={this.onDisable}
          onClick={this.submitAction}
          className={styles.systemButton}
        >
          <FormattedMessage id={"user.involvedNow"} defaultMessage={"Get involved now"} />
        </AppButton>
        <AppButton
          theme="color1"
          onClick={this.playAction}
          className={styles.submitAction2}
        >
          <FormattedMessage id={"user.playNow"} defaultMessage={"PLAY NOW"} />
        </AppButton>
      </div>
    );
  }
}

export default createForm()(DepositsForm);
