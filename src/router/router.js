import express from "express";
import { v1Router } from "./v1/v1Index.js";

export const allRouter = express.Router();

allRouter.use("/v1", v1Router);
