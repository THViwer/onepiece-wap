let axios = require("axios");
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const srcDir = path.resolve(__dirname, "build");
const clientUrl = process.argv[2];

axios.get(`https://www.wgw88.com/api/v1/player/api/seo`).then(function(response) {
  // handle success
  const clientSeo = response.data;
  const htmlPath = srcDir + "/index.html";
  let $ = cheerio.load(fs.readFileSync(htmlPath));
  $("title").text(clientSeo.title);
  $("[name = keywords]").attr("content", clientSeo.keywords);
  $("[name = description]").attr("content", clientSeo.description);
  fs.writeFileSync(htmlPath, $.html());
});
