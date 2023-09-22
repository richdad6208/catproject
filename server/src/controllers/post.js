import Post from "../models/Post.js";
import User from "../models/User.js";

export const uploadPost = async (req, res) => {
  const { title, content, user } = req.body;
  if (!user) {
    res
      .status(400)
      .json({ success: false, errorMessage: "유저를 찾을 수 없습니다" });
  }
  const post = await Post.create({
    title,
    content,
    imageUrl: req.file.location,
    author: user,
  });
  res.status(201).json({ success: true, post });
};

export const getPosts = async (req, res) => {
  const posts = await Post.find({});

  res.status(200).json({ success: true, posts });
};

export const getDetail = async (req, res) => {
  const { shortId } = req.params;
  const post = await Post.findOneAndUpdate({ shortId }, { $inc: { view: 1 } })
    .populate("author")
    .populate({
      path: "comments",
      populate: { path: "author" },
    });
  if (!post) {
    res.json({ success: false, errorMessage: "해당 포스트를 찾지 못했습니다" });
  }
  res.status(200).json({ success: true, post });
};

export const uploadComment = async (req, res) => {
  const { shortId } = req.params;
  const { comment, shortIdOfLoggedInUser } = req.body;

  const author = await User.findOne({ shortId: shortIdOfLoggedInUser });

  if (!author) {
    res.status(404).json({ errorMessage: "유저가 없습니다" });
  }

  await Post.updateOne(
    { shortId },
    {
      $push: {
        comments: {
          content: comment,
          author,
        },
      },
    }
  );

  const post = await Post.findOne({ shortId })
    .populate("author")
    .populate({
      path: "comments",
      populate: { path: "author" },
    });

  res.status(201).json({ success: true, post });
};

export const getComments = async (req, res) => {
  const { shortId } = req.params;

  const post = await Post.findOne({ shortId });

  if (!post) {
    res.status(404).json({ errorMessage: "게시글을 찾을 수 없습니다." });
  }

  res.status(200).json({ success: true, post });
};

// export const deleteComment = async (req, res) => {
//   const { shortId, commentId } = req.params;
//   try {
//     await Post.comments.id(commentId).deleteOne();
//     const post = await Post.findOne({ shortId });
//     res.status(200).json({ success: true, post });
//   } catch {
//     (err) => console.log(err);
//     res.status(400).json({ errorMessage: "문제가 발생했습니다" });
//   }
// };
