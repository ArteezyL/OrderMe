var db = {};
var mysql = require('mysql');
var pool = mysql.createConnection({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'arteezy',
    port: '3306',
    database: 'dba'
});
pool.connect();
db.query = function (sql, callback) {

    if (!sql) {
        callback();
        return;
    }
    pool.query(sql, function (err, rows, fields) {
        if (err) {
            console.log(err);
            callback(err, null);
            return;
        };
        callback(null, rows, fields);
    });

}
module.exports = db;