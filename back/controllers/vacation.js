const User = require('../models/User')

const getUserVacations = async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  return res.status(200).send({
    vacations: { annual: user.annual, sick: user.sick },
  })
}

const reduceVacationBalance = async (req, res) => {
  const { type, days } = req.body
  const { id } = req.params

  try {
    // get user first

    let user = await User.findById(id)
    const { annual, sick } = user

    if (type === 'annual') {
      // // check if balance is sufficient

      let isBalanceSufficient = annual - days >= 0
      if (isBalanceSufficient) {
        await User.updateOne(
          { _id: id },
          {
            $inc: { annual: -days },
          }
        )
        return res.status(200).send({
          msg: 'updated successfully',
        })
      } else {
        return res.status(400).send({
          error: 'insufficient annual balance',
        })
      }
    }

    if (type === 'sick') {
      let isBalanceSufficient = sick - days >= 0
      if (isBalanceSufficient) {
        await User.updateOne(
          { _id: id },
          {
            $inc: { sick: -days },
          }
        )
        return res.status(200).send({
          msg: 'updated successfully',
        })
      } else {
        return res.status(400).send({
          error: 'insufficient sick balance',
        })
      }
    }
  } catch (error) {
    console.log(error, 'errorerrorerror')
  }
}

module.exports = {
  reduceVacationBalance,
  getUserVacations,
}
