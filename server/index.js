const express = require('express');
const env = require('dotenv');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

env.config();

const { HOST, PORT } = process.env;
const isDev = process.env.NODE_ENV !== 'production';
const setupDB = require('./setup/setupDB');
const setupRoute = require('./setup/setupRoute');
const setupGraphql = require('./setup/setupGraphql');
const setupBase = isDev
  ? require('./setup/setupDev')
  : require('./setup/setupProd');

const app = express();

const setup = async () => {
  await setupDB();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  const db = require('./db');
  const context = { db };
  // Your api or static setting like app.use('/static', express.static(outputPath));
  // 반드시 graphql Setup이 먼저 되어야함. endpoint를 선점하기 위해서.
  setupRoute(app);
  setupGraphql(app, context);
  // last setup
  setupBase(app);
};
// get the intended host and port number, use localhost and port 3000 if not provided

setup().then(() => {
  app.listen(PORT, HOST, err => {
    if (err) {
      console.error(chalk.red(err));
    }
    if (isDev) {
      console.log(`Server started in Development! ${chalk.green('✓')}`);
    } else {
      console.log(`Server started! ${chalk.green('✓')}`);
    }

    console.log(`
        ${chalk.bold('Server is Running on:')}
        ${chalk.magenta(`http://${HOST}:${PORT}`)}
        ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
      `);
  });
});
