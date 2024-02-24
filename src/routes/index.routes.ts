import express from "express";
import index from "../controllers/index.controller";

const router = express.Router();

router.get("/", index);

export default router;
