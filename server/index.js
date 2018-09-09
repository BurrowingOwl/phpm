const express = require('express');
const env = require('dotenv');
const chalk = require('chalk');
const config = require('./config');

env.config();

const isDev = process.env.NODE_ENV !== 'production';
const {
  host,
  port,
} = config;

const setupGraphql = require('./setup/setupGraphql');
const setupBase = isDev ? require('./setup/setupDev') : require('./setup/setupProd');

/** configuration
 * 1. mongoose connection
 * 2. body-parser
 * 3. api setting
 * 4. setup for dev or prod enviroment
 * Finally Open
 */

const app = express();

// Your api or static setting like app.use('/static', express.static(outputPath));
// 반드시 graphql Setup이 먼저 되어야함. endpoint를 선점하기 위해서.
setupGraphql(app);
setupBase(app);
// get the intended host and port number, use localhost and port 3000 if not provided

app.listen(port, host, (err) => {
  if (err) {
    console.error(chalk.red(err));
  }
  if (isDev) {
    console.log(`Server started in Development! ${chalk.green('✓')}`);
  }
  else {
    console.log(`Server started! ${chalk.green('✓')}`);
  }

  console.log(`
      ${chalk.bold('Server is Running on:')}
      ${chalk.magenta(`http://${host}:${port}`)}
      ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);
});
