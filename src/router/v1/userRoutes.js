import express from "express";
import { createLog } from "../../controller/logController.js";
import {
  getUser,
  changePasswordUser,
  updateUser,
  changeUserStatus,
  getDetailUser,
} from "../../controller/userController.js";

export const userRouter = express.Router();

userRouter
  .post("/get-user", getUser, createLog)
  .put("/change-pass-user", changePasswordUser, createLog)
  .put("/update-user", updateUser, createLog)
  .put("/change-user-status", changeUserStatus, createLog)
  .get("/get-detail-user/:user_id", getDetailUser, createLog);
