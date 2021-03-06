const express = require('express');
const Router = express.Router();
const {
  userRegistration,
  userLogin,
  userAuthenticate,
  checkRole,
  requestPasswordReset,
  resetPassword,
} = require('../utils/auth');

const { getProfile, getAllUsers } = require('../controllers/auth');
const { validateUser } = require('../utils/validation');
const { validateMiddleware } = require('../middlewares/validation');

Router.post(
  '/register/user',
  [validateMiddleware(validateUser)],
  async (req, res) => {
    await userRegistration(req.body, 'user', res);
  }
);

Router.post(
  '/register/admin',
  [validateMiddleware(validateUser)],
  async (req, res) => {
    await userRegistration(req.body, 'admin', res);
  }
);

Router.post('/login/user', async (req, res) => {
  await userLogin(req.body, 'user', res);
});

Router.post('/login/admin', async (req, res) => {
  await userLogin(req.body, 'admin', res);
});

Router.get('/profile', userAuthenticate, getProfile);

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
Router.get('/all', userAuthenticate, checkRole(['admin']), getAllUsers);

// Password Reset Request
Router.post('/password/reset-request', requestPasswordReset);

// Password Reset
Router.post('/password/reset', resetPassword);

module.exports = Router;
