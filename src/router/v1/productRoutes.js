import express from "express";
import { getProduct } from "../../controller/productController.js";

export const productRouter = express.Router();

productRouter.post("/get-product", getProduct);
