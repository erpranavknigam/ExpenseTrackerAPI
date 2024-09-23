const mongoose = require('mongoose')
const jsonwebtoken = require('jsonwebtoken')
const dotenv = require('dotenv')
const Users = require('../models/users')

dotenv.config()
const KEY = process.env.SECRET_KEY

exports.signup = async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(500).json({
            message: "Provide all the required details"
        })
    } else {
        try {
            const existingUser = await Users.findOne({ email })
            if (existingUser) {
                return res.status(400).json({
                    message: "User already exists"
                })
            } else {
                const newUser = new Users({ username, email, password })
                await newUser.save()

                const token = jsonwebtoken.sign({ userId: newUser._id }, KEY, { expiresIn: '1h' })
                return res.status(200).json({
                    message: "User Created Successfully",
                    token: token
                })
            }
        } catch (ex) {
            console.log(ex)
            return res.status(500).json({
                message: "Error occurred",
            })
        }
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(500).json({
            message: "Provide all the required details"
        })
    } else {
        try {
            const user = await Users.findOne({ email })
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                })
            } else {
                const matched = user.comparePassword(password)
                if (!matched) {
                    return res.status(404).json({
                        message: "Invalid Details"
                    })
                } else {
                    const token = jsonwebtoken.sign({ userId: user._id }, KEY, { expiresIn: '1h' })
                    // console.log(token)
                    return res.status(200).json({
                        message: "User Logged in  Successfully",
                        token: token,
                        user: user
                    })
                }
            }
        } catch (ex) {
            console.log(ex)
            return res.status(500).json({
                message: "Server Error"
            })
        }
    }
}