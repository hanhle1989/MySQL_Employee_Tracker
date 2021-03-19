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

function start(){
  inquirer
  .prompt({
    name: "action",
    type: "list",
    message: "Please choose an action from the following menu:",
    choices: [
      "Add a new department",
      "Add a new role",
      "Add a new employee",
      "View all departments",
      "View all roles",
      "View all employees",
      "Update an employee's role",
      "Update employee's manager",
      "View employees by manager",
      "Delete a department",
      "Delete a role",
      "Delete an employee",
      "Done"
    ]
  })
}