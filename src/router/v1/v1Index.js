import express from "express";
import { productRouter } from "./productRoutes.js";
import { categoryRouter } from "./categoryRoutes.js";
import { transactionRouter } from "./transactionRoutes.js";
import { paymentRouter } from "./paymentRoutes.js";
import {
  image_location,
  ktp_location,
  web_assets,
} from "../../configs/index.js";
import { authRouter } from "./authRoutes.js";
import { roleRouter } from "./roleRoutes.js";
import { merchantRouter } from "./merchantRoutes.js";
import { userRouter } from "./userRoutes.js";
import { merchantCategoryRouter } from "./merchantCategoryRoutes.js";
import { userBranchRouter } from "./userBranchRoutes.js";
import { bankAccountRouter } from "./bankAccountRoutes.js";
import { branchRouter } from "./branchRoutes.js";
import { locationRouter } from "./locationRoutes.js";
import { bankRouter } from "./bankRoutes.js";
import { reportRouter } from "./reportRoutes.js";
import { branchHasProductRouter } from "./branchHasProductRoutes.js";

export const v1Router = express.Router();

v1Router
  .use("/product", productRouter)
  .use("/category", categoryRouter)
  .use("/transaction", transactionRouter)
  .use("/payment", paymentRouter)
  .use("/auth", authRouter)
  .use("/role", roleRouter)
  .use("/merchant", merchantRouter)
  .use("/user", userRouter)
  .use("/merchant-category", merchantCategoryRouter)
  .use("/user-branch", userBranchRouter)
  .use("/bank-account", bankAccountRouter)
  .use("/branch", branchRouter)
  .use("/location", locationRouter)
  .use("/bank", bankRouter)
  .use("/report", reportRouter)
  .use("/assets", express.static(image_location))
  .use("/ktp", express.static(ktp_location))
  .use("/web/assets/", express.static(web_assets))
  .use("/branch-has-product/", branchHasProductRouter);
