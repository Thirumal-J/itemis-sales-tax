/**
 * Middleware - Request, Response, NextFunction Handlers of Billing
 */

 import express from "express";
 import billingService from "./billing.service";
 import { item, itemBill, finalBill, validationStatus } from "./billing.interface"
 
 class BillingMiddleware {
     validateItemCategory(
         req:express.Request,
         res:express.Response,
         next:express.NextFunction
     ) {
         const items: item[] = req.body;
         const status:validationStatus = billingService.validateItemCategory(items);
         if(status === validationStatus.SUCCESS){
             next();
         } else {
             res.status(404).send({
                 errorMsg:`One or more item category is not from the allowed categories`
             })
         }
     }
 }
 
 export default new BillingMiddleware();