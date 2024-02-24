import { Router } from "express";
import tryCatch from "../middlewares/tryCatch";
import tourismController from "../controllers/tourism.controller";
import validate from "../middlewares/validate";
import tourismValidator from "../validators/tourism.validator";

const router = Router();

router.post(
  "/category",
  validate(tourismValidator.createCategory),
  tryCatch(tourismController.createCategory)
);

export default router;
