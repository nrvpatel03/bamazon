# bamazon
An amazon-like storefront using MySQL and Node.js

https://drive.google.com/file/d/1ZA4W6fdkN8InFN9fl8oTK4LlGwxM3f99/view 

## bamazonCustomer.js Application
The first part of the video above demonstrates this application.
This application shows the user a list of items from a database. The list of items
includes the item id, item name and price of each item. The user then selects the item id
he or she wishes to purchase. After selecting the id, the user then chooses the quantity he or she
wants to buy. At the end, the user is shown how much items they bought and their total cost.
The SQL database is also updated with the new stock quantity as shown in the video.

## bamazonManager.js Application
The second part of the video abobe demonstrates this application.
This application shows the user a list of four commands: View Products for Sale, View Low Inventory,
Add to Inventory, and Add a New Product.

#### View Products for Sale
Shows the user a list of the products for sale with the item id, item name and price.

#### View Low Inventory
Shows the user a list of the products that have a stock_quantity lower then 5. The item id,
item name and item stock quantity are displayed.

#### Add to Inventory
The user gets to choose the item id he or she wants to restock as well as the quantity to add to the stock.
Once the user chooses these, the application displays the new total stock quantity for the item restocked.
The SQL database is also updated with the new stock quantity.

#### Add a New Product
The user gets to add a new product to the store. The user is asked to input the product name, department name,
price and stock quantity for their new product. The database is then updated to now include this new product
into the store.