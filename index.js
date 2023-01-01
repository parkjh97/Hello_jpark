var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'test'
});
 
connection.connect();
 
connection.query('SELECT * from test.USER', function (error, results, fields) {
    if (error) throw error;
    console.log('users: ', results);
  });
   
  connection.end();