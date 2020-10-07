//const mysql = require("mysql");
const inquirer = require("inquirer");
const db = require("./db");
require("console.table");

///connection.connect(err => {
//if (err)
//throw err;

//});

const mainMenu = () => {
    inquirer.prompt([
        {
            name: "menuChoice",
            type: "list",
            choices: ["VIEW", "ADD", "UPDATE", "DELETE", "EXIT"],
            message: "What would you like to do?"
        }
    ]).then(({ menuChoice }) => {
        switch (menuChoice) {
            case "VIEW":
                viewMenu();
                break;
            case "ADD":
                addMenu();
                break;
            case "UPDATE":
                updateMenu();
                break;
            case "DELETE":
                deleteMenu();
                break;
            default:
                db.connection.end();
        }
    });
};

mainMenu();

const viewMenu = () => {
    inquirer.prompt([
        {
            name: "menuChoice",
            type: "list",
            choices: ["ALL EMPLOYEES", "ROLES", "DEPARTMENTS"],
            message: "Please choose a metheod to search by:"
        }
    ]).then(({ menuChoice }) => {
        // search by menuChoice
        switch (menuChoice) {
            case "ALL EMPLOYEES":
                viewEmployees();
                break;

            case "ROLES":
                viewRoles();
                break;

            case "DEPARTMENTS":
                viewDepartments();
                break;
        }
    });
};

const viewEmployees = async () => {
    const employees = await db.AllEmloyees();
    console.table(employees);
    mainMenu();
}

const viewDepartments = async () => {
    const departments = await db.AllDepartments();
    console.table(departments);
    mainMenu();
}

const viewRoles = async () => {
    const roles = await db.AllRoles();
    console.table(roles);
    mainMenu();
}

const addMenu = async () => {
    let dArr = await arrayDepartments()
    console.log(dArr)
    let rArr = await arrayRoles()
    console.log(rArr)
    let eArr = await arrayEmployees()
    console.log(eArr)

    inquirer.prompt([
        {
            name: "menuChoice",
            type: "list",
            choices: ["DEPARTMENT", "ROLE", "EMPLOYEE"],
            message: "What would you like to add?"
        }
    ]).then(({ menuChoice }) => {
        switch (menuChoice) {
            case "DEPARTMENT":
                inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "What is the name of the department?"
                    }
                ]).then((answer) => {
                    addDepartments(answer);
                });
                break;

            case "ROLE":
                if (dArr.length > 0) {
                    inquirer.prompt([
                        {
                            name: "title",
                            type: "input",
                            message: "What is the name of the role?"
                        },
                        {
                            name: "salary",
                            type: "input",
                            message: "What is the yearly salary of this role?"
                        }, 
                        {
                            name: "department_id",
                            type: "list",
                            choices: dArr,
                            message: "Of which department does it belong?"
                        }
                    ]).then((answer) => {
                        addRoles(answer);
                    });
                }else{
                    console.log("There are no departments to add a role to. Please add a DEPARTMENT before adding a ROLE!");
                    addMenu()
                }
                break;

            case "EMPLOYEE":
                if (rArr.length > 0) {
                    inquirer.prompt([
                        {
                            name: "first_name",
                            type: "input",
                            message: "What is their first name?"
                        },
                        {
                            name: "last_name",
                            type: "input",
                            message: "What is their last name?"
                        }, 
                        {
                            name: "role_id",
                            type: "list",
                            choices: rArr,
                            message: "Of which role do the take?"
                        },
                        {
                            name: "manager_id",
                            type: "list",
                            choices: eArr,
                            message: "Who is their manager?"
                        }
                    ]).then((answer) => {
                        addEmployees(answer);
                    });
                }else{
                    console.log("There are no roles to fill. Please add a ROLE before adding an EMPLOYEE!");
                    addMenu()
                }
                break;
        }
    });
};

const addDepartments = async (deptObj) => {
    await db.createDepartment(deptObj);
    console.log(deptObj.name + " was added")
    mainMenu();
}

const arrayDepartments = async () => {
    let departmentList = await db.listDepartments();
    departmentList = JSON.stringify(departmentList);
    departmentList = JSON.parse(departmentList);
    return departmentList;
}

const addRoles = async (roleObj) => {
    await db.createRole(roleObj);
    console.log(roleObj.name + " was added")
    mainMenu();
}

const arrayRoles = async () => {
    let roleList = await db.listRoles();
    roleList = JSON.stringify(roleList);
    roleList = JSON.parse(roleList);
    return roleList;
}

const addEmployees = async (employeeObj) => {
    await db.createEmployee(employeeObj);
    console.log(employeeObj.first_name + " " + employeeObj.last_name + " was added");
    mainMenu();
}

const arrayEmployees = async () => {
    let employeeList = await db.listEmployees();
    employeeList = JSON.stringify(employeeList);
    employeeList = JSON.parse(employeeList);
    return employeeList;
}

const updateMenu = () => {
    inquirer.prompt([
        {
            name: "menuChoice",
            type: "list",
            choices: ["MANAGER", "ROLE"],
            message: "What would you like to update?"
        }
    ]).then(({ menuChoice }) => {
        // update by menuChoice


        mainMenu()
    });
};

const deleteMenu = () => {
    inquirer.prompt([
        {
            name: "menuChoice",
            type: "list",
            choices: ["DEPARTMENT", "ROLE", "EMPLOYEE"],
            message: "What would you like to update?"
        }
    ]).then(({ menuChoice }) => {
        // delete by menuChoice


        mainMenu()
    });
};
