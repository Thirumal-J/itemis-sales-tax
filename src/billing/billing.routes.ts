/**
 * Routes of billing extended from the common routes.
 *   Helps in coordinating between middleware and controller.
 */

import express from "express";
import { Routes } from "../common/common.routes";
import BillingController from "./billing.controller";
import BillingMiddleware from "./billing.middleware";

export class Billing extends Routes {
  constructor(app: express.Application) {
    super(app, "Billing Route");
  }

  configureRoutes(): express.Application {
    this.app
      .route("/calculate-bill")
      .all(BillingMiddleware.validateItemCategory)
      .post(BillingController.calculateBill);

    return this.app;
  }
}
