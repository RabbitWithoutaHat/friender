const mongoose = require('mongoose');
const faker = require('faker');
const User = require('./models/User');

mongoose.connect('mongodb://localhost/races', {
  useNewUrlParser: true,
});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

async function seed(num) {
  for (let i = 0; i < num; i++) {
    const user = new User({
      login: faker.name.firstName(),
      wins: 0,
      loses: 0,
    });
    await user.save();
  }
}
seed(10);
