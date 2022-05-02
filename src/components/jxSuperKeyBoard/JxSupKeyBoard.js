import React from "react";
import {computed, observable} from "mobx";
import {observer} from "mobx-react";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import JxKeyboard from "jxComponents/jxKeyboard/JxKeyboard";
import styles from "./JxSupKeyBoard.module.less";

/**
 * 系统数字键盘
 */
@observer
class JxSupKeyBoard extends React.Component {
  @observable inputValue = "";

  @observable keyboardVisible = false;

  changeRealValue = debounce(realValue => {
    const { onChange = () => {} } = this.props;
    onChange(realValue);
  }, 300);

  constructor(props) {
    super(props);
    const { value } = this.props;

    if (value) {
      this.inputValue = value;
    }
  }

  componentDidUpdate(prevProps) {
    const { value, placeholder = 0 } = this.props;
    if (value !== prevProps.value) {
      if (placeholder !== value) {
        this.inputValue = value;
      }
    }
  }

  @computed get isFloat() {
    const { type } = this.props;
    return type !== "int";
  }

  /**
   * 设置值
   * @param value
   */
  setValue(value) {
    this.inputValue = value;
    this.changeRealValue(value);
  }

  // 添加改变值后立即输出，有时候输入值后，用户立即点击确定
  _changeValue = value => {
    const {
      type = "int",
      decimal = 1,
      maxValue,
      minValue,
      placeholder = 0
    } = this.props;

    // 如果为空时候返回0或者placeholder
    if (value === "") {
      if (this.inputValue !== value) {
        this.inputValue = "";
        this.changeRealValue(Number(placeholder));
      }
      return;
    }

    let hasPoint = false;
    if (type === "int") {
      value = value.toString().replace(/[.]/g, "");
    } else {
      const diLength = value.match(/[.]/g);
      // 如果是浮点型
      if (diLength !== null && diLength.length >= 1) {
        const inputStr = value.split(".");
        const intStr = Number(inputStr[0]);
        const decimalStr = inputStr[1].replace(/[.]/g, "").substr(0, decimal);
        value = `${intStr}.${decimalStr}`;
        hasPoint = true;
      }
    }

    let realValue = Number(value);
    if (minValue !== undefined && minValue > realValue) {
      realValue = Math.max(minValue, realValue);
      hasPoint = false;
    }

    if (maxValue !== undefined && maxValue <= realValue) {
      realValue = maxValue;
      hasPoint = false;
    }

    if (this.inputValue !== value) {
      this.inputValue = hasPoint ? value : realValue;
      if (type === "int") {
        this.inputValue = realValue;
      }
      this.changeRealValue(realValue);
    }
  };

  inputOnTap = () => {
    const { onFocus = () => {}, editable } = this.props;
    if (editable) {
      onFocus();
      this.keyboardVisible = true;
    }
  };

  onNumKeyTap = value => {
    let inputValue = this.inputValue;
    if (this.inputValue === null || this.inputValue === undefined) {
      inputValue = "";
    }
    inputValue = `${inputValue}${value}`;
    this._changeValue(inputValue);
  };

  onOkTap = () => {
    this.keyboardVisible = false;
  };

  onDeleteTap = () => {
    let inputValue = this.inputValue.toString();
    inputValue = inputValue.substr(0, inputValue.length - 1);
    this._changeValue(inputValue);
  };

  onClose = () => {
    this.keyboardVisible = false;
  };

  render() {
    const {
      className,
      placeholder,
      children,
      maskClosable = true
    } = this.props;
    return (
      <>
        <div className={className} onClick={this.inputOnTap}>
          {this.inputValue === "" ? (
            <div className={styles.placeholder}>{placeholder}</div>
          ) : (
            this.inputValue
          )}
        </div>
        <JxKeyboard
          useFloatPoint={this.isFloat}
          visible={this.keyboardVisible}
          onNumKeyTap={this.onNumKeyTap}
          onDeleteTap={this.onDeleteTap}
          maskClosable={maskClosable}
          onOkTap={this.onOkTap}
          useOk
          onClose={this.onClose}
        >
          <>
            {children}
            <div className={styles.input}>
              {this.inputValue === "" ? (
                <div className={styles.placeholder}>{placeholder}</div>
              ) : (
                this.inputValue
              )}
            </div>
          </>
        </JxKeyboard>
      </>
    );
  }
}

JxSupKeyBoard.defaultProps = {
  type: "int",
  usePlaceholder: true,
  editable: true,
  checkFieldProps: {},
  onChange: () => {}
};

JxSupKeyBoard.propTypes = {
  value: PropTypes.number,
  className: PropTypes.string,
  placeholder: PropTypes.any,
  editable: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  type: PropTypes.oneOf(["int", "float"]), // 控制键盘输入类型
  decimal: PropTypes.number, // 控制输入框后面小数点位数
  maxValue: PropTypes.number,
  minValue: PropTypes.number
};

export default JxSupKeyBoard;
