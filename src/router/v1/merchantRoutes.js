import express from "express";
import { getMerchant } from "../../controller/merchantController.js";

export const merchantRouter = express.Router();

merchantRouter.post("/get-merchant", getMerchant);
