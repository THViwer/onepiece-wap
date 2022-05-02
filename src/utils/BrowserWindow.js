export default class BrowserWindow {
  localWindow;
  constructor() {
    this.localWindow = window.open(
      "about:blank",
      "_blank",
      "height=736, width=414, toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no"
    );
    // this.localWindow.blur();
  }

  close() {
    this.localWindow.close();
  }

  open(href) {
    this.localWindow.location.href = href;
    this.localWindow.focus();
  }
}
