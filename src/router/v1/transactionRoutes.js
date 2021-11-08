import express from "express";
import { createTransaction } from "../../controller/transactionController.js";

export const transactionRouter = express.Router();

transactionRouter.post("/create-transaction", createTransaction);
