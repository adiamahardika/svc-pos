import express from "express";
import { createLog } from "../../controller/logController.js";
import {
  createRole,
  deleteRole,
  getRole,
  updateRole,
} from "../../controller/roleController.js";

export const roleRouter = express.Router();

roleRouter
  .post("/get-role", getRole, createLog)
  .post("/create-role", createRole, createLog)
  .put("/update-role", updateRole, createLog)
  .delete("/delete-role/:role_id", deleteRole, createLog);
