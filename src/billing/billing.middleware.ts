/**
 *  This mediator handles Request, Response, NextFunction of Billing
 */

import express from "express";
import { AppConstants } from "./../common/common.constants";
import { Item } from "./billing.interface";
import BillingService from "./billing.service";

class BillingMiddleware {

  /**
   * @description Checks whether all the item categories are valid or not
   * @param req   Purchased items
   * @param res   Object to send back the status code and error msg
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
