const { Client } = require('pg');

const client = new Client();

// process.env를 알아서 가져옴.
// pg로 시작하는 것들
const setupDB = async () => {
  await client.connect();
  return client;
};

module.exports = setupDB;
