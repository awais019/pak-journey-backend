import { Router } from "express";
import validate from "../middlewares/validate";
import authValidator from "../validators/auth.validator";
import tryCatch from "../middlewares/tryCatch";
import authController from "../controllers/auth.controller";

const router = Router();

router.post(
  "/login",
  validate(authValidator.logIn),
  tryCatch(authController.logIn)
);

router.post("/verify", tryCatch(authController.verifyEmail));

export default router;
