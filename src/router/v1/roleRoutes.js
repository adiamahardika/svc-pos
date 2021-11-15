import express from "express";
import { getRole } from "../../controller/roleController.js";

export const roleRouter = express.Router();

roleRouter.post("/get-role", getRole);
