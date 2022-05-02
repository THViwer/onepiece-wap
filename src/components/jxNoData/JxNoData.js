import React from "react";
import PropTypes from "prop-types";
import {observer} from "mobx-react";
import AppButton from "../jxButton/AppButton";
import JxFlex from "../jxFlex/JxFlex";
import styles from "./JxNoData.module.less";

const JxNoData = observer(({ title, errorText, buttonText, errorEvent }) => {
  let buttonDom;
  if (buttonText) {
    buttonDom = (
      <div className={styles.buttonContainer}>
        <AppButton onClick={errorEvent}>{buttonText}</AppButton>
      </div>
    );
  }
  return (
    <JxFlex className={styles.container}>
      <div className={styles.imgError} />
      <div className={styles.errorText1}>{title}</div>
      <div className={styles.errorText2}>{errorText}</div>
      {buttonDom}
    </JxFlex>
  );
});

JxNoData.propTypes = {
  title: PropTypes.string,
  errorText: PropTypes.string,
  errorEvent: PropTypes.func,
  buttonText: PropTypes.string
};

export default JxNoData;
