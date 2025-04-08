const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  serviceType: {
    type: String,
    required: true,
    enum: ['canteen', 'laundromat', 'medical', 'store', 'milk']
  }
});

module.exports = mongoose.model("User", userSchema);