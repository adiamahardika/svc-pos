import express from "express";
import {
  getCategorySalesSummary,
  getItemSalesSummary,
  getPaymentMethodSummary,
  getSalesSummary,
  getServedBySummary,
} from "../../controller/reportController.js";

export const reportRouter = express.Router();

reportRouter
  .post("/get-sales-summary", getSalesSummary)
  .post("/get-payment-method-summary", getPaymentMethodSummary)
  .post("/get-item-sales-summary", getItemSalesSummary)
  .post("/get-category-sales-summary", getCategorySalesSummary)
  .post("/get-served-by-summary", getServedBySummary);
