import React from "react";
import {Provider} from "mobx-react";
import jxAppStore from "./store/JxAppStore";
import homeStore from "./store/HomeStore";
import userStore from "./store/UserStore";
import appController from "./store/AppController";
import IndexPage from "./page/index/IndexPage";
import transferStore from "./store/TransferStore";
import contactStore from "./store/ContactStore";

const sysTemStores = {
  jxAppStore,
  appController,
  homeStore,
  userStore,
  transferStore,
  contactStore
};
homeStore.initBase();

const doc = document.documentElement;
const docWidth = Math.min(doc.clientWidth, doc.clientHeight);

if (docWidth !== 0) {
  let minSize = Math.min(docWidth / 375, 1.5);
  doc.style.fontSize = minSize * 12 + "px";
}

if (docWidth === 0) {
  doc.style.fontSize = "12px";
}

if (process.env.NODE_ENV === "development") {
  // import("vconsole").then(vConsole => {
  //   new vConsole.default();
  // });
}

function App() {
  return (
    <Provider {...sysTemStores}>
      <IndexPage />
    </Provider>
  );
}

export default App;
