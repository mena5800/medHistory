const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const UserSchema = mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  hash_password: {
    type: String,
    required: true

  },
  created: {
    type: Date,
    default: Date.now
  }
});


UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.hash_password)
};


module.exports = mongoose.model("User", UserSchema);

