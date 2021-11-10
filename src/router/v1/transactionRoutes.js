import express from "express";
import {
  createTransaction,
  getDetailTransaction,
  getTransaction,
} from "../../controller/transactionController.js";

export const transactionRouter = express.Router();

transactionRouter
  .post("/create-transaction", createTransaction)
  .post("/get-transaction", getTransaction)
  .get("/detail-transaction/:transaction_id", getDetailTransaction);
