const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "employeeTracker_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('#######                                                 \n#       #    # #####  #       ####  #   # ###### ###### \n#       ##  ## #    # #      #    #  # #  #      #      \n#####   # ## # #    # #      #    #   #   #####  #####  \n#       #    # #####  #      #    #   #   #      #      \n#       #    # #      #      #    #   #   #      #      \n####### #    # #      ######  ####    #   ###### ###### \n                                                        \n######                                                  \n#     #   ##   #####   ##                               \n#     #  #  #    #    #  #                              \n#     # #    #   #   #    #                             \n#     # ######   #   ######                             \n#     # #    #   #   #    #                             \n######  #    #   #   #    #                             \n                                                        \n#######                                                 \n   #    #####    ##    ####  #    # ###### #####        \n   #    #    #  #  #  #    # #   #  #      #    #       \n   #    #    # #    # #      ####   #####  #    #       \n   #    #####  ###### #      #  #   #      #####        \n   #    #   #  #    # #    # #   #  #      #   #        \n   #    #    # #    #  ####  #    # ###### #    #       ');
    startMenu();
});

function startMenu() {
    // Start menu options:
    // - Manage departments (add, view, delete) (bonus: utilized budgets by department)
    // - Manage roles (add, view, delete)
    // - Manage employees (add, view, update, delete)
    // - Exit

    inquirer.prompt({
        name: "choice",
        type: "list",
        message: "MAIN MENU\nWhat would you like to do?",
        choices: [
            "Manage departments",
            "Manage roles",
            "Manage employees",
            "<-- EXIT"
        ]})
    .then((response) => {
        switch (response.choice) {
            case "Manage departments":
                departmentsMenu();
                break;
            case "Manage roles":
                rolesMenu();
                break;
            case "Manage employees":
                employeesMenu();
                break;
            case "<-- EXIT":
                connection.end();
                break;
            default:
                startMenu();
                break;
        }
    }).catch(err => console.log(err));
}

function departmentsMenu() {
    // Departments menu options:
    // - View departments
    // - Add department
    // - Delete department
    // - View utilized budgets (bonus)
    // - Back to main menu

    inquirer.prompt({
        name: "choice",
        type: "list",
        message: "MANAGE DEPARTMENTS\nWhat would you like to do?",
        choices: [
            "View all departments",
            "Add a new department",
            "Delete a department",
            // "View utilized budgets by department",
            "<-- MAIN MENU"
        ]})
    .then((response) => {
        switch (response.choice) {
            case "View all departments":
                viewDepartments();
                break;
            case "Add a new department":
                addDepartment();
                break;
            case "Delete a department":
                deleteDepartment();
                break;
            // case "View utilized budgets by department":
            //     departmentBudgets();
            //     break;
            case "<-- MAIN MENU":
                startMenu();
                break;
            default:
                departmentsMenu();
                break;
        }
    }).catch(err => console.log(err));
}

function rolesMenu() {
    // Roles menu options:
    // - View roles
    // - Add role
    // - Delete role
    // - Back to main menu

    inquirer.prompt({
        name: "choice",
        type: "list",
        message: "MANAGE ROLES\nWhat would you like to do?",
        choices: [
            "View all roles",
            "Add a new role",
            "Delete a role",
            "<-- MAIN MENU"
        ]})
    .then((response) => {
        switch (response.choice) {
            case "View all roles":
                viewRoles();
                break;
            case "Add a new role":
                addRole();
                break;
            case "Delete a role":
                deleteRole();
                break;
            case "<-- MAIN MENU":
                startMenu();
                break;
            default:
                rolesMenu();
                break;
        }
    }).catch(err => console.log(err));
}

function employeesMenu() {
    // employees menu options:
    // - View employees
    // - Add employee
    // - Update employee
    // - Delete employee
    // - Back to main menu

    inquirer.prompt({
        name: "choice",
        type: "list",
        message: "MANAGE EMPLOYEES\nWhat would you like to do?",
        choices: [
            "View all employees",
            "Add a new employee",
            "Update an employee's information",
            "Delete an employee",
            "<-- MAIN MENU"
        ]})
    .then((response) => {
        switch (response.choice) {
            case "View all employees":
                viewEmployees();
                break;
            case "Add a new employee":
                addEmployee();
                break;
            case "Update an employee's information":
                updateEmployee();
                break;
            case "Delete an employee":
                deleteEmployee();
                break;
            case "<-- MAIN MENU":
                startMenu();
                break;
            default:
                departmentsMenu();
                break;
        }
    }).catch(err => console.log(err));
}


///// Manage Department functions

function viewDepartments() {
    // Print department table
    connection.query("SELECT id AS ID, name AS Department FROM department;", function(err, results) {
        if (err) throw err;
        console.table('Departments', results)
        departmentsMenu();
    })
}

