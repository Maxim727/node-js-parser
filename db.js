const Pool = require('pg').Pool;

const pool = new Pool({
    user: "parseddata",
    host: "localhost",
    database: "parseddata2",
    password: "kase",
    port: 5432,
});

module.exports = pool;
