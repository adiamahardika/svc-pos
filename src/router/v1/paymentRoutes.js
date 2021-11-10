import express from "express";
import {
  createPayment,
  getPayment,
} from "../../controller/paymentController.js";

export const paymentRouter = express.Router();

paymentRouter
  .post("/create-payment", createPayment)
  .post("/get-payment", getPayment);
