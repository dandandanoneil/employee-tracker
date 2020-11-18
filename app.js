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
    console.log('     _______  __   __  _______  ___      _______  __   __  _______  _______ \n    |       ||  |_|  ||       ||   |    |       ||  | |  ||       ||       |\n    |    ___||       ||    _  ||   |    |   _   ||  |_|  ||    ___||    ___|\n    |   |___ |       ||   |_| ||   |    |  | |  ||       ||   |___ |   |___ \n    |    ___||       ||    ___||   |___ |  |_|  ||_     _||    ___||    ___|\n    |   |___ | ||_|| ||   |    |       ||       |  |   |  |   |___ |   |___ \n    |_______||_|   |_||___|    |_______||_______|  |___|  |_______||_______|\n     ______   _______  _______  _______                                     \n    |      | |   _   ||       ||   _   |                                    \n    |  _    ||  |_|  ||_     _||  |_|  |                                    \n    | | |   ||       |  |   |  |       |                                    \n    | |_|   ||       |  |   |  |       |                                    \n    |       ||   _   |  |   |  |   _   |                                    \n    |______| |__| |__|  |___|  |__| |__|                                    \n     __   __  _______  __    _  _______  _______  _______  ______           \n    |  |_|  ||   _   ||  |  | ||   _   ||       ||       ||    _ |          \n    |       ||  |_|  ||   |_| ||  |_|  ||    ___||    ___||   | ||          \n    |       ||       ||       ||       ||   | __ |   |___ |   |_||_         \n    |       ||       ||  _    ||       ||   ||  ||    ___||    __  |        \n    | ||_|| ||   _   || | |   ||   _   ||   |_| ||   |___ |   |  | |        \n    |_|   |_||__| |__||_|  |__||__| |__||_______||_______||___|  |_|        ')
    startMenu();
});

function startMenu() {
    // Start menu options:
    // - Manage departments (add, view) (bonus: delete, budgets)
    // - Manage roles (add, view) (bonus: delete)
    // - Manage employees (add, view, update) (bonus: delete)
    // - Exit

    console.log(" ********************* \n *     MAIN MENU     * \n ********************* ");
    inquirer.prompt({
        name: "choice",
        type: "list",
        message: "What would you like to do?",
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
    // - Delete department (bonus)
    // - View utilized budgets (bonus)
    // - Back to main menu

    console.log(" ********************** \n * MANAGE DEPARTMENTS * \n **********************");
    inquirer.prompt({
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "Add a new department",
            // "Delete a department",
            // "View utilized budgets by department",
            "<-- BACK TO MAIN MENU"
        ]})
    .then((response) => {
        switch (response.choice) {
            case "View all departments":
                viewDepartments();
                break;
            case "Add a new department":
                addDepartment();
                break;
            // case "Delete a department":
            //     deleteDepartment();
            //     break;
            // case "View utilized budgets by department":
            //     departmentBudgets();
            //     break;
            case "<-- BACK TO MAIN MENU":
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
    // - Delete role (bonus)
    // - Back to main menu

    console.log(" ********************** \n *    MANAGE ROLES    * \n **********************");
    inquirer.prompt({
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all roles",
            "Add a new role",
            // "Delete a roles",
            "<-- BACK TO MAIN MENU"
        ]})
    .then((response) => {
        switch (response.choice) {
            case "View all roles":
                viewRoles();
                break;
            case "Add a new role":
                addRole();
                break;
            // case "Delete a role":
            //     deleteRole();
            //     break;
            case "<-- BACK TO MAIN MENU":
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
    // - Delete employee (bonus)
    // - Back to main menu

    console.log(" ********************** \n *  MANAGE EMPLOYEES  * \n **********************");
    inquirer.prompt({
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all employees",
            "Add a new employee",
            "Update an employee's information",
            // "Delete an employee",
            "<-- BACK TO MAIN MENU"
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
            // case "Delete an employee":
            //     deleteEmployee();
            //     break;
            case "<-- BACK TO MAIN MENU":
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
    console.log("viewDepartments()");
    departmentsMenu();
}

function addDepartment() {
    // Prompt info, then add department to DB
    console.log("addDepartment()");
    departmentsMenu();
}

function deleteDepartment() {
    // Show list of departments, prompt id to delete, then delete department from DB
    console.log("deleteDepartment()");
    departmentsMenu();
}

function departmentBudgets() {
    // Show list of departments, prompt id to show utilized budget, then calculate & show utilized budget
    console.log("departmentBudgets()");
    departmentsMenu();
}


///// Manage Role functions

function viewRoles() {
    // Print role table
    console.log("viewRoles()");
    rolesMenu();
}

function addRole() {
    // Prompt info, then add role to DB
    console.log("addRole()");
    rolesMenu();
}

function deleteRole() {
    // Show list of roles, prompt id to delete, then delete role from DB
    console.log("deleteRole()");
    rolesMenu();
}


///// Manage Employee functions

function viewEmployees() {
    // Print employee table
    console.log("viewEmployees()");
    employeesMenu();
}

function addEmployee() {
    // Prompt info, then add employee to DB
    console.log("addEmployee()");
    employeesMenu();
}

function updateEmployee() {
    // Show list of employees, prompt id to update, show employee info, prompt what to update, then update employee in DB
    console.log("updateEmployee()");
    employeesMenu();
}

function deleteEmployee() {
    // Show list of employees, prompt id to delete, then delete employee from DB
    console.log("deleteEmployee()");
    employeesMenu();
}