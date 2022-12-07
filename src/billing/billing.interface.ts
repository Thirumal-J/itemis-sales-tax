/**
 * Billing Related Interfaces
 */

export enum Categories {
  OTHERS = "others",
  FOOD = "food",
  MEDICINE = "medicine",
  BOOKS = "books",
}

export interface Item {
  name: string;
  category: Categories;
  price: number;
  quantity: number;
  isImported: boolean;
}

export interface ItemBill extends Item {
  taxPercentage: number;
  itemTax: number;
  priceWithTax: number;
}

export interface TotalBill {
  totalItems: ItemBill[];
  totalSalesTax: number;
  totalPrice: number;
}
