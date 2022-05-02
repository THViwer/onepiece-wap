// eslint-disable-next-line
const path = require('path');

const srcDir = path.resolve(__dirname, 'src');
const clientDir = path.resolve(srcDir, "client");
const clientName = "wgw88";


module.exports = {
  resolve: {
    alias: {
      jxUtils: path.resolve(srcDir, "utils"),
      jxTheme: path.resolve(srcDir, "theme"),
      jxComponents: path.resolve(srcDir, "components"),
      clientTheme: path.resolve(clientDir, clientName),
      clientDir: clientDir
    }
  }
};
