const mongoose = require('mongoose')

const ExpenseSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['Groceries', 'Leisure', 'Electronics', 'Utilities', 'Clothing', 'Health', 'Others'],
        required: true
    }
},{timestamps: true})

const expenses = mongoose.model('Expenses', ExpenseSchema)
module.exports = expenses