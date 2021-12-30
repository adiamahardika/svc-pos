import express from "express";
import {
  getUser,
  changePasswordUser,
  updateUser,
  changeUserStatus,
} from "../../controller/userController.js";

export const userRouter = express.Router();

userRouter
  .post("/get-user", getUser)
  .put("/change-pass-user", changePasswordUser)
  .put("/update-user", updateUser)
  .put("/change-user-status", changeUserStatus);
