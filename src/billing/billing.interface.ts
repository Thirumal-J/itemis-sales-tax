/**
 * Billing Related Interfaces
 */

 export enum categories {
    OTHERS = "others", 
    FOOD = "food", 
    MEDICINE = "medicine", 
    BOOKS = "books"
}

export enum validationStatus {
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"
}

export interface item {
  name: string;
  category: categories;
  price: number;
  quantity: number;
  isImported: boolean;
};

export interface itemBill {
    name:string;
    category:categories;
    price:number;
    quantity:number;
    isImported: boolean;
    priceWithTax: number;
    itemTax: number;
    taxPercentage:number;
}

export interface finalBill {
    totalItems: itemBill[];
    totalSalesTax: number;
    totalCost:number;
}
