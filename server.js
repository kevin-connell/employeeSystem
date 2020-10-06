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

const addMenu = () => {
    inquirer.prompt([
        {
            name: "menuChoice",
            type: "list",
            choices: ["DEPARTMENT", "ROLE", "EMPLOYEE"],
            message: "What would you like to add?"
        }
    ]).then(({ menuChoice }) => {
        // add by menuChoice
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
                addRoles();
                break;

            case "EMPLOYEE":
                addEmployees();
                break;
        }
    });
};

const addEmployees = async (employeeObj) => {
    await db.createEmloyee(`(${employeeObj.first_name}, ${employeeObj.last_name}, blacccdsdsfg )`);
    console.log(employeeObj.first_name + " saved");
    mainMenu();
}

const addDepartments = async (deptObj) => {
    await db.createDepartment(deptObj);
    console.log(deptObj.name + " was successfully added")
    mainMenu();
}

const addRoles = async () => {
    const roles = await db.createRole();
    console.table(roles);
    mainMenu();
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

// const yearRangeSearch = () => {
// 	inquirer.prompt([
// 		{
// 			name: "startingYear",
// 			type: "input",
// 			message: "Starting year for search:"
// 		},
// 		{
// 			name: "endingYear",
// 			type: "input",
// 			message: "Ending year for search:"
// 		}
// 	]).then((responce) => {
// 		if (responce.endingYear >= responce.startingYear) {

// 			console.log(`Displaying results from ${responce.startingYear}-${responce.endingYear}:`);

// 			connection.query(`SELECT top5000.position, top5000.artist, top5000.song, top5000.year FROM top5000 WHERE top5000.year > ${parseInt(responce.startingYear) - 1} AND top5000.year < ${parseInt(responce.endingYear) + 1}`, function (err, songData) {
// 				if (err)
// 					throw err;

// 				top
// 				console.log();
// 				mainMenu()
// 			});
// 		} else {
// 			console.log("Input invalid!")
// 			mainMenu()
// 		};
// 	});
// };
