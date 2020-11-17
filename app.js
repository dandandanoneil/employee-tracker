const mysql = require("mysql");
const inquirer = require("inquirer");
require('dotenv').config();

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "employeeTracker_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    startMenu();
});

function startMenu() {
    // Start menu options:
    // - Manage departments (add, view, delete, budgets)
    // - Manage roles (add, view, delete)
    // - Manage employees (add, view, update, delete)
    // - Exit
}

function departmentsMenu() {
    // Departments menu options:
    // - View departments
    // - Add department
    // - Delete department
    // - View utilized budgets
    // - Back to main menu
}

function rolesMenu() {
    // Roles menu options:
    // - View roles
    // - Add role
    // - Delete role
    // - Back to main menu
}

function employeesMenu() {
    // employees menu options:
    // - View employees
    // - Add employee
    // - Update employee
    // - Delete employee
    // - Back to main menu
}