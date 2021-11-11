import express from "express";
import {
  createTransaction,
  getDetailTransaction,
  getTransaction,
  updateTransactionStatus,
} from "../../controller/transactionController.js";

export const transactionRouter = express.Router();

transactionRouter
  .post("/create-transaction", createTransaction)
  .post("/get-transaction", getTransaction)
  .get("/detail-transaction/:transaction_id", getDetailTransaction)
  .put("/update-transaction-status/:transaction_id", updateTransactionStatus);
