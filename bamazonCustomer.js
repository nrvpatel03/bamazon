
require("dotenv").config();
var inquirer = require("inquirer");
var mysql = require("mysql");
var chalk = require("chalk");
//testing
var connection = mysql.createConnection({
    host: process.env.DB_LOCALHOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

//side notes, prices are green, items are bold, ids are blue.
//function to display items from database then ask what they want to buy.
function start(){
    connection.query("SELECT * FROM products",function(error,result){
        if (error) throw error;
        for(var i=0; i<result.length; i++){
            console.log(chalk.blue("ID: " + result[i].item_id + "  ") + 
            chalk.bold(result[i].product_name) + 
            chalk.green("  Price: $" + result[i].price.toFixed(2)));
        }
        inquirer.prompt([
            {    
                type: "list",
                message: chalk.yellow("What is the ID of the item you want to buy?"),
                choices: function(){
                    var choicesArr = [];
                    for(var i = 0; i < result.length; i++){
                        choicesArr.push(result[i].item_id.toString());
                    }
                    return choicesArr;
                },
                name: "choiceID"
            },
            {
                type: "input",
                message: chalk.yellow("How many would you like to buy?"),
                validate: function(value){
                    if(isNaN(value) === false){
                        return true;
                    }
                    return false;
                },
                name: "quantity"
            }
        ]).then(function(response){
            console.log(response.choiceID);
            console.log(response.quantity);
            connection.end();
        });
    })
}
start();
//function to prompt user with id of what they want to buy and how many

