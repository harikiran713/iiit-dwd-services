const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true,
    enum: ['canteen', 'laundromat', 'medical', 'store', 'milk']
  },
  isOpen: {
    type: Boolean,
    required: true,
    default: false
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;