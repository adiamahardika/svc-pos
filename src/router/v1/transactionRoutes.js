import express from "express";
import { createLog } from "../../controller/logController.js";
import {
  createTransaction,
  getDetailTransaction,
  getTransaction,
  updateTransaction,
  updateTransactionStatus,
} from "../../controller/transactionController.js";

export const transactionRouter = express.Router();

transactionRouter
  .post("/create-transaction", createTransaction, createLog)
  .post("/get-transaction", getTransaction, createLog)
  .get("/detail-transaction/:transaction_id", getDetailTransaction, createLog)
  .put("/update-transaction-status", updateTransactionStatus, createLog)
  .put("/update-transaction", updateTransaction, createLog);
