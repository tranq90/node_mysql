var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
})

function start() {
    inquirer
        .prompt([
            {
                name: "choice",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "View products for Sale",
                    "View Low Inventory",
                    "Add to Inventory",
                    "Add New Product"
                ]
            }
        ])
        .then(function (result) {
            switch (result.choice) {
                case "View products for Sale":
                    forSale();
                    break;

                case "View Low Inventory":
                    lowInventory();
                    break;

                case "Add to Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    addProduct();
                    break;
            }
        });
}

function forSale() {
    connection.query("SELECT * FROM products;", function (err, response) {
        console.log(response);
    });
}

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < '5';", function (err, response) {
        console.log(response);
        connection.end();
    });
}

function addInventory() {
    inquirer
        .prompt([
            {
                name: "itemID",
                type: "input",
                message: "Enter Item ID"
            },
            {
                name: "itemAmount",
                type: "input",
                message: "How much inventory to add"
            }
        ])
        .then(function (result) {
            connection.query("SELECT * FROM products WHERE item_id =" + '"' + result.itemID + '"', function (err, response) {
                var inventory_stock = 0;
                for (var i = 0; i < response.length; i++) {
                    inventory_stock += response[i].stock_quantity;
                }
                var hello1 = parseFloat(inventory_stock);
                var hello2 = parseFloat(result.itemAmount);
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: hello1 += hello2
                        },
                        {
                            item_id: result.itemID
                        }
                    ],
                    function (err, stockres) {
                        connection.end();
                    }
                )
            })
        })
}

function addProduct() {
    inquirer
        .prompt([
            {
                name: "itemName",
                type: "input",
                message: "Name of item"
            },
            {
                name: "deptName",
                type: "input",
                message: "Name of department"
            },
            {
                name: "itemPrice",
                type: "input",
                message: "Price"
            },
            {
                name: "itemStock",
                type: "input",
                message: "Stock"
            }
        ])
        .then(function (result) {
            connection.query("INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES (? ? ? ?)",
                [
                    result.itemName, result.deptName, result.itemPrice, result.itemStock
                ],
                function(err, response){
                    console.log(err);
                    connection.end();
                }
            )
        })
}