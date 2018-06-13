
require("dotenv").config();
var inquirer = require("inquirer");
var mysql = require("mysql");
var chalk = require("chalk");
var asTable = require("as-table");

var connection = mysql.createConnection({
    host: process.env.DB_LOCALHOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});
start();
function start(){
    inquirer.prompt([
        {
            type: "list",
            choices: ["View Products for Sale",
            "View Low Inventory", "Add to Inventory",
            "Add a New Product"],
            message: chalk.blue("What would you like to do?"),
            name: "initialChoice"
        }
    ]).then(function(response){
        switch(response.initialChoice){
            case "View Products for Sale":
            //function
            break;
            case "View Low Inventory":
            //function
            break;
            case "Add to Inventory":
            //function
            break;
            case "Add a New Product":
            //function
            break;
            default:
            break;
        }
    })
}
function viewProdsForSale(){

}
function viewLowInv(){

}
function addToInv(){

}
function addNewProd(){

}