import express from "express";
import {
  createMerchant,
  getMerchant,
  updateMerchant,
} from "../../controller/merchantController.js";

export const merchantRouter = express.Router();

merchantRouter
  .post("/get-merchant", getMerchant)
  .post("/create-merchant", createMerchant)
  .put("/update-merchant", updateMerchant);
