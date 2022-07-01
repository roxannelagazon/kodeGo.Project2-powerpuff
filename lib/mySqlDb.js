var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'bbbb7c65fc952f',
    password: 'f6b82ba5',
    database: 'heroku_44677bd173a5e66'
});
module.exports = connection;
