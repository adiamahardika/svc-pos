import express from "express";
import {
  getProduct,
  createProduct,
} from "../../controller/productController.js";
import { uploadImages } from "../../helpers/uploadFiles.js";

export const productRouter = express.Router();

productRouter
  .post("/get-product", getProduct)
  .post("/create-product", uploadImages, createProduct);
