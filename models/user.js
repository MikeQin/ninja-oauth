const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    required: [true, "username is required"],
    index: true
  },
  userId: {
    type: String,
    required: [true, "userid is required"],
    unique: true
  },
  thumbnail: {
    type: String,
    required: [false]
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;