import express from "express";
const apiRouter = express.Router();
import User from "../models/User.js";
import bcrypt from "bcrypt";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import {
  uploadPost,
  getPosts,
  getDetail,
  uploadComment,
  getComments,
} from "../controllers/post.js";

const s3 = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    secretAccessKey: process.env.S3_SECREAT_ACCESS_KEY,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
  },
});

import path, { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, __dirname + "/../uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "cat-project-bucket",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, `post/${Date.now()}${path.extname(file.originalname)}`);
    },
  }),
});

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

apiRouter.route("/posts").post(upload.single("file"), uploadPost).get(getPosts);

apiRouter.route("/posts/:shortId").get(getDetail);

apiRouter.route("/posts/:shortId/comments").post(uploadComment);
// .get(getComments);
export default apiRouter;
