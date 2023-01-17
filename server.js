// const express = require("express");
// const mysql = require("mysql2");
const inquirer = require("inquirer");
const db = require("./db/connection");
const logo = require("asciiart-logo");

require("console.table");

const init = () => {
  const logoText = logo({
    name: "employee manager",
  }).render();
  console.log(logoText);
  loadMainPrompt();
};

const loadMainPrompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add department",
          "Add role",
          "Add employee",
          "Update an employee's role",
          "Update an employee's manager",
          "View employees by manager",
          "View employees by department",
          "Remove department",
          "Remove role",
          "Remove employee",
          "Quit",
        ],
      },
    ])
    .then((answer) => {
      // add action/query functions when they are completed
      let choice = answer.choice;
      switch (choice) {
        case "View all departments":
          break;
        case "View all roles":
          break;
        case "View all employees":
          viewAllEmployees();

          break;
        case "Add department":
          break;
        case "Add role":
          break;
        case "Add employee":
          break;
        case "Update an employee's role":
          break;
        case "Update an employee's manager":
          break;
        case "View employees by manager":
          break;
        case "View employees by department":
          break;
        case "Remove department":
          break;
        case "Remove role":
          break;
        case "Remove employee":
          break;
        default:
          quit();
      }
    });
};

const viewAllEmployees = () => {
  const statement = `SELECT employee.id,
                     employee.first_name,
                     employee.last_name,
                     role.title AS title,
                     role.salary AS salary,
                     department.name AS department,
                     CONCAT(manager.first_name, " ", manager.last_name) AS manager 
                     FROM employee 
                     LEFT JOIN role ON employee.role_id = role.id 
                     LEFT JOIN department ON role.department_id
                     LEFT JOIN employee manager ON manager.id = employee.manager_id`;
  db.query(statement, (err, rows) => {
    if (err) {
      console.log(err);
    }
    // console.log("\n");
    console.log(rows);
    return loadMainPrompt();
  });
  // .findAllEmployees()
  // .then(([rows]) => {
  //   let employees = rows;
  //   console.log("\n");
  //   console.table(employees);
  // })
  // .then(() => {
  //   loadMainPrompt();
  // });
};

init();
