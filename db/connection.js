const util = require("util");
const mysql = require("mysql");

//create connection
const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "Th1s1sn3w",
	database: "eSys_db"
});
connection.connect();

//promisfy utils package
connection.query = util.promisify(connection.query);

//export for use in db class
module.exports = connection;