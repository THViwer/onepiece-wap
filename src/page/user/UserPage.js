import React from "react";
import {inject, observer} from "mobx-react";
import JxPage from "../../components/jxPage/JxPage";
import JxContent from "../../components/jxContent/JxContent";
import JxNavBar from "../../components/jxNavBar/JxNavBar";
import {hot} from "react-hot-loader/root";
import {computed} from "mobx";
import styles from "./UserPage.module.less";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import TextDelayButton from "jxComponents/jxButton/TextDelayButton";
import {FormattedMessage} from "react-intl";
import {Switch} from "antd-mobile";

const MenuItem = observer(function MenuItem({ data }) {
  const { text, icon, onTap } = data;
  return (
    <TextDelayButton className={styles.menuItem} onClick={onTap}>
      <div className={icon} />
      <div className={styles.text}>{text}</div>
    </TextDelayButton>
  );
});

@inject("userStore")
@observer
class UserPage extends React.Component {
  listMenu = [
    {
      text: (
        <FormattedMessage id="user.changePassword" defaultMessage="修改密码" />
      ),
      icon: styles.iconPassWord,
      onTap: () => {
        this.props.userStore.goChangePasswordPage();
      }
    },
    {
      text: <FormattedMessage id="user.banks" defaultMessage="银行列表" />,
      icon: styles.iconBank,
      onTap: () => {
        this.props.userStore.goBankManagePage();
      }
    },
    {
      text: (
        <FormattedMessage
          id="user.changePlatformPassword"
          defaultMessage="修改游戏密码"
        />
      ),
      icon: styles.iconGame,
      onTap: () => {
        this.props.userStore.goGameManagePage();
      }
    }
  ];

  @computed
  get autoTransfer() {
    return this.props.userStore.autoTransfer;
  }

  @computed get userName() {
    return this.props.userStore.userName;
  }

  autoChange = () => {
    this.props.userStore.autoTransfer = !this.props.userStore.autoTransfer;
    this.props.userStore.changeAutoTransfer(this.props.userStore.autoTransfer);
  };

  render() {
    return (
      <JxPage>
        <JxNavBar hasBackButton={false}>
          <FormattedMessage id="user.centerAccount" defaultMessage="账号中心" />
        </JxNavBar>
        <JxContent>
          <div className={styles.container}>
            <div className={styles.container2}>
              <div className={styles.userName}>Hi，{this.userName}</div>
            </div>
            <JxFlex className={styles.line3} addAlignCenter addContentSpaceBetween>
              <JxFlex addAlignCenter>
                <div className={styles.iconTransfer} />
                <FormattedMessage
                    id={"common.autoTransfer"}
                    defaultMessage={"Main Wallet Auto Transfer"}
                />
                ：
              </JxFlex>
              <Switch
                checked={this.autoTransfer}
                onClick={this.autoChange}
                color={"#66C200"}
              />
            </JxFlex>
          </div>
          <JxFlex className={styles.container1}>
            {this.listMenu.map((item, index) => {
              return <MenuItem data={item} key={index} />;
            })}
          </JxFlex>
        </JxContent>
      </JxPage>
    );
  }
}

export default hot(UserPage);
