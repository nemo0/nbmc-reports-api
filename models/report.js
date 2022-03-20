// Create Mongoose Model
const mongoose = require('mongoose');
const { Schema } = mongoose;

const sc_date = new Schema({
  date: {
    type: Date,
  },
  members: {
    type: Number,
    default: 0,
  },
});

const Report = new Schema({
  dateStart: {
    type: Date,
    required: true,
  },
  dateEnd: {
    type: Date,
    required: true,
  },
  dateReported: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  totalStudyCircles: {
    type: Number,
    required: true,
  },
  totalMembers: {
    type: Number,
    required: true,
  },
  newMembers: {
    type: Number,
    default: 0,
  },
  dateWise: [sc_date],
  average: {
    type: Number,
  },
  discussedTopics: {
    type: String,
  },
  programs: {
    type: String,
  },
  attendedPrograms: {
    type: String,
  },
  socialWork: {
    type: String,
  },
  letter: {
    type: String,
  },
  author: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    email: {
      type: String,
    },
    unit: {
      type: String,
    },
    role: {
      type: String,
    },
  },
});

module.exports = mongoose.model('Report', Report);
