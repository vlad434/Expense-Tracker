const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "aptx4869",
  host: "localhost",
  port: 5432,
  database: "expense_tracker",
});

module.exports = pool;
