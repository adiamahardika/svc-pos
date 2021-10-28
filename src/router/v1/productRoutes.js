import express from "express";
import {
  getProduct,
  createProduct,
} from "../../controller/productController.js";

export const productRouter = express.Router();

productRouter
  .post("/get-product", getProduct)
  .post("/create-product", createProduct);