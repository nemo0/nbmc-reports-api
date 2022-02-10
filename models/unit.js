const mongoose = require('mongoose');
const { Schema } = mongoose;

const Unit = new Schema({
  unitName: {
    type: String,
    required: true,
  },
  unitType: {
    type: String,
  },
  address: {
    cityOrVillage: {
      type: String,
    },
    district: {
      type: String,
      required: true,
    },
    pin: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      default: 'India',
    },
  },
});

module.exports = mongoose.model('Unit', Unit);
