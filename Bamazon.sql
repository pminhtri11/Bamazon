DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
    item_id INTEGER NOT NULL,
    products_name VARCHAR (50) NOT NULL,
    department_name VARCHAR (50),
    price INTEGER NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);
INSERT INTO products (item_id, products_name,department_name,price,stock_quantity)
VALUES 
(1525, "Milk", "Grocery", 10, 500),
(2554, "Cell Phone", "Electronics", 800, 10 ),
(5644, "Laptop", "Electronics", 1000, 5),
(5246, "Lipstick", "Beauty", 50, 200),
(7462, "Nail Colors", "Beauty", 10, 500),
(6895, "Apple", "Grocery", 5, 1000 ),
(2676, "58 inch TV stand", "Home", 180, 50),
(2431, "Vacuum", "Home", 130, 20),
(1546, "Bed Platform", "Home", 250, 6),
(1785, "Desktop", "Home", 200, 10),
(8654, "Desk Lamp", "Home", 20, 50);

SELECT * FROM products;