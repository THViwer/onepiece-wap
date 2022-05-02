import * as React from "react";

export interface NavOptions {
  animate?: boolean; //是否启用动画
  pageId?: string; //页面唯一id，如果没有默认为pageName
  fixPage?: boolean; //固定页面，使用多层返回的时候可以拦截返回器(使用场景，页面返回过多，有些页面需要固定，充值页面返回)
}

export default class JxNavigation<T = any> extends React.Component {
  initHistory(): any;
  initEvent(): any;
  addModule(component: any): any;
  initComponent(): any;
  loadComponent(pageName: any): any;
  pushView(pageName: any, navParams: any, navOptions: NavOptions): any;
  popView(): any;
  popToRoot(): any;
  popAndPushView(
    pageName: any,
    params: any,
    removePageNum: any,
    navOptions: any
  ): any;
  popSecondView(pageName: any, params: any, navOptions: NavOptions): any;
  backNumPage(num: any, navParams: any): any;
  _triggerViewBackEvent(navParams: any): any;
  _triggerPageHideEvent(): any;
  _triggerPageBackKeyEvent(): any;
  _triggerWindowShow(): any;
  _triggerWindowHide(): any;
  initView(): any;
  _historyBack(pageNum: any): any;
}
