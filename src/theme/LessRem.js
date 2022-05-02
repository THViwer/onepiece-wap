function LessRem(options) {}

LessRem.prototype = {
  install: function(less, pluginManager, functions) {
    functions.add("jxRem", function(param) {
      return `${parseFloat((param.value / 1).toFixed(3))}rem`;
      // return `${parseFloat((param.value * 1.2).toFixed(3))}rem`;
    });
    functions.add("jxFont", function(param) {
      return `${parseFloat((param.value * 10).toFixed(3))}px`;
      // return `${parseFloat((param.value * 1.2).toFixed(3))}rem`;
    });
  },
  printUsage: function() {},
  setOptions: function(options) {},
  minVersion: [2, 1, 0]
};

module.exports = LessRem;
