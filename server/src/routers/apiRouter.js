import express from "express";
const apiRouter = express.Router();
import User from "../models/User.js";
import bcrypt from "bcrypt";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

apiRouter.post("/register", async (req, res, next) => {
  let { email, password, passwordConfirm, userName } = req.body;

  if (password !== passwordConfirm) {
    return res.json({
      success: false,
      errorMessage: "wrongPassword",
    });
  }

  const checkEmail = await User.findOne({ email });
  console.log(checkEmail);
  if (checkEmail) {
    return res.json({
      success: false,
      errorMessage: "wrongEmail",
    });
  }

  const checkUserName = await User.findOne({ userName });
  console.log(checkUserName);
  if (checkUserName) {
    return res.json({
      success: false,
      errorMessage: "wrongUserName",
    });
  }

  password = bcrypt.hashSync(password, 5);

  const user = await User.create({
    email,
    password,
    userName,
  });
  res.status(200).json({ success: true, user: user });
});

apiRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({
      success: false,
      errorMessage: "wrongEmail",
    });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.json({
      success: false,
      errorMessage: "wrongPassword",
    });
  }
  res.status(201).json({ success: true, loggedIn: true, user: user });
});

apiRouter.post("/upload/userImage", upload.single("userImage"), (req, res) => {
  console.log(req);
});

export default apiRouter;
