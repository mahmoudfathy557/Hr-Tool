const User = require('../models/User')

const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body })
    return res.status(200).send({
      user: {
        name: user.username,
        id: user._id,
        vacation: { annual: user.annual, sick: user.sick },
      },
    })
  } catch (error) {
    return res.status(400).send({ error: error.message })
  }
}

const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res
      .status(400)
      .send({ error: 'Please provide username and password' })
  }
  const user = await User.findOne({ username })
  if (!user) {
    return res.status(401).send({ error: 'Invalid Credentials' })
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    return res.status(401).send({ error: 'Invalid Credentials' })
  }
  // compare password

  return res.status(200).send({
    user: {
      name: user.username,
      id: user._id,
      vacation: { annual: user.annual, sick: user.sick },
    },
  })
}

module.exports = {
  register,
  login,
}
