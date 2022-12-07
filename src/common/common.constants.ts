/**
 * Application Constants
 */
import { Categories } from "./../billing/billing.interface";

export class AppConstants {
  static readonly BASIC_SALES_TAX: number = 0.1; // Basic sales tax for the goods is 10%
  static readonly IMPORTED_SALES_TAX: number = 0.05; // Imported sales tax for the goods is 5%
  static readonly ROUNDING_FACTOR_SALES_TAX: number = 0.05;  // Rounding factor for sales tax
  static readonly DECIMAL_DIGITS: number = 2;
  static readonly TAX_EXEMPTED: string[] = [
    Categories.BOOKS,
    Categories.MEDICINE,
    Categories.FOOD,
  ]; // Categories that are exempted from basic sales tax

  static readonly WRONG_ITEM_CATEGORY_MSG:string = `One or more item category is not from the allowed categories`;  
  static readonly ERROR_STATUS_CODE:number = 404;
  static readonly SUCCESS_STATUS_CODE:number = 200;

}
