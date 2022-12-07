/**
 * All the business logic of billing will be here
 */
import Utils from "../utils";
import { AppConstants } from "./../common/common.constants";
import { Categories, Item, ItemBill, TotalBill } from "./billing.interface";

class BillingService {
  /**
   * @description Calculates the total bill of the given items
   * @param items Array of items
   * @returns     Total Bill of all items with calculated sales tax, cost and separate item bills
   */
  calculateBill(items: Item[]): TotalBill {
    const totalBill: TotalBill = {
      totalItems: [],
      totalSalesTax: 0,
      totalPrice: 0,
    };

    // Updates each item's bill separately, then pushed into TotalBill
    items.map((item: Item) => {
      totalBill.totalItems.push(this.updateItemBill(item));
    });

    // Updates the total sales tax and total price
    totalBill.totalItems.map((itemBill: ItemBill) => {
      totalBill.totalSalesTax += itemBill.itemTax;
      totalBill.totalPrice += itemBill.priceWithTax;
    });

    totalBill.totalSalesTax = Utils.roundToFixedDecimalDigits(
      totalBill.totalSalesTax,
      AppConstants.DECIMAL_DIGITS
    );

    totalBill.totalPrice = Utils.roundToFixedDecimalDigits(
      totalBill.totalPrice,
      AppConstants.DECIMAL_DIGITS
    );

    return totalBill;
  }

  /**
   * @description  Checks whether all the input item categories are valid or not
   * @param items  Array of Item
   * @returns      True if all item categories are valid, else false
   */
  validateAllItemsCategory(items: Item[]): boolean {
    let isItemCategoryExist = true;
    items.map((item: Item) => {
      if (!this.validateItemCategory(item)) {
        isItemCategoryExist = false;
      }
    });

    return isItemCategoryExist;
  }

  /**
   * @description Checks whether the given item category is valid or not
   * @param item  An item
   * @returns     True if item category is valid else false
   */
  validateItemCategory(item: Item): boolean {
    return Object.values(Categories).includes(item.category);
  }

  /**
   * @description Calculates and updates sales tax, tax percentage, and price of the given item
   * @param item  An Item
   * @returns     Item bill
   */
  updateItemBill(item: Item): ItemBill {
    const itemBill: ItemBill = {
      name: item.name,
      category: item.category,
      price: item.price,
      quantity: item.quantity,
      isImported: item.isImported,
      priceWithTax: 0,
      itemTax: 0,
      taxPercentage: 0,
    };

    // Update the item tax
    itemBill.itemTax = this.calculateItemTax(item);

    // Update the tax percentage of the item
    itemBill.taxPercentage = itemBill.itemTax * 100;
    if (itemBill.itemTax === 0) {
      itemBill.priceWithTax = item.price * item.quantity;
      //no need to update itemBill's itemTax since it is already 0
    } else {
      itemBill.itemTax = Utils.roundUp(
        item.price * item.quantity * itemBill.itemTax,
        AppConstants.ROUNDING_FACTOR_SALES_TAX,
        AppConstants.DECIMAL_DIGITS
      );
      itemBill.priceWithTax = Utils.roundToFixedDecimalDigits(
        item.price * item.quantity + itemBill.itemTax,
        AppConstants.DECIMAL_DIGITS
      );
    }

    return itemBill;
  }

  /**
   * @description Calculate the tax of an item
   * @param item  An Item
   * @returns     Tax value of the item
   */
  calculateItemTax(item: Item): number {
    let itemTax = 0; // First Assuming the each item's tax as 0

    // If item is imported, update the final tax by adding imported sales tax
    itemTax = item.isImported
      ? itemTax + AppConstants.IMPORTED_SALES_TAX
      : itemTax;

    // If item is not tax exexmpted, update the final tax by adding basic sales tax
    itemTax = AppConstants.TAX_EXEMPTED.includes(item.category)
      ? itemTax
      : itemTax + AppConstants.BASIC_SALES_TAX;

    return Utils.roundToFixedDecimalDigits(
      itemTax,
      AppConstants.DECIMAL_DIGITS
    );
  }
}

export default new BillingService();
