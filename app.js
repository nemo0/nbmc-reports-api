require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');

const { setupMorgan } = require('./middlewares/logging');

// Require Passport Middleware
const requireAuth = require('./middlewares/passport');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(passport.initialize());
requireAuth(passport);

setupMorgan(app);

app.use('/api/v1/', require('./routes/report'));
app.use('/api/v1/auth', require('./routes/user.js'));

app.get('/', function (req, res) {
  res.json({
    message: 'Welcome to the NBMC API',
  });
});

// Database Connect
mongoose.connect(process.env.MONGO_SRV, () => {
  console.log('Connected to MongoDB');
});

// Server Setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
