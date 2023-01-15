// const express = require("express");
// const mysql = require("mysql2");
const { prompt } = require("inquirer");
const db = require("./db/query");
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
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "view all employees",
          value: "VIEW_EMPLOYEES",
        },
      ],
    },
  ]).then((res) => {
    let choice = res.choice;
    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      default:
        quit();
    }
  });
};

const viewEmployees = () => {
  db.query
    .findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => {
      loadMainPrompt();
    });
};

init();
