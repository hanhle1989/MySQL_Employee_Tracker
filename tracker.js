const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'employee_db',
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);

  start();
})

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Please choose an action from the following menu:",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a new department",
        "Add a new role",
        "Add a new employee",
        "Update an employee role",
        "Update employee manager",
        "View employees by manager",
        "Delete a department",
        "Delete a role",
        "Delete an employee",
        "Exit"
      ]
    })

    .then(function (answer) {
      if (answer.action === 'View all departments') {
        viewDepartments();
      } else if (answer.action === 'View all roles') {
        viewRoles();
      } else if (answer.action === 'View all employees') {
        viewEmployees();
      } else if (answer.action === 'Add a new department') {
        addDepartment();
      } else if (answer.action === 'Add a new role') {
        addRole();
      } else if (answer.action === 'Add a new employee') {
        addEmployee();
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

function viewDepartments() {
  var query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    console.log(`DEPARTMENTS:`)
    res.forEach(department => {
      console.log(`Department ID: ${department.id} | ${department.name}`)
    })

    start();
  });
};



function viewRoles() {
  var query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    console.log(`ROLES:`)
    res.forEach(role => {
      console.log(`Department ID: ${role.department_id} | ${role.title} ($${role.salary}/year)`)
    })

    start();
  });
};



function viewEmployees() {
  var query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    console.log(`ROLES:`)
    res.forEach(employee => {
      console.log(`Department ID: ${employee.id} | ${employee.first_name} ${employee.last_name}`)
    })

    start();
  });
};



function addDepartment() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What is the name of the new department?",
    })
    .then(function (answer) {
      var query = "INSERT INTO department (name) VALUES ( ? )";
      connection.query(query, answer.department, function (err, res) {
        console.log(`${(answer.department).toUpperCase()} Department has been added.`)
      })
      viewDepartments();

      start();
    })
};



function addRole() {
  connection.query('SELECT * FROM department', function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the new role called?",
          validate: function (answer) {
            if (answer === "") {
              return console.log("Role cannot be blank")
            } else {
              return true;
            }
          }
        },
        {
          name: "salary",
          type: "input",
          message: "What is this new role's salary?",
          validate: function (answer) {
            if (answer === "") {
              return console.log("Please enter salary")
            } else {
              return true;
            }
          }
        },
        {
          name: "departmentName",
          type: "list",
          message: "Which department does this new role be under?",
          choices: function () {
            var choicesArray = [];
            res.forEach(res => {
              choicesArray.push(
                res.name
              );
            })
            return choicesArray;
          }
        },
      ])

      // get ID from department table
      .then(function (answer) {
        const department = answer.departmentName;
        connection.query('SELECT * FROM DEPARTMENT', function (err, res) {

          if (err) throw (err);
          let filteredDept = res.filter(function (res) {
            return res.name == department;
          }
          )

          let id = filteredDept[0].id;
          let query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
          let values = [answer.title, parseInt(answer.salary), id]
          console.log(values);

          connection.query(query, values,
            function (err, res, fields) {
              console.log(`${(values[0]).toUpperCase()} role has been added.`)
            })
          viewRoles()

          start();
        })
      })
  })
};


function addEmployee() {

};



function updateRole() {

};


function updateManager() {

};


function viewByManager() {

};


function deleteDepartment() {

};


function deleteRole() {

};


function deleteEmployee() {

};