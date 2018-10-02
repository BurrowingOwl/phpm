const path = require('path');
const morgan = require('morgan');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../../config/webpack.config.dev.js');

module.exports = function setupDev(app) {
  // dev용 logger
  const logger = morgan('combined');
  const { publicPath, path: outputPath } = config.output;
  // webpack-dev-middleware 설정
  // server는 내가 직접 열고, express의 middleware로서 webpack-dev-middleware가 작동함.
  const compiler = webpack(config);
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath,
  });
  // middleware 설정
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use(logger);
  // webpackDevMiddleware 는 performance를 위해 index.html를 hard에 쓰지 않고 memory에 가지고 있음.
  // 그에 따라, html-webpack-plugin이 만들어낸 index.html은 hard에 쓰이지 않음.
  // 즉, res.sendFile을 이용해 보낼 수 없음.
  // https://github.com/jantimon/html-webpack-plugin/issues/145#issuecomment-170554832
  const fs = middleware.fileSystem;
  app.get('*', (req, res) => {
    fs.readFile(path.join(outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });
};
