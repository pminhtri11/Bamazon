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
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Products", "END"]
        }
    ]).then(function (answer) {
        switch (answer.choice) {
            case "View Products for Sale":
                productForSale();
                setTimeout(function () { start(); }, 1000);
                break;
            case "View Low Inventory":
                lowInventory();
                setTimeout(function () { start(); }, 1000);
                break;
            case "Add to Inventory":
                restock();
                break;
            case "Add New Products":
                newProduct();
                break;
            case "END":
                connection.end();
                break;
        }
    })
}

function productForSale() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.table(results);
    })
}

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 50",
        function (err, results) {
            if (err) throw err;
            console.table(results);
        })
}

function restock() {
    connection.query("SELECT * from products", function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "list",
                name: "choice",
                message: "What products would you like to restock?",
                choices: function () {
                    var choiceArray = []
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].products_name);
                    }
                    return choiceArray
                }
            },
            {
                name: "add",
                type: "number",
                message: "How many would you like to add?"
            }
        ]).then(function (answer) {
            var choosenProduct;
            for (var i = 0; i < results.length; i++) {
                if (results[i].products_name == answer.choice) {
                    choosenProduct = results[i];
                }
            }
            var addStock = choosenProduct.stock_quantity + answer.add;
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: addStock
                    },
                    {
                        products_name: choosenProduct.products_name
                    }
                ]
            )
            setTimeout(function () { start(); }, 1000);
        })
    })
}

function newProduct() {
    inquirer.prompt([
        {
            name: "addItem_id",
            type: "number",
            message: "What is the item ID?"
        },
        {
            name: "addItem_name",
            type: "input",
            message: "What is the item name?"
        },
        {
            name: "addDepartmentName",
            type: "input",
            message: "What is the Department name?"
        },
        {
            name: "addItemPrice",
            type: "number",
            message: "What is the item Price?"
        },
        {
            name: "addItemStock",
            type: "number",
            message: "What is the item stock?"
        }
    ]).then(function (answer) {
        var sql = "INSERT INTO products (item_id, products_name,department_name,price,stock_quantity) VALUE (?,?,?,?,?)";
        var values = [answer.addItem_id, answer.addItem_name, answer.addDepartmentName, answer.addItemPrice, answer.addItemStock];
        connection.query(sql, values, function (err, results) {
            if (err) throw err;
        });
        connection.query("SELECT * FROM products", function (err, results) {
            if (err) throw err;
            console.table(results);
        })
        setTimeout(function () { start(); }, 1000);
    });
}