import express from "express";
import { createLog } from "../../controller/logController.js";
import {
  createMerchant,
  getDetailMerchant,
  getMerchant,
  updateMerchant,
} from "../../controller/merchantController.js";

export const merchantRouter = express.Router();

merchantRouter
  .post("/get-merchant", getMerchant, createLog)
  .post("/create-merchant", createMerchant, createLog)
  .put("/update-merchant", updateMerchant, createLog)
  .get("/get-detail-merchant/:merchant_id", getDetailMerchant, createLog);
