import express from "express";
import { getBank } from "../../controller/bankController.js";
import { createLog } from "../../controller/logController.js";

export const bankRouter = express.Router();

bankRouter.post("/get-bank", getBank, createLog);
