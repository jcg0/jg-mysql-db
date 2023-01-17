const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  findAllEmployees() {
    return this.connection.promise().query(
      `SELECT employee.id,
              employee.first_name,
              employee.last_name,
              role.title AS title,
              role.salary AS salary,
              department.name AS department,
              CONCAT(manager.first_name, " ", manager.last_name) AS manager 
              FROM employee 
              LEFT JOIN role ON employee.role_id = role.id 
              LEFT JOIN department ON role.department_id
              LEFT JOIN employee manager ON employee.manager.id = manager_id`
    );
  }
}

module.exports = new DB(connection);
