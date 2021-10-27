import express from "express";
import { getCategory } from "../../controller/categoryController.js";

export const categoryRouter = express.Router();

categoryRouter.post("/get-category", getCategory);
