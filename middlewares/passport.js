const User = require('../models/user');
const { Strategy, ExtractJwt } = require('passport-jwt');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.TOKEN_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      await User.findById(payload.user_id)
        .then(async (user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => {
          return done(err, false);
        });
    })
  );
};
