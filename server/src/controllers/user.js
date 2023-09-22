import User from "../models/User.js";

export const uploadprofile = async (req, res) => {
  const { shortId } = req.params;
  const user = await User.findOneAndUpdate(
    { shortId },
    { profileUrl: req.file?.location }
  );
  res.status(201).json({ success: true, user });
};
