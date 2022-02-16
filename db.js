const {Pool} = require("pg");
const {DB_URI} = require("./config");

let db = new Pool({
    connectionString : DB_URI,
    ssl: {    /* <----- Add SSL option */
        rejectUnauthorized: false,
      }
});

module.exports = db;