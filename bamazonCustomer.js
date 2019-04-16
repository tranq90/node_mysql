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
                type: "input",
                message: "ID of item",
                name: "itemID"
            },
            {
                type: "input",
                message: "How many?",
                name: "itemAmount"
            }
        ])
        .then(function (result) {
            connection.query("SELECT * FROM products WHERE item_id =" + '"' + result.itemID + '"', function (err, response) {
                var inventory_stock = 0;
                var total_price = 0;
                for (var i = 0; i < response.length; i++) {
                    inventory_stock += response[i].stock_quantity;
                    total_price = response[i].price;
                }
                if (result.itemAmount > inventory_stock) {
                    console.log("We don't have enough in stock, sorry");
                    start();
                } else {
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: inventory_stock -= result.itemAmount
                            },
                            {
                                item_id: result.itemID
                            }
                        ],
                        function(err, stock_res){
                            console.log(inventory_stock + " left in stock");
                            console.log("Your total cost is $" + total_price*result.itemAmount);
                        }
                    )
                }
            })
        })
}
