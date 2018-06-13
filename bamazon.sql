DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price NUMERIC(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Banana", "Produce", 0.59, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple", "Produce", 0.45, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Milk", "Dairy", 2.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cheese", "Dairy", 1.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bread", "Grains", 1.25, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cereal", "Grains", 1.80, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pasta", "Grains", 2.20, 13);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Eggs", "Dairy", 1.00, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ketchup", "Condiments", 0.80, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Broccoli", "Produce", 1.50, 30);
