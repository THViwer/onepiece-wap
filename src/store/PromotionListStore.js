import { action, observable } from 'mobx';
import { promotionListApi } from '../services/App.services';
import appController from './AppController';
import userStore from './UserStore';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default class PromotionListStore {
  @observable
  listData = [];

  constructor() {
    this.initData();
  }

  async initData() {
    const responseData = await promotionListApi(null, {
      header: {
        launch: userStore.browserSystem,
      },
    });
    if (responseData) {
      let listData = [
        {
          id: 'all',
          text: <FormattedMessage id="promotion.all" defaultMessage="全部" />,
          isSelect: true,
          list: [],
        },
        {
          id: 'special',
          text: <FormattedMessage id="promotion.special" defaultMessage="特别优惠" />,
          isSelect: false,
          list: [],
        },
        {
          category: 'Backwater',
          text: <FormattedMessage id="promotion.rebate" defaultMessage="反水" />,
          isSelect: false,
          list: [],
        },
        {
          id: 'first',
          category: 'First',
          text: <FormattedMessage id="promotion.first" defaultMessage="首冲" />,
          isSelect: false,
          list: [],
        },
        {
          id: 'slot',
          category: 'Slot',
          text: <FormattedMessage id="home.slot" defaultMessage="老虎机" />,
          isSelect: false,
          list: [],
        },
        {
          id: 'live',
          category: 'Live',
          text: <FormattedMessage id="home.live" defaultMessage="真人视讯" />,
          isSelect: false,
          list: [],
        },
        {
          id: 'sport',
          category: 'Sport',
          text: <FormattedMessage id="home.sport" defaultMessage="体育" />,
          isSelect: false,
          list: [],
        },
        {
          id: 'fishing',
          category: 'Fishing',
          text: <FormattedMessage id="home.fishing" defaultMessage="捕鱼" />,
          isSelect: false,
          list: [],
        },
      ];

      listData.forEach(item => {
        if (item.id === 'all') {
          const excludes = ['Fishing', 'Sport', 'Live', 'Slot'];
          item.list = responseData.filter(item => !excludes.includes(item.category));
        } else {
          item.list = responseData.filter(info => {
            if (item.id === 'special') {
              return info.category === 'Other';
            }

            return info.category === item.category;
          });
        }
      });

      this.listData = listData;
    }
  }

  @action
  goPromotionInfoPage(info) {
    appController.navPushPage('PromotionInfoPage', info);
  }
}
