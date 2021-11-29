import express from "express";
import {
  createMerchantCategory,
  deleteMerchantCategory,
  getMerhcantCategory,
  updateMerchantCategory,
} from "../../controller/merchantCategoryController.js";

export const merchantCategoryRouter = express.Router();

merchantCategoryRouter
  .get("/get-merchant-category", getMerhcantCategory)
  .post("/create-merchant-category", createMerchantCategory)
  .put("/update-merchant-category", updateMerchantCategory)
  .delete("/delete-merchant-category/:mc_id", deleteMerchantCategory);
