/**
 *  Billing Controller - Connects service layer for applying all business logics
 */

import express from "express";
import { AppConstants } from "./../common/common.constants";
import { Item, TotalBill } from "./billing.interface";
import billingService from "./billing.service";

class BillingController {
  /**
   * Function to calculate bill
   * @param req - express request
   * @param res - express response
   */
  calculateBill(req: express.Request, res: express.Response) {
    const items: Item[] = req.body;
    const finalBill: TotalBill = billingService.calculateBill(items);
    res.status(AppConstants.SUCCESS_STATUS_CODE).json(finalBill);
  }
}

export default new BillingController();
