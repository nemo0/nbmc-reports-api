require('dotenv').config();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// User Registration
const userRegistration = async (userDets, role, res) => {
  try {
    let emailTaken = await validateEmail(userDets.email);
    if (emailTaken) {
      res.status(400).json({
        message: 'Email already taken',
        success: false,
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userDets.password, salt);
      // Create a new user
      const newUser = new User({
        name: userDets.name,
        email: userDets.email,
        password: hashedPassword,
        unit: userDets.unit,
        unitCode: userDets.unitCode,
        address: userDets.address,
        district: userDets.district,
        state: userDets.state,
        pincode: userDets.pincode,
        phone: userDets.phone,
        role: role,
      });
      await newUser.save((err, user) => {
        if (err) {
          res.status(500).json({
            message: 'Error registering new user',
            error: err,
          });
        } else {
          res.status(201).json({
            message: 'User registered successfully',
            user: user,
            success: true,
          });
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

//
const userLogin = async (userDets, role, res) => {
  try {
    let user = await User.findOne({ email: userDets.email });
    if (!user) {
      return res.status(400).json({
        message: 'Invalid email or password',
        success: false,
      });
    } else {
      if (userDets.role !== role) {
        return res.status(400).json({
          message: 'Invalid email or password or role',
          success: false,
        });
      }
      const validPassword = await bcrypt.compare(
        userDets.password,
        user.password
      );
      console.log(userDets.password);
      console.log(user.password);
      if (!validPassword) {
        return res.status(400).json({
          message: 'Invalid email or password.',
          success: false,
        });
      } else {
        let token = jwt.sign(
          { user_id: user._id, role: user.role, email: user.email },
          process.env.TOKEN_SECRET,
          { expiresIn: '1d' }
        );
        let result = {
          token: `Bearer ${token}`,
          email: user.email,
          role: user.role,
          expiresIn: '1d',
        };

        return res.status(200).json({
          message: 'User logged in successfully',
          user: result,
          success: true,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// @DESC  : Passport middleware for user login
// @PARAMS: req, res, next
// @RETURN: next()
const userAuthenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({
        message: 'Something went wrong',
        success: false,
      });
    }
    if (info) {
      return res.status(400).json({
        message: info.message,
        success: false,
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

// @DESC  : Check User Role
// @PARAMS: req, res, next
// @RETURN: next()
const checkRole = (roles) => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json({
        message: 'Unauthorized',
        success: false,
      })
    : next();
// Helper
const validateEmail = async (email) => {
  let user = await User.findOne({ email });
  if (user) {
    return true;
  } else {
    return false;
  }
};

const serializeUser = (user) => {
  return {
    user_id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    unit: user.unit,
    unitCode: user.unitCode,
    address: user.address,
    district: user.district,
    state: user.state,
    pincode: user.pincode,
    phone: user.phone,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
  };
};

module.exports = {
  userRegistration,
  userLogin,
  userAuthenticate,
  serializeUser,
  checkRole,
};
