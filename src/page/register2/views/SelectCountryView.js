import React, {Component} from "react";
import {List, Picker} from "antd-mobile";
import styles from "./SelectCountryView.module.less";
import {inject, observer} from "mobx-react";

@inject("registerStore")
@observer
export class CountryPrefixSelector extends React.Component {
  render() {
    let { onChange, value, countryList } = this.props;

    return (
      <Picker
        data={countryList}
        cascade={false}
        cols={1}
        onChange={onChange}
        // onChange={this.changeChannel}
        value={value}
      >
        <List.Item className={styles.input} arrow="down" />
      </Picker>
    );
  }
}

@observer
class SelectCountryView extends Component {
  render() {
    const { onChange, value, countryNameList } = this.props;
    return (
      <Picker
        data={countryNameList}
        cascade={false}
        cols={1}
        onChange={onChange}
        value={value}
      >
        <List.Item className={styles.input} arrow="down" />
      </Picker>
    );
  }
}

export default SelectCountryView;
