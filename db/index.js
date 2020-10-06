//require connection
const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    //functions that will get data from the DB
    AllEmloyees() {
        return this.connection.query(
            `
            SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;
            `
        );
    };

    AllDepartments() {
        return this.connection.query(
            `SELECT department.name AS departments FROM department`
        );
    }

    AllRoles() {
        return this.connection.query(
            `SELECT role.title, role.salary, department.name AS department FROM role LEFT JOIN department on role.department_id = department.id`
        );
    }


    createEmployee(input) {
        return this.connection.query("INSERT INTO employee SET ?", input);
    }

    createDepartment(input) {
        console.log(input)
        return this.connection.query("INSERT INTO department SET ?", input);
    }

    removeEmployee(employeeId) {
        return this.connection.query(
        "DELETE FROM employee WHERE id = ?",
        employeeId
        );
    }

    updateEmployeeRole(employeeId, roleId) {
        return this.connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [roleId, employeeId]
        );
    }

}

module.exports = new DB(connection);