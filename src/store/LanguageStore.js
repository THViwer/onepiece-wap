import {observable} from "mobx";
import homeStore from "./HomeStore";
import {webStorageGetItem, webStorageSetItem} from "jxUtils/webStorage";
import {selectCountryApi} from "../services/App.services";
import {getSupportCountryApi} from "../services/User.service";

export default class LanguageStore {
  region;

  @observable
  listData = [];

  constructor() {
    this.initData();
  }

  async initData(){
    const responseData = await getSupportCountryApi();
    if (responseData) {
      let listData = [
        {
          region: "Malaysia",
          language: [
            {
              text: "ENGLISH",
              value: "EN",
              isSelect: false
            },
            {
              text: "中文",
              value: "CN",
              isSelect: false
            },
            {
              text: "MALAY",
              value: "MY",
              isSelect: false
            }
          ]
        },
        {
          region: "Singapore",
          language: [
            {
              text: "ENGLISH",
              value: "EN",
              isSelect: false
            },
            {
              text: "中文",
              value: "CN",
              isSelect: false
            },
            {
              text: "MALAY",
              value: "MY",
              isSelect: false
            }
          ]
        },
        {
          region: "Indonesia",
          language: [
            {
              text: "ENGLISH",
              value: "EN",
              isSelect: false
            },
            {
              text: "ไทย",
              value: "ID",
              isSelect: false
            }
          ]
        },
        {
          region: "Thailand",
          language: [
            {
              text: "ENGLISH",
              value: "EN",
              isSelect: false
            },
            {
              text: "Bhs Indonesia",
              value: "TH",
              isSelect: false
            }
          ]
        },
        {
          region: "Vietnam",
          language: [
            {
              text: "ENGLISH",
              value: "EN",
              isSelect: false
            },
            {
              text: "Tiếng Việt",
              value: "VI",
              isSelect: false
            }
          ]
        }
      ];
      listData = listData.filter(item=>{
        return responseData.includes(item.region);
      })
      let region = webStorageGetItem("region", responseData[0]);
      this.region = region;
      let regionInfo = listData.find(regionItem => {
        return region === regionItem.region;
      });
      if(regionInfo){
        let languageInfo = regionInfo.language.find(languageItem => {
          return homeStore.locale === languageItem.value;
        });
        languageInfo.isSelect = true;
      }else{
        homeStore.locale = listData[0].language[0].value;
      }
      this.listData = listData;
    }
  }

  async changeLanguage(region, language) {
    if (region !== this.region || language !== homeStore.locale) {
      webStorageSetItem("region", region);
      webStorageSetItem("local", language);
    }
    const responseData = await selectCountryApi(
        {
          country: region
        },
        {
          header: {
            language: language
          }
        }
    );
    if (responseData) {
      const { language, domain } = responseData;
      window.location.href = `${domain}?language=${language}&country=${region}`;
    }
  }
}
