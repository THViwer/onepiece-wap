import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";
import { Tabs } from "antd-mobile";
import styles from "./JxTabsPanel.module.less";

@observer
class JxTabsPanel extends Component {
  renderContent = () => this.props.children;

  renderTab = tab => (
    <div className="active-tab">{tab[this.props.defaultTitle]}<div className="start" /></div>
  );

  render() {
    const { tabs, renderContent, autoWidth } = this.props;
    const containerClass = autoWidth
      ? `${styles.container} ${styles.autoContainer}`
      : styles.container;
    return (
      <div className={containerClass}>
        {tabs.length > 0 ? (
          <Tabs
            renderTab={this.renderTab}
            tabBarUnderlineStyle={{ borderColor: "transparent" }}
            {...this.props}
          >
            {renderContent ? renderContent : this.renderContent}
          </Tabs>
        ) : null}
      </div>
    );
  }
}

JxTabsPanel.defaultProps = {
  defaultTitle: "title",
  autoWidth: false
};

JxTabsPanel.propTypes = {
  autoWidth: PropTypes.bool,
  tabs: PropTypes.any,
  onChange: PropTypes.func,
  defaultTitle: PropTypes.string
};

export default JxTabsPanel;
