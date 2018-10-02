const { Pool } = require('pg');

// 재사용 가능한 db client poll
const pool = new Pool();

// async/await 이용 가능.
module.exports = {
  query: (text, params) => pool.query(text, params),
};
