/**
 *  Fetches billing related services from billing service layer
 */

import express from "express";
import { AppConstants } from "./../common/common.constants";
import { Item, TotalBill } from "./billing.interface";
import BillingService from "./billing.service";

class BillingController {
  /**
   * @description Calculates the bill for purchased items
   * @param req   Purchased items
   * @param res   Final response with total bill and status code
   */
  calculateBill(req: express.Request, res: express.Response) {
    const items: Item[] = req.body;
    const totalBill: TotalBill = BillingService.calculateBill(items);
    res.status(AppConstants.SUCCESS_STATUS_CODE).json(totalBill);
  }
}

export default new BillingController();
