const express = require('express')
const exp = require('../controllers/expenseController')
const authMid = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/create',authMid, exp.createExpense)
router.post('/get',authMid, exp.getExpenses)
router.post('/remove/:id',authMid, exp.removeExpense)
router.post('/update/:id',authMid, exp.updateExpense)

module.exports = router