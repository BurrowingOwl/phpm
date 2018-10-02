const routes = require('../routes');

const setupRoute = app => {
  app.use('/api', routes);
};

module.exports = setupRoute;
