const Pool = require("pg").Pool;

const pool = new Pool({
    user:'postgres',
    password:'170599',
    host:"localhost",
    port: 5432,
    database:"perfumeria"
});

module.exports = pool;