import express from "express";
import { createLog } from "../../controller/logController.js";
import {
  createPayment,
  getDetailPayment,
  getPayment,
} from "../../controller/paymentController.js";

export const paymentRouter = express.Router();

paymentRouter
  .post("/create-payment", createPayment, createLog)
  .post("/get-payment", getPayment, createLog)
  .get("/detail-payment", getDetailPayment, createLog);
