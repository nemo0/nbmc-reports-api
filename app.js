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

// Routes
const reportRouter = require('./routes/Report');
const userRouter = require('./routes/User');

app.use('/api/v1/', reportRouter);
app.use('/api/v1/auth', userRouter);

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
