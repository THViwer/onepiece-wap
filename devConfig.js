/*
 * @Author: your name
 * @Date: 2020-06-10 15:03:41
 * @LastEditTime: 2022-05-02 10:53:52
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /onepiece-wap/devConfig.js
 */
const inquirer = require('inquirer');
const _ = require('lodash');
const clientConfig = require('./clientConfig');
const execSh = require('exec-sh');
const fs = require('fs');
const path = require('path');

const NGINX_SERVER = "185.232.92.67";

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
async function run() {
  if(!process.argv.includes('--ALL_RELEASE')){
    const clientNameList = _.keys(clientConfig);
    let responseData1 = await inquirer.prompt([
      {
        type: 'autocomplete',
        message: '选择样式分支',
        name: 'selectedClient',
        source: (_, input = '') =>
            new Promise(resolve => {
              resolve(clientNameList.filter(item => item.includes(input)));
            }),
      },
    ]);

    const selectedClient = responseData1.selectedClient;
    const clientInfo = {
      clientName: selectedClient,
    };

    fs.writeFileSync(path.join(__dirname, 'src','clientInfo.json'), JSON.stringify(clientInfo));

    if (process.argv.includes('--START')) {
      execSh(`cross-env CLIENT=${selectedClient} PORT=7300 react-app-rewired start`);
    }

    if (process.argv.includes('--RELEASE')) {
      const clientUrl = clientConfig[selectedClient];
      execSh(
          ` 
        cross-env CLIENT=${selectedClient} GENERATE_SOURCEMAP=false react-app-rewired build 
        react-snap
        node updateClientConfig.js ${clientUrl}
       
        `,
      );
    }
  }

  if (process.argv.includes('--ALL_RELEASE')) {
    const clientNameList = _.keys(clientConfig);
    let runStrList = [];
    clientNameList.forEach(item=>{
      const selectedClient = item;
      const clientUrl = clientConfig[selectedClient];
      runStrList.push(`
        cross-env PUBLIC_URL=/m/ CLIENT=${selectedClient} GENERATE_SOURCEMAP=false react-app-rewired build
        react-snap
        ssh root@${NGINX_SERVER}  /opt/service/del_html.sh ${clientUrl}\nscp -r build/* root@${NGINX_SERVER}:/opt/html/${clientUrl}
        `,)
    })
    let runStr = runStrList.join(``)
    console.log(runStr);
    execSh(
        runStr
    );
  }
}
run();
