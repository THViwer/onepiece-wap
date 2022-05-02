import React from "react";
import {inject, observer} from "mobx-react";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import styles from "./FastActionView.module.less";
import {FormattedMessage} from "react-intl";

function IconView({ iconClass, text, onClick }) {
    return (
        <JxFlex
            className={styles.iconContainer}
            isColumn
            addAlignCenter
            addContentCenter
            onClick={onClick}
        >
            <div className={iconClass} />
            <div>{text}</div>
        </JxFlex>
    );
}

@inject("userStore")
@observer
class FastActionView extends React.Component {
    goDeposits = () => {
        this.props.userStore.goDeposits();
    };

    goWithdraw = () => {
        this.props.userStore.goWithdraw();
    };

    goTransferHistory = () => {
        this.props.userStore.goTransferHistory();
    };

    render() {
        return (
            <>
                <JxFlex className={styles.container} addContentSpaceBetween>
                    <IconView
                        iconClass={styles.icDeposits}
                        onClick={this.goDeposits}
                        text={
                            <FormattedMessage id="home.deposits" defaultMessage={"充值"}/>
                        }
                    />
                    <IconView
                        iconClass={styles.icWithdraw}
                        onClick={this.goWithdraw}
                        text={
                            <FormattedMessage id="home.withdraw" defaultMessage={"提款"} />
                        }
                    />
                    <IconView
                        iconClass={styles.icHistory}
                        onClick={this.goTransferHistory}
                        text={
                            <FormattedMessage id="home.history" defaultMessage={"历史"} />
                        }
                    />
                </JxFlex>
                <div className={styles.line} />
            </>
        );
    }
}
export default FastActionView;
