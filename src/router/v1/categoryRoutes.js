import express from "express";
import {
  createCategory,
  getCategory,
  updateCategory,
} from "../../controller/categoryController.js";

export const categoryRouter = express.Router();

categoryRouter
  .post("/get-category", getCategory)
  .post("/create-category", createCategory)
  .put("/update-category/:category_id", updateCategory);
