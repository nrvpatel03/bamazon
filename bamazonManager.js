
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
            viewProdsForSale();
            break;
            case "View Low Inventory":
            viewLowInv();
            break;
            case "Add to Inventory":
            addToInv();
            break;
            case "Add a New Product":
            addNewProd();
            break;
            default:
            break;
        }
    })
}

function viewProdsForSale(){
    connection.query("SELECT * FROM products",function(error,result){
        if (error) throw error;
        var objectArr = [];
        for(var i = 0; i < result.length; i++){
            var tableObject =
            {
                ID: chalk.blue(result[i].item_id),
                Name: chalk.bold(result[i].product_name),
                Price: chalk.green("$" + result[i].price.toFixed(2))
            }
            objectArr.push(tableObject);
        }
        console.log(asTable(objectArr));
        inquirer.prompt([
            {
                type: "list",
                message: "Would you like to do something else?",
                choices: ["Yes","No"],
                name: "goAgainChoice"
            }
        ]).then(function(choice){
            if(choice.goAgainChoice === "Yes"){
                start();
            }else{
                console.log("Thanks for doing Manager stuff!");
                connection.end();
            }
        })
    })
}



function viewLowInv(){

}
function addToInv(){

}
function addNewProd(){

}
start();