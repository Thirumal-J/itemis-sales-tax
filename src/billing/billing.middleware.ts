/**
 * Billing Middleware - Mediator Handles Request, Response, NextFunction of Billing
 */

import express from "express";
import { AppConstants } from "./../common/common.constants";
import { Item } from "./billing.interface";
import BillingService from "./billing.service";

class BillingMiddleware {
  validateItemCategory(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const items: Item[] = req.body;
    const status: boolean = BillingService.validateAllItemsCategory(items);
    if (status) {
      next();
    } else {
      res.status(AppConstants.ERROR_STATUS_CODE).send({
        errorMsg: AppConstants.WRONG_ITEM_CATEGORY_MSG,
      });
    }
  }
}

export default new BillingMiddleware();
