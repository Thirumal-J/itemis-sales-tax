/**
 *  Billing Controller -  key components of MVC
 *      Connects with the service layer for applying all business logics
 */

 import { item, itemBill, finalBill } from "./billing.interface";
 import express from "express";
 import billingService from "./billing.service";
 
 class BillingController {
 
     calculateBill(req:express.Request,res:express.Response) {
         const items: item[] = req.body;
         const finalBill:finalBill = billingService.calculateBill(items);
         res.status(200).json(finalBill);
     }
 }
 
 export default new BillingController();