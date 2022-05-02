import React from "react";
import {observer} from "mobx-react";
import JxPage from "../../components/jxPage/JxPage";
import JxContent from "../../components/jxContent/JxContent";
import JxNavBar from "../../components/jxNavBar/JxNavBar";
import {hot} from "react-hot-loader/root";
import {computed} from "mobx";
import styles from "./LanguagePage.module.less";
import JxFlex from "jxComponents/jxFlex/JxFlex";
import TextDelayButton from "jxComponents/jxButton/TextDelayButton";
import LanguageStore from "../../store/LanguageStore";

const MenuItem = observer(function MenuItem({ data, region, onTap }) {
  return (
      <JxFlex className={styles.listItem}>
        {data.map((item, index) => {
          const { text, isSelect } = item;
          let newClass = isSelect
              ? `${styles.menuItem} ${styles.menuItemActive}`
              : styles.menuItem;
          return (
              <TextDelayButton
                  key={index}
                  className={newClass}
                  onClick={() => onTap(region, item)}
              >
                {text}
              </TextDelayButton>
          );
        })}
      </JxFlex>
  );
});

@observer
class LanguagePage extends React.Component {
  languageStore = new LanguageStore();

  @computed get listData() {
    return this.languageStore.listData;
  }

  selectLanguage = (region,language) => {
    this.languageStore.changeLanguage(region,language.value);
  };

  render() {
    return (
        <JxPage>
          <JxNavBar>Region and Language</JxNavBar>
          <JxContent className={styles.container}>
            <JxFlex isColumn className={styles.container1}>
              {this.listData.map((item, index) => {
                const { region, language } = item;
                return (
                    <JxFlex isColumn key={index} className={styles.container3}>
                      <div className={styles.region}>{region}</div>
                      <JxFlex addAlignCenter>
                        <div className={styles[region]} />
                        <MenuItem
                            region={region}
                            data={language}
                            onTap={this.selectLanguage}
                        />
                      </JxFlex>
                    </JxFlex>
                );
              })}
            </JxFlex>
          </JxContent>
        </JxPage>
    );
  }
}

export default hot(LanguagePage);
