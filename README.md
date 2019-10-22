# MySQL Bamazon
1.  This is a small Amazon-like storefront created with MySQL and Javascript. The program will be split into Two-part: Customer-View and Manager-View. The customers view will allow the user to take in orders from the store, delete stock from the store's inventory and output the total cost of the order. The Manager-View will be a bit more complex as its allow the user to manage the store by viewing the products on Sale, find items that are low on stock, add stock back to inventory, and adding a new Product entirely to the store.

2.  The app is split between two separate Javascript files, `bamazonCustomer.js` and `managerView.js`:
    a.  `BamazonCustomer.js` will first use Inquirer to ask the user what they would like to purchase. A for loop will be use match the user input with what on our table. After finding out what the user want and how much he will buy, the next step would be to update the table in MySQL.
    b.  `ManagerView.js` will also use Inquirer to ask what the user would like to do. A switch function will be use to forward the user request into different functions.

3.  Intructions and Screenshots:    
    * Copy and run the Bamazon.sql on your MySQL.
    * In the console, type `npm install` to install the require packages.
    * Type in `node bamazonCustomer.js` to run the first program.
    * A table of products should be display ![Product Table](/Images/Product-Table.PNG)
    * Enter the Item-ID and the amount you would like to purchase
        * The total price will be shown and the store Stock_quality will be update when we run the program again.
        * ![Item-ID and Total Price](/Images/purchase-price.PNG) 
    * If the store does not have enough stock, the app will log out cancel the purchase.
        * Noted: The apple Stock have decrease by 10 from the previous run. And the laptop Purchase have been cancel.
        * ![Fail Purchase](/Images/NoStock.PNG) 

    * Type in `managerView.js` to run the second program.
        * A List of option will be shown ![Manager Options](/Images/Option.PNG)
    * Select `View Products for Sale` will display the stock tables and ask the user what to do next
        * ![Stock Table](/Images/Stock_Table.PNG)
    * Select `View Low Inventory` will display all product that contain less than `50` stock
        * ![Low Stock](/Images/Low-Stock.PNG)
    * Select `Add Inventory` will ask the user what they would like to add.
        * ![Add Inventory](/Images/Add.PNG)
        * Select Desktop and add 10. ![Add10](/Images/Add10.PNG)
        * `View Product For Sale` again to see an update in Desktop
        * ![Stock Update](/Images/Stock-Update.PNG)
    * Select `Add New Products` and answer the questions
        * This will add a new Product "Dog Food" to the Table
        * ![New Product](/Images/NewProduct.PNG)

4.  Technologies used in the App:
    * MySQL
    * Inquirer
    * Node.js

5.  Created By: Tri Phan



