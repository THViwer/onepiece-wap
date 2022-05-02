import React from "react";
import {inject, observer} from "mobx-react";
import {computed} from "mobx";
import {hot} from "react-hot-loader";
import JxPage from "jxComponents/jxPage/JxPage";
import JxNavBar from "jxComponents/jxNavBar/JxNavBar";
import JxContent from "jxComponents/jxContent/JxContent";
import {openWeChat, openWhatsApp} from "jxUtils/common";
import styles from "./ContactPage.module.less";
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import {defineMessages, injectIntl} from "react-intl";

const messages = defineMessages({
  contact: {
    id: "common.contact",
    defaultMessage: "联系我们"
  }
});

const ContactBox = props => {
  const { title, subTitle, icon, handleClick } = props;

  return (
    <div className={styles.contactBox} onClick={() => handleClick(title)}>
      <div className={styles.contactIcon}>
        <div className={icon} />
      </div>
      <div className={styles.contactContent}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subTitle}>{subTitle}</div>
      </div>
    </div>
  );
};

@inject("contactStore")
@observer
class ContactPage extends React.Component {

  @computed get wechatContact() {
    return this.props.contactStore.wechatContact;
  }

  @computed get whatsappContact() {
    return this.props.contactStore.whatsappContact;
  }

  @computed get contacts() {
    return [
      {
        title: "WeChat",
        subTitle: this.wechatContact.number,
        icon: styles.icoWeChat
      },
      {
        title: "WhatsApp",
        subTitle: "Should you prefer to use Whatsapp to chat with us",
        icon: styles.icoWhatsApp
      }
    ];
  }

  openWeChat = () => {
    openWeChat();
  };

  openWhatsApp = () => {
    openWhatsApp();
  };

  handleItemClick = type => {
    if (type === "WeChat") {
      this.openWeChat();
      return;
    }

    this.openWhatsApp(this.whatsappContact.number);
  };

  render() {
    return (
      <JxPage>
        <JxNavBar>{this.props.intl.formatMessage(messages.contact)}</JxNavBar>
        <JxContent className={styles.container}>
          {this.contacts.map(item => (
            <ContactBox
              key={item.title}
              handleClick={this.handleItemClick}
              {...item}
            />
          ))}
        </JxContent>
      </JxPage>
    );
  }
}

export default hot(module)(injectIntl(ContactPage));
