const {
  override,
  fixBabelImports,
  addBabelPlugins,
  useEslintRc,
  addLessLoader,
  addWebpackAlias,
  addBundleVisualizer
} = require("customize-cra");
const path = require("path");
const srcDir = path.resolve(__dirname, "src");
const clientDir = path.resolve(srcDir, "client");
let clientName = process.env.CLIENT;

const addReactHot = () => config => {
  if (process.env.NODE_ENV === "development") {
    config.entry.unshift(require.resolve("react-hot-loader/patch"));
  }
  return config;
};

const addJscrambler = () => config => {
  if (process.env.NODE_ENV !== "development") {
    config.plugins.push(
      new JscramblerWebpack({
        enable: true, // optional, defaults to true
        chunks: [
          "./UserLoginStore.js",
          "./secretRequestUtil.js",
          "./RegisterStore.js",
          "./secretUtil.js",
          "./GuestRegisterStore.js"
        ], // optional, defaults to all chunks
        // "filesSrc": [
        //   // "./build/**/*.html",
        //   "./build/static/js/130.chunk.js"
        // ],
        // "filesDest": "./",
        keys: {
          accessKey: "618A52EE73CB119D52F9B6CE1361716FD725BEA5",
          secretKey: "31D618C8D8C70982990C70EF4CC6A93D90E35FC2"
        },
        host: "api4.jscrambler.com",
        port: 443,
        applicationId: "5b0645cd73698000154d0d5e",
        params: [
          {
            name: "booleanToAnything"
          },
          {
            name: "charToTernaryOperator"
          },
          {
            name: "commaOperatorUnfolding"
          },
          {
            name: "dotToBracketNotation"
          },
          {
            name: "functionOutlining",
            options: {
              features: ["opaqueFunctions"]
            }
          },
          {
            name: "identifiersRenaming"
          },
          {
            name: "stringConcealing"
          },
          {
            name: "stringEncoding",
            options: {
              freq: 0.5
            }
          },
          {
            name: "variableGrouping"
          },
          {
            name: "constantFolding"
          },
          {
            name: "whitespaceRemoval"
          },
          {
            name: "duplicateLiteralsRemoval",
            options: {
              mode: ["optimization"]
            }
          }
        ],
        areSubscribersOrdered: false,
        applicationTypes: {
          webBrowserApp: true,
          desktopApp: false,
          serverApp: false,
          hybridMobileApp: false,
          javascriptNativeApp: false,
          html5GameApp: false
        },
        languageSpecifications: {
          es5: true,
          es6: false,
          es7: false
        },
        useRecommendedOrder: true
        // and other jscrambler configurations
      })
    );
  }
  return config;
};

let webPackConfig = [
  addWebpackAlias({
    jxUtils: path.resolve(srcDir, "utils"),
    jxTheme: path.resolve(srcDir, "theme"),
    jxComponents: path.resolve(srcDir, "components"),
    clientTheme: path.resolve(clientDir, clientName),
    clientDir: clientDir,
  }),
  useEslintRc(),
  ...addBabelPlugins(
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    "react-hot-loader/babel",
      ["react-intl", {
        "messagesDir": "./src/i18n/messages/"
      }],
  ),
  fixBabelImports("lodash", {
    libraryDirectory: "",
    camel2DashComponentName: false
  }),
  fixBabelImports("import", {
    libraryName: "antd-mobile",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modules: true,
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]" // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
  }),
  addReactHot(),
  // addJscrambler()
];

if (process.env.NODE_ENV === "development") {
  // webPackConfig.push(
  //   addWebpackAlias({
  //     "react-dom": "@hot-loader/react-dom"
  //   })
  // );
}

if (process.argv.includes("--analyze")) {
  webPackConfig.push(addBundleVisualizer({}, true));
}

module.exports = override(webPackConfig);
