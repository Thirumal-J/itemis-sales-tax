/**
 * All the business logic of billing will be here
 */
import utils from "../utils";
import { AppConstants } from "./../common/common.constants";
import { Categories, Item, ItemBill, TotalBill } from "./billing.interface";

class BillingService {
  calculateBill(items: Item[]): TotalBill {
    const totalBill: TotalBill = {
      totalItems: [],
      totalSalesTax: 0,
      totalPrice: 0,
    };
    items.map((item: Item) => {
      totalBill.totalItems.push(this.updateItemBill(item));
    });
    totalBill.totalItems.map((itemBill: ItemBill) => {
      totalBill.totalSalesTax += itemBill.itemTax;
      totalBill.totalPrice += itemBill.priceWithTax;
    });
    totalBill.totalSalesTax = utils.round2Decimals(totalBill.totalSalesTax);
    totalBill.totalPrice = utils.round2Decimals(totalBill.totalPrice);
    return totalBill;
  }

  validateItemCategory(items: Item[]): boolean {
    let isItemCategoryExist = true;
    items.map((item: Item) => {
      if (!Object.values(Categories).includes(item.category)) {
        isItemCategoryExist = false;
      }
    });
    return isItemCategoryExist;
  }

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

    itemBill.itemTax = this.calculateItemTax(item);
    // Updating the tax percentage for the item
    itemBill.taxPercentage = itemBill.itemTax * 100;
    if (itemBill.itemTax === 0) {
      itemBill.priceWithTax = item.price * item.quantity;
      //no need to update itemBill's itemTax since it will be 0
    } else {
      itemBill.itemTax = utils.roundingToPointZeroFive(
        item.price * item.quantity * itemBill.itemTax
      );
      itemBill.priceWithTax = utils.round2Decimals(
        item.price * item.quantity + itemBill.itemTax
      );
    }
    return itemBill;
  }

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

    return utils.round2Decimals(itemTax); // need to round the finaltax because of typescript decimal addition giving extra values
  }
}

export default new BillingService();
