/**
 * Coordinates middleware and controller layers
 * 
 */

import express from "express";
import { Routes } from "../common/common.routes";
import BillingController from "./billing.controller";
import BillingMiddleware from "./billing.middleware";

export class Billing extends Routes {
  constructor(app: express.Application) {
    super(app, "Billing Route");
  }
  
  /**
   * @description Configures the application with all the routing related to billing
   * @returns     Configured application
   */
  configureRoutes(): express.Application {
    this.app
      .route("/calculate-bill")
      .all(BillingMiddleware.validateAllItemsCategory)
      .post(BillingController.calculateBill);

    return this.app;
  }
}
