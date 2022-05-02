import React from "react";
import { observer } from "mobx-react";
import styles from "./JxUserLogo.module.less";
import { expr } from "mobx-utils";

const JxUserLogo = observer(function JxUserLogo({ className }) {
  const newClassName = expr(() => `${styles.logo} ${className}`);
  return <div className={newClassName} />;
});

export default JxUserLogo;
