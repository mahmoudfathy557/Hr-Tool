const express = require('express')
const router = express.Router()
const {
  reduceVacationBalance,
  getUserVacations,
} = require('../controllers/vacation')
router.patch('/reduceVacationBalance/:id', reduceVacationBalance)
router.get('/getUserVacations/:id', getUserVacations)

module.exports = router
