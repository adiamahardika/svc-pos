import express from "express";
import { getBank } from "../../controller/bankController.js";

export const bankRouter = express.Router();

bankRouter.post("/get-bank", getBank);
