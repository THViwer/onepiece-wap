import React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { InputItem } from "antd-mobile";
import PropTypes from "prop-types";
import { jxTimeout } from "../../utils/common";

/**
 * 有键盘的数字输入
 * XXX JxNumberInput和rc-form兼容问题
 * XXX JxNumberInput后续弹出来的会出现兼容问题
 */
@observer
class JxNumberInput extends React.Component {
  @observable inputValue = "";

  inputDom;

  /**
   * 设置值
   * @param value
   */
  setValue(value) {
    const { onChange } = this.props;
    this.inputValue = value.toString();
    onChange(value);
  }

  //添加改变值后立即输出，有时候输入值后，用户立即点击确定
  _changeValue = value => {
    const {
      type,
      decimal,
      maxValue,
      onChange,
      usePlaceholder,
      placeholder
    } = this.props;
    value = value.toString();
    if (value === "") {
      if (this.inputValue !== value) {
        this.inputValue = "";
        if (usePlaceholder) {
          if (onChange) {
            onChange(Number(placeholder));
          }
        } else {
          if (onChange) {
            onChange(0);
          }
        }
      }
      return;
    }
    const diLength = value.match(/[.]/g);
    if (type === "int") {
      const firstStr = value[0];
      if (firstStr === "." || firstStr === "0") {
        return;
      }
    }

    if (maxValue && Number(value) > maxValue) {
      return;
    }

    if (diLength === null) {
      this.inputValue = value;
      if (onChange) {
        onChange(Number(this.inputValue));
      }
      return;
    }

    //如果是浮点型
    if (diLength.length === 1 && type === "float") {
      const decimalNum = value.split(".")[1].length;
      if (decimalNum === 0) {
        if (this.inputValue === value) {
          this.inputValue = value.toString();
        } else {
          this.inputValue = value;
        }
        return;
      }

      if (decimal) {
        if (decimalNum > 0 && decimalNum <= decimal) {
          this.inputValue = value.toString();
          onChange(Number(this.inputValue));
        }
      } else {
        if (decimalNum > 0) {
          this.inputValue = value.toString();
        }
      }
    }
  };

  constructor(props) {
    super(props);
    const { initialValue, initialTriggerEvent, onChange } = this.props;
    if (initialValue) {
      if (initialTriggerEvent && onChange) {
        onChange(initialValue);
      } else {
        this.inputValue = initialValue.toString();
      }
    }
  }

  componentDidUpdate(nextProps) {
    const { initialValue, usePlaceholder, placeholder } = nextProps;
    if (initialValue && initialValue !== this.inputValue) {
      if (
        placeholder &&
        usePlaceholder &&
        Number(placeholder) === Number(initialValue)
      ) {
        return;
      }
      this.inputValue = initialValue.toString();
    }
  }

  _onBlur = value => {
    const {
      onChange,
      placeholder,
      usePlaceholder,
      keyOutBody,
      onBlur,
      minValue
    } = this.props;
    if (value !== "") {
      value = Number(value);
      if (onChange) {
        if (minValue) {
          this.inputValue = (minValue > value ? minValue : value).toString();
        }
        onChange(Number(this.inputValue));
      }
    } else {
      if (usePlaceholder) {
        if (onChange) {
          onChange(Number(placeholder));
        }
      } else {
        if (onChange) {
          onChange(0);
        }
      }
    }
    if (keyOutBody) {
      let rootDom = document.getElementsByTagName("body")[0];
      rootDom.style.height = "100%";
    }
    if (onBlur) {
      onBlur();
    }
  };

  _onFocus = () => {
    const { keyOutBody, onFocus, keyScrollTop } = this.props;
    if (keyOutBody) {
      //解决兼容问题,两个键盘弹出，延迟操作
      jxTimeout(() => {
        let rootDom = document.getElementsByTagName("body")[0];
        rootDom.style.height = window.innerHeight - 200 + "px";
        const queryDomList = document.querySelectorAll(
          "div[page=scrollContent]"
        );
        let scrollDom = queryDomList[queryDomList.length - 1];
        scrollDom.scrollTop = keyScrollTop || scrollDom.scrollHeight;
      }, 1);
    }
    if (onFocus) {
      onFocus();
    }
  };

  render() {
    const {
      className,
      placeholder,
      maxLength,
      focus,
      checkFieldProps,
      labelNumber,
      extra,
      children
    } = this.props;

    return (
      <InputItem
        value={this.inputValue}
        extra={extra}
        labelNumber={labelNumber}
        className={className}
        placeholder={placeholder}
        maxLength={maxLength}
        focus={focus}
        onFocus={this._onFocus}
        onBlur={this._onBlur}
        moneyKeyboardAlign={"left"}
        type="money"
        onChange={this._changeValue}
        ref={dom => (this.inputDom = dom)}
        {...checkFieldProps}
      >
        {children}
      </InputItem>
    );
  }
}

JxNumberInput.defaultProps = {
  keyOutBody: false,
  usePlaceholder: true,
  initialTriggerEvent: false,
  extra: "",
  labelNumber: 5,
  checkFieldProps: {}
};

JxNumberInput.propTypes = {
  initialValue: PropTypes.number,
  initialTriggerEvent: PropTypes.bool, //初始化值触发onChange
  extra: PropTypes.any, //输入右侧部分
  labelNumber: PropTypes.number,
  className: PropTypes.string,
  placeholder: PropTypes.any,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  type: PropTypes.oneOf(["int", "float"]), //控制键盘输入类型
  decimal: PropTypes.number,
  keyOutBody: PropTypes.bool, //键盘控制
  keyScrollTop: PropTypes.number,
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  usePlaceholder: PropTypes.bool, //使用usePlaceholder的值计算
  checkFieldProps: PropTypes.any //form表单验证
};

export default JxNumberInput;
