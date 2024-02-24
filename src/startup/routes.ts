import { Express } from "express";
import index from "../routes/index.routes";
import userRoutes from "../routes/user.routes";

export default function (app: Express) {
  app.use("/api/", index);
  app.use("/api/users", userRoutes);
}
