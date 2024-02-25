import { Router } from "express";
import tryCatch from "../middlewares/tryCatch";
import validate from "../middlewares/validate";
import mediaValidator from "../validators/media.validator";
import mediaController from "../controllers/media.controller";

const router = Router();

router.post(
  "/",
  validate(mediaValidator.create),
  tryCatch(mediaController.create)
);

export default router;
