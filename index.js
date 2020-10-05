const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: ""
});

connection.connect(err => {
	if (err)
		throw err;

	mainMenu();
});

const mainMenu = () => {
	inquirer.prompt([
		{
			name: "menuChoice",
			type: "list",
			choices: ["VIEW", "ADD", "UPDATE", "DELETE", "EXIT"],
			message: "Please choose a metheod to search by:"
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
				connection.end();
		}
	});
};

const viewMenu = () => {
	inquirer.prompt([
		{
			name: "menuChoice",
			type: "list",
			choices: ["DEPARTMENT", "ROLE", "EMPLOYEE"],
			message: "Please choose a metheod to search by:"
		}
	]).then(({ menuChoice }) => {
		// search by menuChoice


		mainMenu()
	});
};

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


		mainMenu()
	});
};

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
