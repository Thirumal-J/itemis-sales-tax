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

Assumptions
-----------

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
