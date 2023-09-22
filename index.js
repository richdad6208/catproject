import "dotenv/config.js";
import express from "express";
import "./server/src/db.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import apiRouter from "./server/src/routers/apiRouter.js";
import globalRouter from "./server/src/routers/globalRouter.js";
import morgan from "morgan";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`SERVER ON 🌏 in PORT: ${port}`);
});

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "/client/dist")));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.use("/", globalRouter);
app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(400);
});
