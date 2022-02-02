import express from "express";
import { createLog } from "../../controller/logController.js";
import {
  getCategorySalesSummary,
  getGrossProfitSummary,
  getItemSalesSummary,
  getPaymentMethodSummary,
  getSalesSummary,
  getSalesTypeSummary,
  getServedBySummary,
} from "../../controller/reportController.js";

export const reportRouter = express.Router();

reportRouter
  .post("/get-sales-summary", getSalesSummary, createLog)
  .post("/get-payment-method-summary", getPaymentMethodSummary, createLog)
  .post("/get-item-sales-summary", getItemSalesSummary, createLog)
  .post("/get-category-sales-summary", getCategorySalesSummary, createLog)
  .post("/get-served-by-summary", getServedBySummary, createLog)
  .post("/get-sales-type-summary", getSalesTypeSummary, createLog)
  .post("/get-gross-profit", getGrossProfitSummary, createLog);
