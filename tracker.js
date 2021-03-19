const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password999!',
  database: 'employee_db',
});

connection.connect(function(err) {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    start();
})

