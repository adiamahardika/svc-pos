import express from "express";
import { updateBankAccount } from "../../controller/bankAccountController.js";

export const bankAccountRouter = express.Router();

bankAccountRouter.put("/update-bank-account", updateBankAccount);
