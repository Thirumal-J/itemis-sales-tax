/**
 * Billing Middleware - Mediator Handles Request, Response, NextFunction of Billing
 */

import express from "express";
import { AppConstants } from "./../common/common.constants";
import { Item } from "./billing.interface";
import BillingService from "./billing.service";

class BillingMiddleware {

  /**
   * @description Validates the given all item categories exist or not
   * @param req   Purchased items
   * @param res   True if all item categories exist else false
   * @param next  Redirects to the next function of the routing layer
   */
  validateAllItemsCategory(
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
