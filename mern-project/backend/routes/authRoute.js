import express from "express";
import {
  forgotPasswordController,
  signInController,
  signUpController,
  testController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middelwares/authMiddelware.js";

const router = express.Router();

router.post("/sign-up", signUpController);

router.post("/forgot-password", forgotPasswordController);

router.post("/sign-in", signInController);

router.get("/test", requireSignIn, isAdmin, testController);

// protected route for user
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true, message: "okay" });
});

// protected route for admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true, message: "okay" });
});
router.put("/profile-update", requireSignIn, updateProfileController);

export default router;
