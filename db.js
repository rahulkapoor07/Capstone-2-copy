const {Pool} = require("pg");
const {DB_URI} = require("./config");

let db = new Pool({
    connectionString : DB_URI
});

module.exports = db;