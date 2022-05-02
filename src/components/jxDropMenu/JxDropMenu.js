import React from "react";
import PropTypes from "prop-types";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import classNames from "classnames/bind";
import JxNavDropPanel from "../jxNavDropPanel/JxNavDropPanel";
import TextButton from "../jxButton/TextButton";
import JxFlex from "../jxFlex/JxFlex";
import styles from "./JxDropMenu.module.less";

const cx = classNames.bind(styles);

const MenuItem = observer(({ onTap, data }) => {
  const { isSelect, text } = data;
  const className = cx({
    button: true,
    active: isSelect
  });
  return (
    <TextButton className={className} onTap={onTap}>
      {text}
    </TextButton>
  );
});

const Menu = observer(({ listData, selectItem }) => {
  return (
    <JxFlex className={styles.menu}>
      {listData.map(item => {
        return (
          <MenuItem
            key={item.value}
            data={item}
            onTap={() => selectItem(item)}
          />
        );
      })}
    </JxFlex>
  );
});

@observer
export default class JxDropMenu extends React.Component {
  @observable title = "";

  @observable visible = false;

  selectItem = selectInfo => {
    const { selectEvent } = this.props;
    this.title = selectInfo.text;
    selectInfo.isSelect = true;
    this.props.listData.map(item => {
      item.isSelect = item.value === selectInfo.value;
      return item;
    });
    this.visible = false;
    if (selectEvent) {
      selectEvent(selectInfo);
    }
  };

  @action
  handleVisibleChange = () => {
    this.visible = !this.visible;
  };

  constructor(props) {
    super(props);
    const { listData, autoInitSelectEvent } = this.props;
    if (listData && listData.length > 0) {
      listData.forEach(item => {
        if (item.isSelect) {
          if (autoInitSelectEvent) {
            this.selectItem(item);
          } else {
            this.title = item.text;
          }
        }
      });
    }
  }

  render() {
    const { listData, title } = this.props;
    return (
      <JxNavDropPanel
        title={this.title}
        visible={this.visible}
        handleVisibleChange={this.handleVisibleChange}
      >
        <div className={styles.dropMenuTitle}>选择分类</div>
        <div className={styles.titleWarp}>
          <div className={styles.lineLeft}></div>
          <div>{title}</div>
          <div className={styles.lineRight}></div>
        </div>
        <Menu listData={listData} selectItem={this.selectItem} />
      </JxNavDropPanel>
    );
  }
}

JxDropMenu.defaultProps = {
  autoInitSelectEvent: true
};

JxDropMenu.propTypes = {
  listData: PropTypes.any,
  selectEvent: PropTypes.func,
  autoInitSelectEvent: PropTypes.bool
};
