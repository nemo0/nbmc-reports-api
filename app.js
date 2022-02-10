require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://mvyp.us.auth0.com/.well-known/jwks.json',
  }),
  audience: 'http://localhost:3001',
  issuer: 'https://mvyp.us.auth0.com/',
  algorithms: ['RS256'],
});

app.use(jwtCheck);

// Routes
const reportRouter = require('./routes/report');
// const authRouter = require('./routes/auth');

app.use('/api/v1/', reportRouter);
// app.use('/api/auth/', authRouter);

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
