const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, ' username must be provided'],
  },
  password: {
    type: String,
    required: [true, 'password must be provided'],
  },
  annual: {
    type: Number,
    default: 21,
    min: [0, 'Must not be less than zero '],

    required: true,
  },
  sick: {
    type: Number,
    default: 7,
    min: [0, 'Must not be less than zero '],

    required: true,
  },
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = candidatePassword === this.password

  return isMatch
}

module.exports = mongoose.model('User', UserSchema)
