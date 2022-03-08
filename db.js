const Pool = require('pg').Pool;

const pool = new Pool({
    user: "parseddata",
    host: "192.168.211.41",
    database: "parseddata",
    password: "kase",
    port: 5432,
});

module.exports = pool;
