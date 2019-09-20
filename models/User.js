const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  login: String,
  password: String,
  title: String,
  post: String,
});
UserSchema.statics.getByLogin = async function (login) {
  return this.find({ login });
};

module.exports = mongoose.model('User', UserSchema);
