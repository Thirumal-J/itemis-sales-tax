## Given Requirement:
------------------

Basic sales tax is applicable at a rate of 10% on all goods, except books, food, and medical products, that are exempt. Import duty is an additional sales tax applicable on all imported goods at a rate of 5%, with no exemptions. When I purchase items, I receive a receipt which lists the name of all the items and their price (including tax), finishing with the total cost of the items and the total amounts of sales taxes paid. The rounding rules for sales tax are that for a tax rate of n%, a shelf price of p contains (np/100 rounded up to the nearest 0.05) amount of sales tax.

Sample Input:
-------------

#### Input 1:

1 book at 12.49\
1 music CD at 14.99\
1 chocolate bar at 0.85

#### Output 1:

1 book: 12.49\
1 music CD: 16.49\
1 chocolate bar: 0.85\
Sales Taxes: 1.50\
Total: 29.83

#### Input 2:

1 imported box of chocolates at 10.00\
1 imported bottle of perfume at 47.50

#### Output 2:

1 imported box of chocolates: 10.50\
1 imported bottle of perfume: 54.65\
Sales Taxes: 7.65\
Total: 65.15

#### Input 3:

1 imported bottle of perfume at 27.99\
1 bottle of perfume at 18.99\
1 packet of headache pills at 9.75\
1 box of imported chocolates at 11.25

#### Output 3:

1 imported bottle of perfume: 32.19\
1 bottle of perfume: 20.89\
1 packet of headache pills: 9.75\
1 imported box of chocolates: 11.85\
Sales Taxes: 6.70\
Total: 74.68

## Assumptions
-----------------

The following assumptions were made based on the conditions, input and output.

1\. Input and Output are designed in JSON format.

2\. The input object is considered like a shopping cart with multiple items purchased.

3\. Input = array of items purchased. And each purchase 'item' is assumed to have the following attributes: name, category, quantity, price, isImported.

-   category of the input object is assumed to have only 4 values: 'food', 'medicine', 'books', 'others'
-   basic sales tax exemption is maintained in an array, so it can be updated if needed.

4\. Output object is assumed to return with the following attributes: totalItems, totalSalesTax, totalCost.

-   totalItems: an array of itemBill. Each itemBill have all the input attributes of the item, along with priceWithTax, itemTax, taxPercentage
-   totalSalesTax: sum of all itemTax
-   totalCost: sum of all priceWithTax of all items

## Steps to access the application:

1. git clone https://github.com/Thirumal-J/sales-tax.git
2. Open the the repository folder in Visual studio code or using a terminal. Use the following command to change directory via terminal if necessary:

`` cd sales-tax``

Once the above steps are done, use any of the following methods to access the application.

#### Method 1 - Using Docker
1. If you have docker installed (tested with Docker version 20.10.21), Open terminal and run the following commands:

``sudo docker build -t sales-tax-app .``

2. Above command will install all the required packages and creates a docker image.

3. Run the following command to run and check all the test cases for the application:

``sudo docker run sales-tax-app:latest``

4. Now you can see all the test cases result.

#### Method 2 - Using NPM
1. Open terminal and use the following command: 

``npm install``

2. Once all the necassary packages got imported, run the following command to run all the test-cases for the project:

``npm test``

3. Now you can see all the test cases result.

#### Method 3 - Using NPM and Postman
1.  Open terminal and use the following command: 

``npm install``

2. Once all the necassary packages got imported, run the following command to start the application:

``npm start``

3. Now, you can use the postman app to access the API for calculating the bill.

Sample API:\
`` URL : http://localhost:5000/calculate-bill ``\
`` HTTP METHOD : POST ``\
``PAYLOAD : [
    {
        "name": "book",
        "category": "books",
        "price": 12.49,
        "quantity": 1,
        "isImported": false
    },
    {
        "name": "music CD",
        "category": "others",
        "price": 14.99,
        "quantity": 1,
        "isImported": false
    },
    {
        "name": "chocolate bar",
        "category": "food",
        "price": 0.85,
        "quantity": 1,
        "isImported": false
    }
] ``

4. Once you send the api request you will see the following response:

``Status Code : 200``\
``Respose Body :``\
``{
    "totalItems": [
        {
            "name": "book",
            "category": "books",
            "price": 12.49,
            "quantity": 1,
            "isImported": false,
            "priceWithTax": 12.49,
            "itemTax": 0,
            "taxPercentage": 0
        },
        {
            "name": "music CD",
            "category": "others",
            "price": 14.99,
            "quantity": 1,
            "isImported": false,
            "priceWithTax": 16.49,
            "itemTax": 1.5,
            "taxPercentage": 10
        },
        {
            "name": "chocolate bar",
            "category": "food",
            "price": 0.85,
            "quantity": 1,
            "isImported": false,
            "priceWithTax": 0.85,
            "itemTax": 0,
            "taxPercentage": 0
        }
    ],
    "totalSalesTax": 1.5,
    "totalCost": 29.83
}``
