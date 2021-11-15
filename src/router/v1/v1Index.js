import express from "express";
import { productRouter } from "./productRoutes.js";
import { categoryRouter } from "./categoryRoutes.js";
import { transactionRouter } from "./transactionRoutes.js";
import { paymentRouter } from "./paymentRoutes.js";
import { image_location } from "../../configs/index.js";
import { authRouter } from "./authRoutes.js";
import { roleRouter } from "./roleRoutes.js";

export const v1Router = express.Router();

v1Router
  .use("/product", productRouter)
  .use("/category", categoryRouter)
  .use("/transaction", transactionRouter)
  .use("/payment", paymentRouter)
  .use("/auth", authRouter)
  .use("/role", roleRouter)
  .use("/assets", express.static(image_location));
