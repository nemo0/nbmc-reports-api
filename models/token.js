const mongoose = require('mongoose');
const { Schema } = mongoose;

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 3600,
  },
});

module.exports = mongoose.model('Token', tokenSchema);
