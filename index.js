import "dotenv/config.js";
import express from "express";
import "./server/src/db.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import apiRouter from "./server/src/routers/apiRouter.js";
import globalRouter from "./server/src/routers/globalRouter.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`SERVER ON 🌏 in PORT: ${port}`);
});

app.use("/", express.static(path.join(__dirname, "/client/dist")));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "1000kb" }));

app.use("/", globalRouter);
app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.json({ errMessage: err });
});
