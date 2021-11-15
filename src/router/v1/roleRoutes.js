import express from "express";
import { createRole, getRole } from "../../controller/roleController.js";

export const roleRouter = express.Router();

roleRouter.post("/get-role", getRole).post("/create-role", createRole);
