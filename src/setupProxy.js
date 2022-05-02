/*
 * @Author: your name
 * @Date: 2020-06-08 14:38:50
 * @LastEditTime: 2022-05-02 10:31:13
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /onepiece-wap/src/setupProxy.js
 */
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/api/", {
      //  target: "http://106wap.dev01.com",
      target: "http://47.242.80.186:8002",
      changeOrigin: true,
      pathRewrite: {
        "^/api/v1": "/api/v1"
      }
    })
  );
};
