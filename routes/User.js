const express = require('express');
const Router = express.Router();
const User = require('../models/user');
const {
  userRegistration,
  userLogin,
  userAuthenticate,
  serializeUser,
  checkRole,
} = require('../utils/auth');

Router.post('/register/user', async (req, res) => {
  await userRegistration(req.body, 'user', res);
});

Router.post('/register/admin', async (req, res) => {
  await userRegistration(req.body, 'admin', res);
});

Router.post('/login/user', async (req, res) => {
  await userLogin(req.body, 'user', res);
});

Router.post('/login/admin', async (req, res) => {
  await userLogin(req.body, 'admin', res);
});

Router.get('/profile', userAuthenticate, async (req, res) => {
  await User.findById(req.user._id)
    .then((user) => {
      if (user) {
        return res.status(200).json({
          user: serializeUser(user),
          success: true,
        });
      }
      return res.status(400).json({
        message: 'Invalid email or password',
        success: false,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message,
        success: false,
      });
    });
});

Router.get(
  '/protected/user',
  userAuthenticate,
  checkRole('user'),
  async (req, res) => {
    res.status(200).json({
      message: 'User Access',
      success: true,
    });
  }
);

Router.get(
  '/protected/admin',
  userAuthenticate,
  checkRole('admin'),
  async (req, res) => {
    res.status(200).json({
      message: 'Admin Access',
      success: true,
    });
  }
);

// Get All Users
Router.get('/all', userAuthenticate, checkRole(['admin']), async (req, res) => {
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
});

module.exports = Router;
