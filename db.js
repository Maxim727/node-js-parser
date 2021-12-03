const Pool = require('pg').Pool;

const pool = new Pool({
    user: "max",
    host: "localhost",
    database: "parsedata",
    password: "kase",
    port: 5432,
});

module.exports = pool;