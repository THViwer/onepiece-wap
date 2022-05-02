import React from "react";
import PropTypes from "prop-types";
import styles from "./JxListImgItem.module.less";

const JxListImgItem = ({ iconClass }) => {
  const newClass = `${styles.img} ${iconClass}`;
  return <div className={newClass} />;
};

JxListImgItem.propTypes = {
  iconClass: PropTypes.string
};

export default JxListImgItem;
