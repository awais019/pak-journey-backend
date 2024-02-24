import compression from "compression";
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";

import _static from "./middlewares/static";
import routes from "./startup/routes";
import logger from "./startup/logger";
import cors from "./startup/cors";

dotenv.config();

const app = express();
app.use([express.json(), helmet(), compression()]);

cors(app);
routes(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});
