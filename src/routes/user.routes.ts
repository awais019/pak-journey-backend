import { Router } from "express";

import userController from "../controllers/user.controller";
import userValidator from "../validators/user.validator";
import validate from "../middlewares/validate";
import tryCatch from "../middlewares/tryCatch";

const router = Router();

router.post(
  "/",
  validate(userValidator.create),
  tryCatch(userController.create)
);

export default router;
