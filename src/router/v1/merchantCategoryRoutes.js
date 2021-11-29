import express from "express";
import {
  createMerchantCategory,
  getMerhcantCategory,
  updateMerchantCategory,
} from "../../controller/merchantCategoryController.js";

export const merchantCategoryRouter = express.Router();

merchantCategoryRouter
  .get("/get-merchant-category", getMerhcantCategory)
  .post("/create-merchant-category", createMerchantCategory)
  .put("/update-merchant-category", updateMerchantCategory);
