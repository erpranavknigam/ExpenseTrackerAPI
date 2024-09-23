const mongoose = require('mongoose')
const Expenses = require('../models/expenses')

exports.createExpense = async (req, res) => {
    const { amount, category } = req.body

    const expense = new Expenses({ userId: req.user.userId, amount, category })

    try {
        await expense.save()
        return res.status(200).json({
            message: "Expenses added successfully"
        })
    } catch (ex) {
        return res.status(400).json({
            message: "Expenses could not be added", ex
        })
    }
}

exports.getExpenses = async (req, res) => {
    const { filter, startDate, endDate } = req.query

    const userId = req.user.userId; // Access user ID from the decoded token
    // console.log(req.user)
    const query = { userId: userId };
    // console.log(query)

    if (filter) {
        const now = new Date()
        if (filter === 'week') {
            query.createdAt = { $gte: new Date(now.setDate(now.getDate() - 7)) }
            // console.log(query.date)
        } else if (filter === 'month') {
            query.createdAt = { $gte: new Date(now.setMonth(now.getMonth() - 1)) }
            // console.log(query.date)
        } else if (filter === '3months') {
            query.createdAt = { $gte: new Date(now.setMonth(now.getMonth() - 3)) }
            // console.log(query.date)
        }
    }

    if (startDate && endDate) {
        query.createdAt = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        }
    }

    try {
        console.log(query)
        const expenses = await Expenses.find(query)
        res.status(200).json(expenses)
    } catch (ex) {
        res.status(500).json({
            message: "Error Occured"
        })
    }
}

exports.removeExpense = async (req, res) => {
    const { id } = req.params
    const query = req.user.userId;
    if (!id) {
        res.status(404).json({
            message: "Expense id not found"
        })
    } else {
        try {
            const isDeleted = await Expenses.findOneAndDelete({ _id: id, userId: query })
            if (!isDeleted) {
                res.status(404).json({
                    message: "Expense deleted failed. You are not authorized to delete this Expense or the expense does not exists"
                })
            } else {
                if (isDeleted) {
                    res.status(202).json({
                        message: "Expense deleted successfully",
                        isDeleted: isDeleted
                    })
                } else {
                    res.status(404).json({
                        message: "Expense deleted failed. You are not authorized to delete this Expense."
                    })
                }
            }

        } catch (ex) {
            res.status(500).json({
                message: `Error Occurred, ${ex}`
            })
        }
    }
}

exports.updateExpense = async (req, res) => {
    const { id } = req.params
    const { amount, category } = req.body
    const query = req.user.userId
    // console.log(query)
    if (!id || !amount || !category) {
        res.status(400).json({
            message: "Enter all details"
        })
    } else {
        try {
            const expense = await Expenses.findOne({ _id: id, userId: query });

            if (!expense) {
                return res.status(404).json({
                    message: "Expense not found or not owned by user"
                });
            }

            // Proceed with the update
            expense.amount = amount;
            expense.category = category;

            const isUpdated = await expense.save(); // Save the updated expense

            if (isUpdated) {
                res.status(200).json({
                    message: "Expense Updated Successfully",
                    exp: isUpdated
                })
            } else {
                res.status(404).json({
                    message: "Update Failed"
                })
            }
        } catch (ex) {
            res.status(500).json({
                message: `Server Error ${ex}`
            })
        }
    }
}