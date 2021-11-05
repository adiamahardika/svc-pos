import express from "express";
import {
  createCategory,
  getCategory,
} from "../../controller/categoryController.js";

export const categoryRouter = express.Router();

categoryRouter
  .post("/get-category", getCategory)
  .post("/create-category", createCategory);
