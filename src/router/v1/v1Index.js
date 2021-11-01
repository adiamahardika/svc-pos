import express from "express";
import { productRouter } from "./productRoutes.js";
import { categoryRouter } from "./categoryRoutes.js";
import { transactionRouter } from "./transactionRouter.js";

export const v1Router = express.Router();

v1Router
  .use("/product", productRouter)
  .use("/category", categoryRouter)
  .use("/transaction", transactionRouter);
