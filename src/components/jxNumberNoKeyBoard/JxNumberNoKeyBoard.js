import React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { InputItem } from "antd-mobile";

@observer
class JxNumberNoKeyBoard extends React.Component {
  @observable inputValue = "";

  inputDom;

  inputType = "text";

  /**
   * 设置值
   * @param value
   */
  setValue(value) {
    const { onChange } = this.props;
    this.inputValue = value;
    onChange(value);
  }

  //添加改变值后立即输出，有时候输入值后，用户立即点击确定
  _changeValue = value => {
    const {
      type,
      decimal,
      maxValue,
      minValue,
      onChange,
      usePlaceholder,
      placeholder
    } = this.props;
    if (this.inputType === "text") {
      value = value.toString().replace(/[^0-9.]/g, "");
    }

    if (value === "") {
      if (this.inputValue !== value) {
        this.inputValue = "";
        if (usePlaceholder) {
          if (onChange) {
            onChange(Number(placeholder | 0));
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

    if (onChange) {
      if (minValue) {
        this.inputValue = (minValue > value ? minValue : value).toString();
      }
      onChange(Number(this.inputValue));
    }

    if (maxValue && Number(value) > maxValue) {
      return;
    }

    if (diLength === null) {
      this.inputValue = value;
      onChange(Number(this.inputValue));
      return;
    }

    //如果是浮点型
    if (diLength.length === 1 && type === "float") {
      const decimalNum = value.split(".")[1].length;
      if (decimalNum === 0) {
        if (this.inputValue === value) {
          this.inputValue = Number(value);
        } else {
          this.inputValue = value;
        }
        return;
      }

      if (decimal) {
        if (decimalNum > 0 && decimalNum <= decimal) {
          this.inputValue = value;
          onChange(Number(this.inputValue));
        }
      } else {
        if (decimalNum > 0) {
          this.inputValue = value;
        }
      }
    }
  };

  constructor(props) {
    super(props);
    const { initialValue, type } = this.props;

    this.inputType = type === "float" ? "text" : "number";
    if (initialValue) {
      this.inputValue = initialValue;
    }
  }

  componentDidUpdate() {
    const { initialValue, placeholder, usePlaceholder } = this.props;
    if (initialValue && initialValue !== this.inputValue) {
      if (
        placeholder &&
        usePlaceholder &&
        Number(placeholder) === Number(initialValue)
      ) {
        return;
      }
      this.inputValue = initialValue;
    }
  }

  render() {
    const {
      className,
      placeholder,
      maxLength,
      checkFieldProps,
      labelNumber,
      extra,
      children,
      onFocus,
      onBlur,
      editable
    } = this.props;
    return (
      <InputItem
        value={this.inputValue}
        extra={extra}
        labelNumber={labelNumber}
        className={className}
        placeholder={placeholder}
        maxLength={maxLength}
        onFocus={onFocus}
        onBlur={onBlur}
        editable={editable}
        type={this.inputType}
        onChange={this._changeValue}
        ref={dom => (this.inputDom = dom)}
        {...checkFieldProps}
      >
        {children}
      </InputItem>
    );
  }
}

JxNumberNoKeyBoard.defaultProps = {
  usePlaceholder: true,
  extra: "",
  labelNumber: 5,
  editable: true,
  checkFieldProps: {}
};

JxNumberNoKeyBoard.propTypes = {
  initialValue: PropTypes.number,
  extra: PropTypes.any, //输入右侧部分
  labelNumber: PropTypes.number,
  className: PropTypes.string,
  placeholder: PropTypes.any,
  editable: PropTypes.bool,
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  type: PropTypes.oneOf(["int", "float"]), //控制键盘输入类型
  decimal: PropTypes.number, // 控制输入框后面小数点位数
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  usePlaceholder: PropTypes.bool, //使用usePlaceholder的值计算
  checkFieldProps: PropTypes.any //form表单验证
};

export default JxNumberNoKeyBoard;
