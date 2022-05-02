import React from "react";
import { observer } from "mobx-react";
import JxSelect from "../jxSelect/JxSelect";
import { TextButton } from "../jxButton";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./JxTabs.module.less";

const cx = classNames.bind(styles);

const SegmentItem = observer(({ data, onTap }) => {
  const { text, isSelect } = data;
  const className = cx({ tabItem: true, active: isSelect });
  return (
    <TextButton className={className} onTap={onTap}>
      {text}
    </TextButton>
  );
});

const JxTabs = observer(function JxTabs({ listData, onChange }) {
  return (
    <JxSelect
      listData={listData}
      className={styles.tabs}
      OptionComponent={SegmentItem}
      onChange={onChange}
    />
  );
});

JxTabs.propTypes = {
  listData: PropTypes.any,
  onChange: PropTypes.func
};

export default JxTabs;
