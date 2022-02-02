import express from "express";
import { createLog } from "../../controller/logController.js";
import {
  createMerchantCategory,
  deleteMerchantCategory,
  getMerhcantCategory,
  updateMerchantCategory,
} from "../../controller/merchantCategoryController.js";

export const merchantCategoryRouter = express.Router();

merchantCategoryRouter
  .get("/get-merchant-category", getMerhcantCategory, createLog)
  .post("/create-merchant-category", createMerchantCategory, createLog)
  .put("/update-merchant-category", updateMerchantCategory, createLog)
  .delete(
    "/delete-merchant-category/:mc_id",
    deleteMerchantCategory,
    createLog
  );
