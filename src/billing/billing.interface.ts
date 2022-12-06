/**
 * Billing Related Interfaces
 */

 export enum Categories {
    OTHERS = "others", 
    FOOD = "food", 
    MEDICINE = "medicine", 
    BOOKS = "books"
}

export interface Item {
  name: string;
  category: Categories;
  price: number;
  quantity: number;
  isImported: boolean;
};

export interface ItemBill {
    name:string;
    category:Categories;
    price:number;
    quantity:number;
    isImported: boolean;
    priceWithTax: number;
    itemTax: number;
    taxPercentage:number;
}

export interface TotalBill {
    totalItems: ItemBill[];
    totalSalesTax: number;
    totalPrice:number;
}
