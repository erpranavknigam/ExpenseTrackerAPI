const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{timestamps: true})

UserSchema.pre('save', async function (next) {
    const user = this
    const plainPassword = user.password
    if (!user.isModified('password')) return next(); // Only hash the password if it has been modified
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(plainPassword,salt)
    user.password = hashedPassword
    next()
})

UserSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

const Users = mongoose.model('Users', UserSchema)

module.exports = Users