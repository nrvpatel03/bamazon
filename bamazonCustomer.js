
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
    connection.query("SELECT * FROM products",function(error, result){
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
            var numQuantity = parseInt(response.quantity);
            connection.query(
                "SELECT stock_quantity,price,product_name FROM products WHERE ?",
                {
                    item_id: response.choiceID
                },
                function(error, selected){
                    if (error) throw error;
                    var data = selected[0];
                    if(numQuantity > data.stock_quantity){
                        console.log(chalk.red("INSUFFICIENT QUANTITY PLEASE TRY AGAIN"));
                        askAgain();
                        //connection.end();
                    }else{
                        updateQuantity(response.choiceID, numQuantity,
                        data.stock_quantity, data.price, data.product_name);
                    }
                })
        });
    })
}

function updateQuantity(userChoiceId, userQuantity, 
    stockQuan, itemPrice, item_Name){
    var updateQuantity = stockQuan - userQuantity;
    connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: updateQuantity
            },
            {
                item_id: userChoiceId
            }
        ],function(error){
            if(error) throw error;
            var total = parseFloat(itemPrice) * userQuantity;

            console.log(chalk.bold("TOTAL COST FOR THE ITEM(S): ") 
                + chalk.green("$" +total.toFixed(2)));

            console.log("YOU BOUGHT " + chalk.blue(userQuantity) 
                + " " + chalk.yellow(item_Name 
                + "(s)"));

            askAgain();
        })
}
function askAgain(){
    inquirer.prompt([
        {
            type: "list",
            choices: ["Yes","No"],
            message: "Would you like to buy another item?",
            name: "again"
        }
    ]).then(function(response){
        if(response.again === "Yes"){
            start();
        }else{
            console.log("Thanks for shopping!");
            
            connection.end();
        }
    })
}
start();
