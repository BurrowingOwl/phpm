const { port, host } = process.env;

module.exports = {
  port: port || 3000,
  host: host || 'localhost',
};
