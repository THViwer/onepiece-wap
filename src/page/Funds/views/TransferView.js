import React from "react";
import {computed} from "mobx";
import {inject, observer} from "mobx-react";
import {List, Modal, Picker} from "antd-mobile";
import styles from "./TransferView.module.less";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import TextDelayButton from "jxComponents/jxButton/TextDelayButton";
import JxSupKeyBoard from "jxComponents/jxSuperKeyBoard/JxSupKeyBoard";
import {createForm} from "rc-form";
import {forOwn} from "lodash";
import {showToast} from "jxUtils/common";
import {defineMessages, FormattedMessage, injectIntl} from "react-intl";

const messages = defineMessages({
  amountMax: {
    id: 'funds.amountMax',
    defaultMessage: '最大转账金额{balance}',
  },
});


@inject("homeStore", "userStore", "transferStore")
@observer
class TransferView extends React.Component {
  @computed
  get showTransferDialog() {
    return this.props.transferStore.showTransferDialog;
  }

  @computed
  get formCategory() {
    return this.props.transferStore.formCategory;
  }

  @computed
  get fromPlatform() {
    return this.props.transferStore.fromPlatform;
  }

  @computed
  get allPlatformList() {
    return this.props.transferStore.allPlatformList;
  }

  @computed
  get showAllPlatformList() {
    return this.allPlatformList.length > 0 && this.allPlatformList[0].length > 0;
  }

  goTransfer = () => {
    this.props.form.validateFields((error, formData) => {
      if (error === null) {
        const { to } = formData;
        formData.to = to[0];
        formData.from = this.fromPlatform.platform;
        this.props.transferStore.transferAction(formData).then();
      } else {
        forOwn(error, function(value) {
          showToast(value.errors[0].message);
          return false;
        });
        return;
      }
    });
    this.onClose();
  };

  onClose = () => {
    this.props.transferStore.showTransferDialog = false;
  };

  render() {
    const { getFieldProps } = this.props.form;
    return (
        <Modal
            visible={this.showTransferDialog}
            wrapClassName={styles.tipDialog}
            maskClosable={true}
            transparent
            onClose={this.onClose}
            transitionName="am-zoom"
            maskTransitionName="am-fade"
        >
          <JxFlex className={styles.container} isColumn addAlignCenter>
            <div className={styles.title}>
              <FormattedMessage id='funds.platformToPlatform' defaultMessage='平台转平台' />
            </div>
            <div className={styles.container1}>
              <div className={styles.category}>{this.formCategory} Balance</div>
              <JxFlex addContentSpaceBetween className={styles.platformContainer}>
                <div>{this.fromPlatform.pname}</div>
                <div>{this.fromPlatform.balance}</div>
              </JxFlex>
            </div>
            <div className={styles.title1}><FormattedMessage id='funds.transferInAmount' defaultMessage='转入金额' /></div>
            <div className={styles.icoDown} />
            <JxFlex addAlignCenter className={styles.container2}>
              <FormattedMessage id='funds.amount' defaultMessage='金额' />
              <JxSupKeyBoard
                  className={styles.input}
                  {...getFieldProps("amount", {
                    rules: [
                      {
                        required: true,
                        message: <FormattedMessage id='funds.entryAmount' defaultMessage='请输入金额' />
                      },
                      {
                        validator: (rule, value) =>
                            value <= this.fromPlatform.balance,
                        message: this.props.intl.formatMessage(messages.amountMax, {balance: this.fromPlatform.balance})
                      },
                      {
                        validator: (rule, value) => 0 < value,
                        message: <FormattedMessage id='funds.amountThanZero' defaultMessage='转账金额大于0' />
                      }
                    ]
                  })}
              />
              <TextDelayButton className={styles.all}><FormattedMessage id='common.all' defaultMessage='全部' /></TextDelayButton>
            </JxFlex>
            <div className={`${styles.container1} ${styles.container1Active}`}>
              <div className={styles.category}><FormattedMessage id='funds.balance' defaultMessage='余额' /></div>
              {this.showAllPlatformList ? (
                  <Picker
                      data={this.allPlatformList}
                      cascade={false}
                      {...getFieldProps("to", {
                        initialValue: [this.allPlatformList[0][0].value]
                      })}
                  >
                    <List.Item className={styles.pick} arrow="down" />
                  </Picker>
              ) : null}
            </div>
            <TextDelayButton className={styles.button2} onClick={this.goTransfer}>
              <FormattedMessage id='funds.configTransfer' defaultMessage='确认转账' />
            </TextDelayButton>
          </JxFlex>
        </Modal>
    );
  }
}

export default createForm()(injectIntl(TransferView));
