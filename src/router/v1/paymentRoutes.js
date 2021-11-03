import express from "express";
import { createPayment } from "../../controller/paymentController.js";

export const paymentRouter = express.Router();

paymentRouter.post("/create-payment", createPayment);
