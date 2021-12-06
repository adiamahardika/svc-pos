import express from "express";
import { getSalesSummary } from "../../controller/reportController.js";

export const reportRouter = express.Router();

reportRouter.post("/get-sales-summary", getSalesSummary);
