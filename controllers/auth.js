const User = require('../models/user');
const {
  serializeUser,
  requestPasswordReset,
  resetPassword,
} = require('../utils/auth');

exports.getProfile = async (req, res) => {
  await User.findById(req.user._id)
    .then((user) => {
      if (user) {
        return res.status(200).json({
          user: serializeUser(user),
          success: true,
        });
      }
      return res.status(400).json({
        message: 'Invalid user',
        success: false,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
        success: false,
      });
    });
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    const usersArr = [];
    users.forEach((user) => {
      usersArr.push(serializeUser(user));
    });
    if (!users) {
      res.status(404).json({
        message: 'No Users Found',
      });
    } else {
      res.status(200).json({
        message: 'Users Found',
        users: usersArr,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error Fetching Users',
      error: error,
    });
  }
};

exports.requestPasswordReset = async (req, res) => {
  const link = await requestPasswordReset(req.body.email);
  res.status(200).json({
    message: 'Password reset link sent to your email',
    link: link,
  });
};

exports.resetPassword = async (req, res) => {
  const resetPassword = await resetPassword(
    req.body.userId,
    req.body.token,
    req.body.password
  );
  res.status(200).json({
    message: 'Password reset successfully',
    success: true,
  });
};
