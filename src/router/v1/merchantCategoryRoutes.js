import express from "express";
import { getMerhcantCategory } from "../../controller/merchantCategoryController.js";

export const merchantCategoryRouter = express.Router();

merchantCategoryRouter.get("/get-merchant-category", getMerhcantCategory);
