import express from "express";
const globalRouter = express.Router();

globalRouter.get("/logout", (req, res) => {
  res.end();
});

export default globalRouter;