function addDepartment() {
    // Prompt info, then add department to DB
    inquirer.prompt({
        type: 'input',
        name: 'department',
        message: 'What is the name of the department you\'d like to add?'
    })
    .then(function(response) {
        connection.query('INSERT INTO department (name) VALUES (?);', [response.department], (err) => {
            if (err) throw err;
            console.log("New department added (" + response.department + ")");
            departmentsMenu();
        })
    }).catch(err => console.log(err));
}

function deleteDepartment() {
    // Show list of departments, prompt id to delete, then delete department from DB
    connection.query('SELECT * FROM department;', function (err, results) {
        if (err) throw err;

        inquirer.prompt(
            {
              name: 'department',
              type: 'list',
              choices: function() {
                let choiceArray = [];
                for (let i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].id + ' ' + results[i].name);
                }
                return choiceArray;
              },
              message: 'Which department would you like to delete?'
            }
        )
        .then(function(response) {
            // Pull out the id of the department they're deleting
            let department;
            for (let i = 0; i < results.length; i++) {
              if ((results[i].id + ' ' + results[i].name) === response.department) {
                department = results[i];
              }
            }

            connection.query(
                'DELETE FROM department WHERE ?;', {id: department.id}, (err) => {
                if (err) throw err;
                console.log('Department deleted');
                departmentsMenu();
            })    
        }).catch(err => console.log(err));
    });
}

function departmentBudgets() {
    // Show list of departments, prompt id to show utilized budget, then calculate & show utilized budget
    console.log("departmentBudgets()");
    departmentsMenu();
}


///// Manage Role functions

function viewRoles() {
    // Print role table
    connection.query("SELECT role.id AS ID, title AS Title, salary AS Salary, name AS Department FROM role INNER JOIN department ON role.department_id = department.id;", function(err, results) {
        if (err) throw err;
        console.table('Roles', results)
        rolesMenu();
    })
}

function addRole() {
    // Prompt info, then add role to DB
    connection.query('SELECT * FROM department;', function (err, results) {
        if (err) throw err;

        inquirer.prompt([
            {
              name: 'title',
              type: 'input',
              message: 'What is the title for the role you\'re adding?'
            },
            {
              name: 'salary',
              type: 'input',
              message: 'What is the salary for the role you\'re adding?'
            },
            {
              name: 'department',
              type: 'list',
              choices: function() {
                let choiceArray = [];
                for (let i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].name);
                }
                return choiceArray;
              },
              message: 'What department would you like to create this role within?'
            }
        ])
        .then(function(response) {
            let department_id;
            for (let i = 0; i < results.length; i++) {
              if (results[i].name === response.department) {
                department_id = results[i].id;
              }
            }

            connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);', [response.title, response.salary, department_id], (err) => {
                if (err) throw err;
                console.log("New role added (" + response.title + ")");
                rolesMenu();
            })    
        }).catch(err => console.log(err));
    });
}

function deleteRole() {
    // Show list of roles, prompt id to delete, then delete role from DB
    connection.query('SELECT * FROM role;', function (err, results) {
        if (err) throw err;

        inquirer.prompt(
            {
              name: 'role',
              type: 'list',
              choices: function() {
                let choiceArray = [];
                for (let i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].id + ' ' + results[i].title);
                }
                return choiceArray;
              },
              message: 'Which role would you like to delete?'
            }
        )
        .then(function(response) {
            // Pull out the id of the role they're deleting
            let role;
            for (let i = 0; i < results.length; i++) {
              if ((results[i].id + ' ' + results[i].title) === response.role) {
                role = results[i];
              }
            }

            connection.query(
                'DELETE FROM role WHERE ?;', {id: role.id}, (err) => {
                if (err) throw err;
                console.log('Role deleted');
                rolesMenu();
            })    
        }).catch(err => console.log(err));
    });}


///// Manage Employee functions

function viewEmployees() {
    // Print employee table
    connection.query("SELECT employee.id AS ID, first_name AS First, last_name AS Last, manager_id AS Manager_ID, title AS Title, salary AS Salary, name AS Department FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;", function(err, results) {
        if (err) throw err;
        console.table('Employees', results)
        employeesMenu();
    })
}

function addEmployee() {
    // Prompt info, then add employee to DB
    connection.query('SELECT * FROM role;', function (err, results) {
        if (err) throw err;

        inquirer.prompt([
            {
              name: 'first_name',
              type: 'input',
              message: 'What is the employee\'s first name?'
            },
            {
              name: 'last_name',
              type: 'input',
              message: 'What is the employee\'s last name?'
            },
            {
              name: 'role',
              type: 'list',
              choices: function() {
                let choiceArray = [];
                for (let i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].title);
                }
                return choiceArray;
              },
              message: 'What is this employee\'s role?'
            }
        ])
        .then(function(response) {
            let role_id;
            for (let i = 0; i < results.length; i++) {
              if (results[i].title === response.role) {
                role_id = results[i].id;
              }
            }

            connection.query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?);', [response.first_name, response.last_name, role_id], (err) => {
                if (err) throw err;
                console.log('New employee added (' + response.first_name + ' ' + response.last_name + ')');
                employeesMenu();
            })    
        }).catch(err => console.log(err));
    });
}

