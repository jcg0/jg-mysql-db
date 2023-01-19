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
          "Add an employee",
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
        return loadMainPrompt();
      });
    });
};

const addRole = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the role?',
      validate(answer) {
        if (answer.length < 1) {
          return console.log('A role title is required.')
        } else {
          return true
        }
      }
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary for the role?',
      validate(answer) {
        if(answer < 0) {
          return console.log('A salary for this role is required.')
        } else {
          return true;
        }
      }
    }
  ])
  .then((answer) => {
    const roleSelections = [answer.title, answer.salary];
    const statement = `SELECT * FROM department`;
    db.query(statement, (err, rows) => {
      if(err){
        console.log(err);
      }
      const dpts = rows.map(({name, id}) => ({name: name, value: id}));
      inquirer.prompt([
        {
          type: 'list',
          name: 'department',
          message: 'What department does this role belong to?',
          choices: dpts
        }
      ])
      .then((dptAnswer) => {
        const dpt = dptAnswer.dpt;
        roleSelections.push(dpt);
        const statement = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        db.query(statement, roleSelections, (err) => {
          if(err) {
            console.log(err);
          }
          console.log('New role added.')
          return loadMainPrompt();
        })
      })
    })
  })
};

const addEmployee = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the first name of this employee?',
      validate(answer){
        if(answer.length < 1){
          console.log('A first name is required.')
        } else {
          return true;
        }
      }
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the last name of this employee?',
      validate(answer){
        if(answer.length < 1){
          console.log('A last name is required.')
        } else {
          return true;
        }
      }
    }
  ])
  .then((answer) => {
    const names = [answer.first_name, answer.last_name];
    const statement = `SELECT * FROM role`;
    db.query(statement, (err, rows) => {
      if(err){
        console.log(err)
      }
      const roles = rows.map(({title, id}) => ({name: title, value:id}))
      inquirer.prompt([
        {
          type: 'list',
          name: 'roles',
          message: 'What role does this employee serve?',
          choices: roles
        }
      ])
      .then((roleAnswer) => {
        const role = roleAnswer.role;
        names.push(role);
        const statement = `SELECT * FROM employee`;
        db.query(statement, (err, rows) => {
          if(err){
            console.log(err)
          }
          const managerList = rows.map(({last_name, first_name, id}) => ({name: `${first_name} ${last_name}`, value: id}))
          inquirer.prompt([
            {
              type: 'list',
              name: 'manager',
              message: "Who is this employee's manager?",
              choices: managerList
            }
          ])
          .then((managerAnswer) => {
            const manager = managerAnswer.manager;
            names.push(manager);
            const statement = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
            db.query(statement, names, (err) => {
              if(err){
                console.log(err);
              }
              console.log('New employee added.');
              return loadMainPrompt();
            })
          })
        })
      })
    })
  })
};

const updateEmployee = () => {};

init();
