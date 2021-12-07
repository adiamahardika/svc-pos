import express from "express";
import {
  getPaymentMethodSummary,
  getSalesSummary,
} from "../../controller/reportController.js";

export const reportRouter = express.Router();

reportRouter
  .post("/get-sales-summary", getSalesSummary)
  .post("/get-payment-method-summary", getPaymentMethodSummary);
