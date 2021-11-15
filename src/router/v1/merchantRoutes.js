import express from "express";
import {
  createMerchant,
  getMerchant,
} from "../../controller/merchantController.js";

export const merchantRouter = express.Router();

merchantRouter
  .post("/get-merchant", getMerchant)
  .post("/create-merchant", createMerchant);
