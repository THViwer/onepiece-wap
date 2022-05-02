import React from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { TextButton } from "../jxButton";
import JxSelect from "../jxSelect/JxSelect";
import styles from "./JxSegment.module.less";

const cx = classNames.bind(styles);

const SegmentItem = observer(({ data, onTap }) => {
  const { text, isSelect } = data;
  const className = cx({ segmentItem: true, active: isSelect });
  return (
    <TextButton className={className} onTap={onTap}>
      {text}
    </TextButton>
  );
});

const JxSegment = observer(({ listData, onChange }) => {
  return (
    <JxSelect
      listData={listData}
      className={styles.segment}
      OptionComponent={SegmentItem}
      onChange={onChange}
    />
  );
});

JxSegment.propTypes = {
  listData: PropTypes.any,
  onChange: PropTypes.func
};

export default JxSegment;
