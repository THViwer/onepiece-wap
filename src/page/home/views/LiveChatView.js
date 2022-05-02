import React, {Component} from "react";
import styles from "./LiveChatView.module.less";
import LiveChat from "react-livechat";
import {TextButton} from "jxComponents/jxButton";
import {inject, observer} from "mobx-react";
import {computed} from "mobx";
import cls from "classnames";

@inject("userStore", "homeStore")
@observer
class LiveChatView extends Component {
  @computed get isLogin() {
    if (this.props.userStore.isLogin && this.liveChat) {
      this.liveChat.hide_chat_window();
    }
    return this.props.userStore.isLogin;
  }

  @computed get liveChatId() {
    return this.props.homeStore.liveChatId;
  }

  @computed get liveChatTab() {
    return this.props.homeStore.liveChatTab;
  }

  liveChat;

  openChat = () => {
    this.props.homeStore.openLiveChat();
  };

  render() {
    const clsNames = cls([styles.liveLogo], {
      [styles.liveBottom]: !this.isLogin
    });
    return (
      <>
        {!this.isLogin && this.liveChatTab ? (
          <TextButton className={clsNames} onTap={this.openChat} />
        ) : null}

        {!this.isLogin && !this.liveChatTab && this.liveChatId ? (
          <LiveChat
            license={this.liveChatId}
            onChatLoaded={ref => (this.liveChat = ref)}
          />
        ) : null}
      </>
    );
  }
}

export default LiveChatView;
