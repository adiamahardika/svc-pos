import express from "express";
import {
  createRole,
  deleteRole,
  getRole,
  updateRole,
} from "../../controller/roleController.js";

export const roleRouter = express.Router();

roleRouter
  .post("/get-role", getRole)
  .post("/create-role", createRole)
  .put("/update-role", updateRole)
  .delete("/delete-role/:role_id", deleteRole);
