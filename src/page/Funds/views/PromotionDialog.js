import React from "react";
import {computed} from "mobx";
import {inject, observer} from "mobx-react";
import {Modal} from "antd-mobile";
import styles from "./PromotionDialog.module.less";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import {createForm} from "rc-form";
import {forOwn} from "lodash";
import {showToast} from "jxUtils/common";
import JxSelect from "jxComponents/jxSelect/JxSelect";
import TextDelayButton from "jxComponents/jxButton/TextDelayButton";
import {FormattedMessage} from "react-intl";

const PromotionItem = observer(function PromotionItem({ data, onTap }) {
  const { promotionIntroduction, title, isSelect } = data;
  const containerClass = isSelect
    ? `${styles.itemContainer} ${styles.itemContainerActive}`
    : styles.itemContainer;
  const selectClass = isSelect ? styles.bankSelect : styles.bankNoSelect;
  return (
    <TextDelayButton className={containerClass} onClick={onTap}>
      <div className={styles.title}>{title}</div>
      <JxFlex>
        <div className={styles.promotionIntroduction}>
          {promotionIntroduction}
        </div>
        <div className={selectClass} />
      </JxFlex>
    </TextDelayButton>
  );
});

@inject("transferStore")
@observer
class PromotionDialog extends React.Component {
  @computed
  get showPromotionDialog() {
    return this.props.transferStore.showPromotionDialog;
  }

  @computed
  get promotionDialogList() {
    return this.props.transferStore.promotionDialogList;
  }

  @computed
  get showPromotionInfo() {
    return this.promotionDialogList.length > 0;
  }

  onChange = value => {
    this.props.form.setFieldsValue({
      promotionId: value.promotionId
    });
  };

  goTransfer = () => {
    this.props.form.validateFields((error, formData) => {
      if (error === null) {
        this.props.transferStore.promotionAction(formData).then();
      } else {
        forOwn(error, function(value) {
          showToast(value.errors[0].message);
          return false;
        });
        return;
      }
    });
    this.props.transferStore.showPromotionDialog = false;
  };

  maskClose = () => {
    this.props.transferStore.showPromotionDialog = false;
  };

  onClose = () => {
    this.props.transferStore.promotionAction({}).then();
    this.props.transferStore.showPromotionDialog = false;
  };

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <Modal
        visible={this.showPromotionDialog}
        wrapClassName={styles.tipDialog}
        maskClosable={true}
        transparent
        onClose={this.maskClose}
        transitionName="am-zoom"
        title={
          <div className={styles.dialogTitle}>
            <FormattedMessage
              id="promotion.promotionDialogTitle"
              defaultMessage={"特别提示"}
            />
            <TextDelayButton
              className={styles.closeIcon}
              onClick={this.maskClose}
            >
              X
            </TextDelayButton>
          </div>
        }
        maskTransitionName="am-fade"
      >
        <JxFlex isColumn addAlignCenter>
          {this.showPromotionInfo ? (
            <JxSelect
                className={styles.contentContainer}
              listData={this.promotionDialogList}
              OptionComponent={PromotionItem}
              {...getFieldProps("promotionId", {
                initialValue: this.promotionDialogList[0].promotionId
              })}
              onChange={this.onChange}
            />
          ) : null}
        </JxFlex>
        <JxFlex addContentSpaceBetween>
          <TextDelayButton onClick={this.onClose} className={styles.button1}>
            NO
          </TextDelayButton>
          <TextDelayButton onClick={this.goTransfer} className={styles.button2}>
            To partake >
          </TextDelayButton>
        </JxFlex>
      </Modal>
    );
  }
}

export default createForm()(PromotionDialog);
