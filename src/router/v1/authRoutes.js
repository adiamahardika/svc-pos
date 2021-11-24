import express from "express";
import {
  authorization,
  confirmEmail,
  login,
  refreshToken,
  register,
  verifyEmail,
  verifyPhoneNumber,
} from "../../controller/authController.js";
import { uploadKtp } from "../../helpers/uploadFiles.js";

export const authRouter = express.Router();

authRouter
  .post("/register", uploadKtp, register)
  .post("/login", login)
  .get("/refresh-token", refreshToken)
  .post("/verify-email", verifyEmail)
  .get("/confirm-email/:token", confirmEmail)
  .post("/verify-phone-number", verifyPhoneNumber);
