import React from "react";
import {inject, observer} from "mobx-react";
import JxPage from "jxComponents/jxPage/JxPage";
import JxContent from "jxComponents/jxContent/JxContent";
import JxNavBar from "jxComponents/jxNavBar/JxNavBar";
import {FormattedMessage} from "react-intl";
import {AppButton} from "jxComponents/jxButton";
import styles from "./Deposits2Page.module.less";
import {hot} from "react-hot-loader/root";
import {observable} from "mobx";
import {showToast} from "jxUtils/common";
import Files from "react-files";
import JxFlex from "jxComponents/jxFlex/JxFlex";

@inject("depositsStore")
@observer
class DepositsForm extends React.Component {
  @observable
  files = [];
  submitAction = () => {
    if (this.files.length === 0) {
      showToast("请上传图片");
      return;
    }
    this.props.depositsStore.depositInfo(this.files[0]).then();
  };

  onFilesChange = files => {
    this.files = files;
  };

  onFilesError = (error, file) => {
    console.log("error code " + error.code + ": " + error.message);
  };

  removeFile = () => {
    this.files.pop();
  };

  render() {
    return (
      <div>
        <JxFlex className={styles.container}>
          <Files
            className={styles.systemButton}
            onChange={this.onFilesChange}
            onError={this.onFilesError}
            accepts={["image/*"]}
            multiple
            maxFiles={1}
            maxFileSize={10000000}
            minFileSize={0}
            clickable
          >
            Upload Receipt
          </Files>
          {this.files.map((file, index) => {
            return (
              <img
                key={index}
                alt={""}
                onClick={() => this.removeFile(file)}
                className={styles.imgFile}
                src={file.preview.url}
              />
            );
          })}
        </JxFlex>
        <AppButton
          theme="color1"
          onClick={this.submitAction}
          className={styles.systemButton2}
        >
          SUBMIT
        </AppButton>
      </div>
    );
  }
}

@observer
class Deposits2Page extends React.Component {
  render() {
    return (
      <JxPage
        storeKey={"depositsStore"}
        storeValue={this.props.navParams.depositsStore}
      >
        <JxNavBar>
          <FormattedMessage id="home.deposits" defaultMessage={"Deposits"} />
        </JxNavBar>
        <JxContent>
          <DepositsForm />
        </JxContent>
      </JxPage>
    );
  }
}

export default hot(Deposits2Page);
