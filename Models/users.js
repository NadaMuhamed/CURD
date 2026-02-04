const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, validate: validator.isEmail},
  password: { type: String, required: true },
  token: { type: String},
  role: { type: String, enum: ["admin", "user"], default: "user" }, 
});

module.exports = mongoose.model("User", userSchema);