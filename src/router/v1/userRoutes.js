import express from "express";
import {
  getUser,
  changePasswordUser,
} from "../../controller/userController.js";

export const userRouter = express.Router();

userRouter
  .post("/get-user", getUser)
  .put("/change-pass-user", changePasswordUser);
