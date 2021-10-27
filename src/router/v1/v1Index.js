import express from "express";
import { productRouter } from "./productRoutes.js";

export const v1Router = express.Router();

v1Router.use("/product", productRouter);
