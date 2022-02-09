require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

// Routes
const reportRouter = require('./routes/report');

app.use('/api/v1/', reportRouter);

// Database Connect
mongoose.connect(process.env.MONGO_SRV, () => {
  console.log('Connected to MongoDB');
});

// Server Setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
