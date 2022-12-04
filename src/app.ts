/**
 * APP File and configurations
 */

/**
 * Required External Modules
 */
import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";

dotenv.config();

/**
 * Internal Imports
 */
import { Routes } from "./common/common.routes";
import { Billing } from "./billing/billing.routes";

/**
 * App Variables
 */

const app: Application = express();
const routes: Routes[] = [];

const corsOptions = {
  origin: `http://localhost:${process.env.CLIENT_PORT}`,
  methods: "GET,PUT,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

/**
 *  App Configuration
 */

app.use(express.json());
app.use(cors(corsOptions));

routes.push(new Billing(app));

routes.forEach((route: Routes) => {
  route.configureRoutes();
  console.log(`Configured routes -->  ${route.getName()}`);
});

export default app;
