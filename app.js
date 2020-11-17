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
    console.log(' ********************************* \n *     Employee Data Manager     * \n ********************************* ');
    startMenu();
});

function startMenu() {
    // Start menu options:
    // - Manage departments (add, view, delete, budgets)
    // - Manage roles (add, view, delete)
    // - Manage employees (add, view, update, delete)
    // - Exit

    console.log(" * MAIN MENU *");
    inquirer.prompt({
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Manage departments (view all, add new, delete existing, or view budget utilization)",
            "Manage roles (view all, add new, or delete existing)",
            "Manage employees (view all, add new, modify existing, or delete existing)",
            "Exit"
        ]})
    .then((response) => {
        switch (response.choice) {
            case "Manage departments (view all, add new, delete existing, or view budget utilization)":
                departmentsMenu();
                break;
            case "Manage roles (view all, add new, or delete existing)":
                rolesMenu();
                break;
            case "Manage employees (view all, add new, modify existing, or delete existing)":
                employeesMenu();
                break;
            case "Exit":
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
    // - View utilized budgets
    // - Back to main menu

    console.log(" * MANAGE DEPARTMENTS *");
    inquirer.prompt({
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "Add a new department",
            "Delete a department",
            "View utilized budgets by department",
            "Back to main menu"
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
            case "View utilized budgets by department":
                departmentBudgets();
                break;
            case "Back to main menu":
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

    console.log(" * MANAGE ROLES *");
    inquirer.prompt({
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all roles",
            "Add a new role",
            "Delete a roles",
            "Back to main menu"
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
            case "Back to main menu":
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

    console.log(" * MANAGE EMPLOYEES *");
    inquirer.prompt({
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all employees",
            "Add a new employee",
            "Update an employee's information",
            "Delete an employee",
            "Back to main menu"
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
            case "Back to main menu":
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