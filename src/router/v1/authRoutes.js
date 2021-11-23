import express from "express";
import {
  authorization,
  login,
  refreshToken,
  register,
  verifyEmail,
} from "../../controller/authController.js";
import { uploadKtp } from "../../helpers/uploadFiles.js";

export const authRouter = express.Router();

authRouter
  .post("/register", uploadKtp, register)
  .post("/login", login)
  .get("/refresh-token", refreshToken)
  .post("/verifiy-email", verifyEmail);
