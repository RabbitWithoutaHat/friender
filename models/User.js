const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  login: String,
  password: String,
  title: String,
  content: String,
  position: {
    lat: Number,
    lng: Number,
  },
});
UserSchema.statics.getByLogin = async function (login) {
  return this.find({ login });
};

module.exports = mongoose.model('User', UserSchema);
