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

const viewDepartments = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    res.forEach(department => {
      console.log(`Department ID: ${department.id} | ${department.name}`)
    })

    start();
  });
};



const viewRoles = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    res.forEach(role => {
      console.log(`Department ID: ${role.department_id} | Role ID: ${role.id} | ${role.title} ($${role.salary}/year)`)
    })

    start();
  });
};



const viewEmployees = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    res.forEach(employee => {
      console.log(`Role ID: ${employee.role_id} | ${employee.first_name} ${employee.last_name}`)
    })

    start();
  });
};



const addDepartment = () => {
  connection.query(`SELECT * FROM department`, (err, res) => {
    inquirer
      .prompt(
        {
          name: "newDepartment",
          type: "input",
          message: "What is the name of the new department?",
        }
      )

      .then((answer) => {
        connection.query('INSERT INTO department (name) VALUES (?)', answer.newDepartment, (err, res) => {
          if (err) throw err
          console.log(`New department has been added.`)
          start();
        })
      });
  })
};



const addRole = () => {
  connection.query('SELECT * FROM department', function (err, res) {
    if (err) throw (err);
    inquirer
      .prompt(
        [
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
            name: "departmentChoice",
            type: "list",
            message: "Which department does this role belong to?",
            choices: function departmentName() {
              var choicesArray = [];
              res.forEach(res => {
                choicesArray.push(
                  res.name
                );
              })
              return choicesArray;
            }
          },
        ]
      )

      .then((answer) => {
        const department = answer.departmentChoice;
        connection.query('SELECT * FROM department', (err, res) => {
          if (err) throw (err);
          let filteredDept = res.filter(function (res) {
            return res.name == department;
          }
          )
          let id = filteredDept[0].id;
          connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [answer.title, answer.salary, id], (err, res, fields) => {
            if (err) throw err

            console.log(`New role has been added.`)

            start();
          })
        })
      })
  })
};



const addEmployee = () => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw (err);
    inquirer
      .prompt(
        [
          {
            name: "firstName",
            type: "input",
            message: "What is the new employee's first name?",
            validate: function (answer) {
              if (answer === "") {
                return console.log("First Name cannot be blank")
              } else {
                return true;
              }
            }
          },
          {
            name: "lastName",
            type: "input",
            message: "What is the new employee's last name?",
            validate: function (answer) {
              if (answer === "") {
                return console.log("Last Name cannot be blank")
              } else {
                return true;
              }
            }
          },
          {
            name: "roleName",
            type: "list",
            message: "What is the new employee's title?",
            choices: function titleName() {
              var roleArray = [];
              res.forEach(res => {
                roleArray.push(
                  res.title
                );
              })
              return roleArray;
            }
          }
        ]
      )

      .then((answer) => {
        const role = answer.roleName;
        connection.query('SELECT * FROM role', (err, res) => {
          if (err) throw err;
          let filteredRole = res.filter(function (res) {
            return res.title == role;
          })
          let role_id = filteredRole[0].id;
          connection.query("SELECT * FROM employee", function (err, res) {
            inquirer
              .prompt([
                {
                  name: "manager",
                  type: "list",
                  message: "Who is your manager?",
                  choices: function () {
                    managersArray = []
                    res.forEach(res => {
                      managersArray.push(
                        res.last_name)

                    })
                    return managersArray;
                  }
                }
              ])
              .then(function (managerAnswer) {
                const manager = managerAnswer.manager;
                connection.query('SELECT * FROM employee', function (err, res) {
                  if (err) throw (err);
                  let filteredManager = res.filter(function (res) {
                    return res.last_name == manager;
                  })
                  let manager_id = filteredManager[0].id;

                  connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answer.firstName, answer.lastName, role_id, manager_id], (err, res, fields) => {

                    console.log(`New employee has been added`)

                    start();
                  })
                })
              })
          })
        })
      })
  })
};

const updateRole = () => {

};



const deleteDepartment = () => {

};



const deleteRole = () => {

};



const deleteEmployee = () => {

};