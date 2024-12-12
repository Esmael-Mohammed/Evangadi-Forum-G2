const mysql = require("mysql2");

const pool = mysql.createPool({
 USER= "u961275249_kebe"
PASSWORD= "firaol@B123"
HOST= "82.197.82.42"
DB_NAME= "u961275249_evangadi_DB"
});

module.exports = pool.promise();