function updateEmployee() {
    // Show list of employees, prompt id to update, show employee info, prompt what to update, then update employee in DB
    connection.query('SELECT * FROM employee;', function (err, results) {
        if (err) throw err;

        inquirer.prompt(
            {
              name: 'employee',
              type: 'list',
              choices: function() {
                let choiceArray = [];
                for (let i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].id + ' ' + results[i].first_name + ' ' + results[i].last_name);
                }
                return choiceArray;
              },
              message: 'Which employee would you like to update?'
            }
        )
        .then(function(response) {
            // Pull out the id of the employee they're updating
            let employee;
            for (let i = 0; i < results.length; i++) {
              if ((results[i].id + ' ' + results[i].first_name + ' ' + results[i].last_name) === response.employee) {
                employee = results[i];
              }
            }

            inquirer.prompt(
                {
                    name: 'action',
                    type: 'list',
                    choices: ['Role', 'Manager'],
                    message: 'What would you like to update?'
                }
            )
            .then(function(response) {
                switch (response.action) {
                    case 'Role':
                        updateEmployeeRole(employee);
                        break;
                    case 'Manager':
                        updateEmployeeManager(employee);
                        break;
                }
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    });
}

function updateEmployeeRole(employee) {
    connection.query('SELECT * FROM role;', function (err, results) {
        if (err) throw err;

        inquirer.prompt(
            {
              name: 'role',
              type: 'list',
              choices: function() {
                let choiceArray = [];
                for (let i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].title);
                }
                return choiceArray;
              },
              message: 'What is this employee\'s new role?'
            }
        )
        .then(function(response) {
            let new_id;
            for (let i = 0; i < results.length; i++) {
              if (results[i].title === response.role) {
                new_id = results[i].id;
              }
            }

            connection.query(
                'UPDATE employee SET ? WHERE ?;', 
                [
                    {
                        role_id: new_id
                    },
                    {
                        id: employee.id
                    }
                ], (err) => {
                if (err) throw err;
                console.log('Employee updated');
                employeesMenu();
            })    
        }).catch(err => console.log(err));
    });
}

function updateEmployeeManager(employee) {
    connection.query('SELECT * FROM employee;', function (err, results) {
        if (err) throw err;

        inquirer.prompt(
            {
              name: 'manager',
              type: 'list',
              choices: function() {
                let choiceArray = [];
                for (let i = 0; i < results.length; i++) {
                  if (results[i].id != employee.id) choiceArray.push(results[i].id + ' ' + results[i].first_name + ' ' + results[i].last_name);
                }
                return choiceArray;
              },
              message: 'Who is this employee\'s new manager?'
            }
        )
        .then(function(response) {
            let new_manager_id;
            for (let i = 0; i < results.length; i++) {
              if ((results[i].id + ' ' + results[i].first_name + ' ' + results[i].last_name) === response.manager) {
                new_manager_id = results[i].id;
              }
            }

            connection.query(
                'UPDATE employee SET ? WHERE ?;', 
                [
                    {
                        manager_id: new_manager_id
                    },
                    {
                        id: employee.id
                    }
                ], (err) => {
                if (err) throw err;
                console.log('Employee updated');
                employeesMenu();
            })    
        }).catch(err => console.log(err));
    });
}

function deleteEmployee() {
    // Show list of employees, prompt id to delete, then delete employee from DB
    connection.query('SELECT * FROM employee;', function (err, results) {
        if (err) throw err;

        inquirer.prompt(
            {
              name: 'employee',
              type: 'list',
              choices: function() {
                let choiceArray = [];
                for (let i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].id + ' ' + results[i].first_name + ' ' + results[i].last_name);
                }
                return choiceArray;
              },
              message: 'Which employee would you like to delete?'
            }
        )
        .then(function(response) {
            // Pull out the id of the employee they're updating
            let employee;
            for (let i = 0; i < results.length; i++) {
              if ((results[i].id + ' ' + results[i].first_name + ' ' + results[i].last_name) === response.employee) {
                employee = results[i];
              }
            }

            connection.query(
                'DELETE FROM employee WHERE ?;', {id: employee.id}, (err) => {
                if (err) throw err;
                console.log('Employee deleted');
                employeesMenu();
            })    
        }).catch(err => console.log(err));
    });
}