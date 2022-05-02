import React from "react";
import PropTypes from "prop-types";
import JxNumberNoKeyBoard from "../jxNumberNoKeyBoard/JxNumberNoKeyBoard";
import { observer } from "mobx-react";
import JxFlex from "../jxFlex/JxFlex";
import { TextButton } from "../jxButton";
import styles from "./JxStepper.module.less";

@observer
class JxStepper extends React.Component {
  numInput;

  minusAction = () => {
    let inputValue = this.numInput.inputValue;
    if (inputValue > 1) {
      inputValue--;
      this.numInput.setValue(inputValue);
    }
  };

  addAction = () => {
    const { maxValue } = this.props;
    let inputValue = this.numInput.inputValue;
    if (inputValue < maxValue) {
      inputValue++;
      this.numInput.setValue(inputValue);
    }
  };

  render() {
    const {
      onChange,
      initialValue,
      keyOutBody,
      maxValue,
      placeholder,
      className,
      usePlaceholder
    } = this.props;
    const newClassName = `${styles.optionContainer} ${className}`;
    return (
      <JxFlex className={newClassName}>
        <TextButton onTap={this.minusAction} className={styles.optionBtn}>
          <div className={styles.icSubtract} />
        </TextButton>
        <JxNumberNoKeyBoard
          ref={numInput => (this.numInput = numInput)}
          type={"int"}
          usePlaceholder={usePlaceholder}
          placeholder={placeholder}
          minValue={1}
          maxValue={maxValue}
          keyOutBody={keyOutBody}
          className={styles.inputNum}
          onChange={onChange}
          initialValue={initialValue}
        />
        <TextButton onTap={this.addAction} className={styles.optionBtn}>
          <div className={styles.icAdd} />
        </TextButton>
      </JxFlex>
    );
  }
}

JxStepper.propTypes = {
  initialValue: PropTypes.number,
  placeholder: PropTypes.number,
  onChange: PropTypes.func,
  keyOutBody: PropTypes.bool, //键盘控制
  maxValue: PropTypes.number,
  className: PropTypes.string
};

export default JxStepper;
