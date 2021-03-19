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
      "Update an employee role",
      "Update employee manager",
      "View employees by manager",
      "Delete a department",
      "Delete a role",
      "Delete an employee",
      "Exit"
    ]
  })

  .then(function(answer) {
    if (answer.action === 'Add a new department') {
      addDepartment();
    } else if (answer.action === 'Add a new role') {
      addRole();
    } else if (answer.action === 'Add a new employee') {  
      addEmployee();   
    } else if (answer.action === 'View all departments') { 
      viewDepartments();
    } else if (answer.action === 'View all roles') { 
      viewRoles()
    } else if (answer.action === 'View all employees') { 
      viewEmployees()
    } else if (answer.action === 'Update an employee role') { 
      updateRole();
    } else if (answer.action === 'Update an employee manager') { 
      updateManager();
    } else if (answer.action === 'View an employee by manager') { 
      viewByManager();
    } else if (answer.action === 'Delete a department') { 
      deleteDepartment();
    } else if (answer.action === 'Delete a role') { 
      deleteRole();
    } else if (answer.action === 'Delete an employee') { 
      deleteEmployee();
    } else if (answer.action === 'Exit') {
      connection.end()
    }
  })
}

