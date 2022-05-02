import React from "react";
import PropTypes from "prop-types";
import {observer} from "mobx-react";
import {Modal} from "antd-mobile";
import TouchFeedback from "rmc-feedback";
import {TextButton} from "../jxButton";
import styles from "./JxKeyboard.module.less";
import {FormattedMessage} from "react-intl";

const NumKey = ({ num, onTap }) => {
  return (
    <TouchFeedback activeClassName="am-number-keyboard-item-active">
      <td className="am-number-keyboard-item">
        <TextButton onTap={() => onTap(num)}>{num}</TextButton>
      </td>
    </TouchFeedback>
  );
};

@observer
export default class JxKeyboard extends React.Component {
  keyboardDom;

  keyboardDomHeight = 0;

  componentDidUpdate() {
    if (
      this.keyboardDom &&
      this.keyboardDom.clientHeight !== this.keyboardDomHeight
    ) {
      this.keyboardDom.parentNode.parentNode.parentNode.style = `height:${this.keyboardDom.clientHeight}px`;
    }
  }

  _onNumKeyTap = key => {
    const { onNumKeyTap } = this.props;
    if (onNumKeyTap) {
      onNumKeyTap(key);
    }
  };

  _onDeleteTap = () => {
    const { onDeleteTap } = this.props;
    if (onDeleteTap) {
      onDeleteTap();
    }
  };

  _onOkTap = () => {
    const { onOkTap, useOk } = this.props;
    if (useOk && onOkTap) {
      onOkTap();
    }
  };

  render() {
    const {
      children,
      visible,
      useOk,
      onClose,
      useFloatPoint,
      maskClosable = true
    } = this.props;
    return (
      <Modal
        popup
        visible={visible}
        maskClosable={maskClosable}
        onClose={onClose}
        wrapClassName={styles.keyboard}
        transparent
        animationType="slide-up"
      >
        <div
          className="am-number-keyboard-wrapper"
          ref={comp => (this.keyboardDom = comp)}
        >
          {children}
          <table>
            <tbody>
              <tr>
                <NumKey key={1} num={1} onTap={this._onNumKeyTap} />
                <NumKey key={2} num={2} onTap={this._onNumKeyTap} />
                <NumKey key={3} num={3} onTap={this._onNumKeyTap} />
                <TouchFeedback activeClassName="am-number-keyboard-item-active">
                  <td className="am-number-keyboard-item" rowSpan="2">
                    <TextButton
                      className="am-number-keyboard-item keyboard-delete"
                      onTap={this._onDeleteTap}
                    />
                  </td>
                </TouchFeedback>
              </tr>
              <tr>
                <NumKey key={4} num={4} onTap={this._onNumKeyTap} />
                <NumKey key={5} num={5} onTap={this._onNumKeyTap} />
                <NumKey key={6} num={6} onTap={this._onNumKeyTap} />
              </tr>
              <tr>
                <NumKey key={7} num={7} onTap={this._onNumKeyTap} />
                <NumKey key={8} num={8} onTap={this._onNumKeyTap} />
                <NumKey key={9} num={9} onTap={this._onNumKeyTap} />
                <td
                  className={
                    useOk
                      ? "am-number-keyboard-item keyboard-confirm"
                      : "am-number-keyboard-item keyboard-confirm am-number-keyboard-item-disabled"
                  }
                  rowSpan="2"
                >
                  <TextButton className={styles.submit} onTap={this._onOkTap}>
                    <FormattedMessage
                      id={"common.ok"}
                      defaultMessage={"确定"}
                    />
                  </TextButton>
                </td>
              </tr>
              <tr>
                {useFloatPoint ? (
                  <NumKey key="." num="." onTap={this._onNumKeyTap} />
                ) : (
                  <td className="am-number-keyboard-item" />
                )}
                <NumKey key={0} num={0} onTap={this._onNumKeyTap} />
                <td className="am-number-keyboard-item" />
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
    );
  }
}

JxKeyboard.defaultProps = {
  useOk: false,
  useFloatPoint: false
};

JxKeyboard.propTypes = {
  visible: PropTypes.any,
  onNumKeyTap: PropTypes.func,
  onDeleteTap: PropTypes.func,
  onOkTap: PropTypes.func,
  useOk: PropTypes.bool
};
