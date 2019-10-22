var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "trichi123",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
})

function start() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.table(results);
        inquirer.prompt([
            {
                name: "firstChoice",
                type: "number",
                message: "What is the ID of the product you like to buy?"
            },
            {
                name: "SecondChoice",
                type: "number",
                message: "How much would you like to buy?"
            }
        ]).then(function (answer) {
            var choosenProduct;
            for (var i = 0; i < results.length; i++) {
                if (results[i].item_id == answer.firstChoice) {
                    choosenProduct = results[i];                    
                }
            }
            if (choosenProduct == null)
            {
                console.log("Unable to find product, please enter again ")
                connection.end();
            }
            if (choosenProduct.stock_quantity < answer.SecondChoice) {
                console.log("We don't have enough stock, please choose again!")
                connection.end();
            }
            else if (choosenProduct.stock_quantity >= answer.SecondChoice) {
                var remain = choosenProduct.stock_quantity - answer.SecondChoice;
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: remain
                        },
                        {
                            item_id: choosenProduct.item_id,
                        }
                    ]
                )
                console.log("Your total due are: $" + answer.SecondChoice * choosenProduct.price);
            }
        })
    })
}

