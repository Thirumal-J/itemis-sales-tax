/**
 * All the business logic of billing will be here
 */
import utils from "../utils";
import { AppConstants } from "./../common/common.constants";
import { Categories, Item, ItemBill, TotalBill } from "./billing.interface";

class BillingService {
  /**
   * Method: Calculates the Total Bill
   * @param items - Array of Item
   * @returns Total Bill
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

    totalBill.totalSalesTax = utils.roundToFixedDecimalDigits(
      totalBill.totalSalesTax,
      AppConstants.DECIMAL_DIGITS
    );

    totalBill.totalPrice = utils.roundToFixedDecimalDigits(
      totalBill.totalPrice,
      AppConstants.DECIMAL_DIGITS
    );

    return totalBill;
  }

  /**
   * Function to validate all input item category
   * @param items - Array of Item
   * @returns boolean
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
   * Function to validate the given item category exist or not
   * @param item
   * @returns boolean
   */
  validateItemCategory(item: Item): boolean {
    return Object.values(Categories).includes(item.category);
  }

  /**
   * Funtion to calculate and update a item's bill
   * @param item
   * @returns itemBill
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
      itemBill.itemTax = utils.roundUp(
        item.price * item.quantity * itemBill.itemTax,
        AppConstants.ROUNDING_FACTOR_SALES_TAX,
        AppConstants.DECIMAL_DIGITS
      );
      itemBill.priceWithTax = utils.roundToFixedDecimalDigits(
        item.price * item.quantity + itemBill.itemTax,
        AppConstants.DECIMAL_DIGITS
      );
    }

    return itemBill;
  }

  /**
   * Function to calculate the tax of an item
   * @param item
   * @returns tax as number
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

    return utils.roundToFixedDecimalDigits(
      itemTax,
      AppConstants.DECIMAL_DIGITS
    );
  }
}

export default new BillingService();
