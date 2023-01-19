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
          "Add a department",
          "Add a role",
          "Add a employee",
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
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee's role":
          updateEmployee();
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
          console.log("hello!");
      }
    });
};

const viewAllDepartments = () => {
  const statement = `SELECT * FROM department`;
  db.query(statement, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.table(rows);
    return loadMainPrompt();
  });
};

const viewAllRoles = () => {
  const statement = `SELECT role.id,
                            role.title,
                            role.salary,
                            department.name AS department
                     FROM role
                     LEFT JOIN department ON role.department_id = department_id`;

  db.query(statement, (err, rows) => {
    if (err) {
      console.log(err);
    }

    console.table(rows);
    return loadMainPrompt();
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
    console.table(rows);
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

const addDepartment = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the department you would like to add?",
        validate(answer) {
          if (answer.length < 1) {
            return console.log("A department name is required.");
          } else {
            return true;
          }
        },
      },
    ])
    .then((answer) => {
      const statement = `INSERT INTO department (name) VALUES (?)`;
      const dptName = answer.name;
      db.query(statement, dptName, (err) => {
        if (err) {
          console.log(err);
        }
        console.log("Department added.");
        return viewAllDepartments();
      });
    });
};

const addRole = () => {};

const addEmployee = () => {};

const updateEmployee = () => {};

init();
