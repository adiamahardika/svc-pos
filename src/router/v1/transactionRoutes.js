import express from "express";
import {
  createTransaction,
  getTransaction,
} from "../../controller/transactionController.js";

export const transactionRouter = express.Router();

transactionRouter
  .post("/create-transaction", createTransaction)
  .post("/get-transaction", getTransaction);
