const mongoose = require('mongoose');
const { Schema } = mongoose;

const Unit = new Schema({
  unitName: {
    type: String,
    required: true,
  },
  unitType: {
    type: String,
    required: true,
  },
  unitCode: {
    type: String,
    required: true,
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
