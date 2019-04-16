DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DOUBLE,
    stock_quantity INT,
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("hello1", "dept1", 10.10, 5);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("hello2", "dept2", 11.11, 3);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("hello3", "dept3", 12.12, 2);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("hello4", "dept4", 13.13, 1);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("hello5", "dept5", 14.14, 0);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("hello6", "dept6", 15.15, 6);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("hello7", "dept7", 16.18, 8);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("hello8", "dept8", 17.17, 9);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("hello9", "dept9", 18.18, 9);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES("hello10", "dept10", 19.19, 5);