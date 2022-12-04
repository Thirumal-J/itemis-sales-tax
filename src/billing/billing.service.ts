/**
 * All the business logic of billing will be here
 */

 import {
    categories,
    finalBill,
    item,
    itemBill,
    validationStatus
  } from "./billing.interface";
  import utils from "../utils";
  
  const basicSalesTax: number = 0.1; // Basic sales tax for the goods is 10%
  const importedSalesTax: number = 0.05; // Imported sales tax for the goods is 5%
  const taxExempted: string[] = ["food", "medicine", "books"]; // Mentioned goods are exempted from basic sales tax
  const roundingFactor: number = 0.05;
  
  class BillingService {
    calculateBill(items: item[]): finalBill {
      let totalBill: finalBill = {
        totalItems: [],
        totalSalesTax: 0,
        totalCost: 0,
      };
      items.map((oneitem) => {
        totalBill.totalItems.push(this.updateItemBill(oneitem));
      });
      totalBill.totalItems.map((eachItemBill) => {
        totalBill.totalSalesTax += eachItemBill.itemTax;
        totalBill.totalCost += eachItemBill.priceWithTax;
      });
      totalBill.totalSalesTax = utils.round2Decimals(totalBill.totalSalesTax); // Doing this because of decimal addition issue in typescript
      totalBill.totalCost = utils.round2Decimals(totalBill.totalCost); // Doing this because of decimal addition issue in typescript
      return totalBill;
    }
  
    validateItemCategory(items: item[]): validationStatus {
      let itemCategoryValidation = validationStatus.SUCCESS;
      items.map((oneitem: item) => {
        if (!Object.values(categories).includes(oneitem.category)) {
          itemCategoryValidation = validationStatus.FAILED;
        }
      });
      return itemCategoryValidation;
    }
  
    updateItemBill(item: item): itemBill {
      let itemBill: itemBill = {
        name: item.name,
        category: item.category,
        price: item.price,
        quantity: item.quantity,
        isImported: item.isImported,
        priceWithTax: 0,
        itemTax: 0,
        taxPercentage: 0,
      };
      let finalItemTax = 0; // First Assuming the each item's tax as 0
  
      // If item is imported, update the final tax by adding imported sales tax
      finalItemTax = item.isImported
        ? (finalItemTax + importedSalesTax)
        : finalItemTax;
  
      // If item is not tax exexmpted, update the final tax by adding basic sales tax
      finalItemTax = taxExempted.includes(item.category)
        ? finalItemTax
        : (finalItemTax + basicSalesTax);
  
      // need to round the finaltax because of typescript decimal addition giving extra values
      finalItemTax = utils.round2Decimals(finalItemTax);
  
      // Updating the tax percentage for the item
      itemBill.taxPercentage = finalItemTax * 100;
      if (finalItemTax === 0) {
        itemBill.priceWithTax = item.price * item.quantity;
        // itemBill.priceWithTax =  utils.roundingToPointZeroFive(itemBill.priceWithTax);
        //no need to update itemBill's itemTax since it will be 0
      } else {
        itemBill.itemTax = item.price * item.quantity * finalItemTax;
        itemBill.itemTax = utils.roundingToPointZeroFive(itemBill.itemTax);
        itemBill.priceWithTax = item.price * item.quantity + itemBill.itemTax;
        itemBill.priceWithTax =  utils.round2Decimals(itemBill.priceWithTax);
      }
      return itemBill;
    }
  }
  
  export default new BillingService();
  