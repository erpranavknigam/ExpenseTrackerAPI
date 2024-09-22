const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const URI = process.env.URI

const connect = async () => {
    try{
        await mongoose.connect(URI)
        console.log("DB Connected Successfully")
    } catch(ex){
        console.log(ex)
    }
}


module.exports = {connect, mongoose}