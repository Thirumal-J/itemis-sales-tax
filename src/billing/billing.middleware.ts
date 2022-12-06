/**
 * Middleware - Request, Response, NextFunction Handlers of Billing
 */

import express from "express";
import { Item } from "./billing.interface";
import BillingService from "./billing.service";
import { AppConstants } from './../common/common.constants';

class BillingMiddleware {
  validateItemCategory(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const items: Item[] = req.body;
    const status: boolean = BillingService.validateItemCategory(items);
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
