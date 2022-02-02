import express from "express";
import { updateBankAccount } from "../../controller/bankAccountController.js";
import { createLog } from "../../controller/logController.js";

export const bankAccountRouter = express.Router();

bankAccountRouter.put("/update-bank-account", updateBankAccount, createLog);
