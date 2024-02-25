import { Express } from "express";
import index from "../routes/index.routes";
import authRoutes from "../routes/auth.routes";
import tourismRoutes from "../routes/tourism.routes";
import mediaRoutes from "../routes/media.routes";

export default function (app: Express) {
  app.use("/api/", index);
  app.use("/api/auth", authRoutes);
  app.use("/api/tourism", tourismRoutes);
  app.use("/api/media", mediaRoutes);
}
