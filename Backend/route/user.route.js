import express from "express";
import {
  signup,
  login,
  checkUser,
  resetPasswordDirect,
} from "../controller/user.controller.js";

const router = express.Router();

/* Auth */
router.post("/signup", signup);
router.post("/login", login);

/* Forgot Password */
router.post("/check-user", checkUser);
router.post("/reset-password-direct", resetPasswordDirect);

export default router;