/**
 *  Billing Controller -  key components of MVC
 *      Connects with the service layer for applying all business logics
 */

import express from "express";
import { Item, TotalBill } from "./billing.interface";
import billingService from "./billing.service";
import { AppConstants } from './../common/common.constants';

class BillingController {
  calculateBill(req: express.Request, res: express.Response) {
    const items: Item[] = req.body;
    const finalBill: TotalBill = billingService.calculateBill(items);
    res.status(AppConstants.SUCCESS_STATUS_CODE).json(finalBill);
  }
}

export default new BillingController();
