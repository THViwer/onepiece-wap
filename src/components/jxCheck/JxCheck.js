import React from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { TextButton } from "../jxButton";
import styles from "./JxCheck.module.less";

@observer
class JxCheck extends React.Component {
  onTap = () => {
    const { onChange, isChecked } = this.props;
    onChange(!isChecked);
  };

  render() {
    const { isChecked, className } = this.props;
    const newClassName = isChecked
      ? `${styles.iconChecked} ${className}`
      : `${styles.iconCheck} ${className}`;
    return <TextButton className={newClassName} onTap={this.onTap} />;
  }
}

JxCheck.defaultProps = {
  isChecked: true
};

JxCheck.propTypes = {
  isChecked: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func
};

export default JxCheck;
